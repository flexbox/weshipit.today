import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';
import { Button, Text } from '@weshipit/ui';
import { useCallback, useEffect, useRef, useState } from 'react';

export const MAX_RECORDING_SECONDS = 180;

/**
 * Chrome and Firefox give us webm/opus, Safari and iOS give us mp4. Both are
 * accepted by the transcription model, so there is no conversion step.
 */
const MIME_TYPE_CANDIDATES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/mp4',
];

const MIC_DENIED =
  'We can’t hear you. Allow microphone access in your browser settings, then reload this page.';
const MIC_MISSING =
  'No microphone detected. Try another device or plug in a headset.';

function pickMimeType(): string {
  if (typeof MediaRecorder === 'undefined') {
    return '';
  }

  return (
    MIME_TYPE_CANDIDATES.find((type) => MediaRecorder.isTypeSupported(type)) ??
    ''
  );
}

export function extensionForMimeType(mimeType: string): string {
  return mimeType.includes('mp4') ? 'm4a' : 'webm';
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

interface AudioRecorderProps {
  disabled?: boolean;
  onRecorded: (recording: { blob: Blob; mimeType: string } | null) => void;
}

export function AudioRecorder({ disabled, onRecorded }: AudioRecorderProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const chunksRef = useRef<Blob[]>([]);
  const previewUrlRef = useRef<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const releaseMicrophone = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      releaseMicrophone();

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, [releaseMicrophone]);

  useEffect(() => {
    if (!isRecording) {
      return;
    }

    const interval = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  const stopRecording = useCallback(() => {
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop();
    }
  }, []);

  // Hard stop so a forgotten tab can't upload a 40-minute file.
  useEffect(() => {
    if (isRecording && elapsedSeconds >= MAX_RECORDING_SECONDS) {
      stopRecording();
    }
  }, [elapsedSeconds, isRecording, stopRecording]);

  const startRecording = async () => {
    setError(null);
    onRecorded(null);

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
      setPreviewUrl(null);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { audioBitsPerSecond: 64_000, mimeType } : undefined,
      );

      chunksRef.current = [];
      recorderRef.current = recorder;
      streamRef.current = stream;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const type = recorder.mimeType || mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type });
        const url = URL.createObjectURL(blob);

        previewUrlRef.current = url;
        setPreviewUrl(url);
        setIsRecording(false);
        releaseMicrophone();
        onRecorded({ blob, mimeType: type });
      };

      setElapsedSeconds(0);
      setIsRecording(true);
      recorder.start();
    } catch (caught) {
      const name = (caught as DOMException)?.name;

      setError(name === 'NotFoundError' ? MIC_MISSING : MIC_DENIED);
      setIsRecording(false);
      releaseMicrophone();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {isRecording ? (
        <Button
          as="button"
          onClick={stopRecording}
          size="xl"
          variant="secondary"
          accessoryLeft={<StopIcon className="size-5" aria-hidden="true" />}
        >
          Stop
        </Button>
      ) : (
        <Button
          as="button"
          disabled={disabled}
          onClick={startRecording}
          size="xl"
          variant="primary"
          accessoryLeft={
            <MicrophoneIcon className="size-5" aria-hidden="true" />
          }
        >
          {previewUrl ? 'Record again' : 'Start recording'}
        </Button>
      )}

      <p
        aria-live="polite"
        className="font-mono text-sm text-slate-500 dark:text-slate-400"
      >
        {isRecording ? (
          <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-red-500 align-middle" />
        ) : null}
        {formatTime(elapsedSeconds)} / {formatTime(MAX_RECORDING_SECONDS)}
      </p>

      {previewUrl && !isRecording ? (
        <audio className="w-full max-w-md" controls src={previewUrl}>
          <track kind="captions" />
        </audio>
      ) : null}

      {error ? (
        <Text
          as="p"
          variant="p2"
          className="max-w-md text-center text-red-600 dark:text-red-400"
        >
          {error}
        </Text>
      ) : null}
    </div>
  );
}
