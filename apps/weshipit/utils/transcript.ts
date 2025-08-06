export interface TranscriptEntryType {
  speaker: string;
  time: string;
  text: string;
}

export function timecodeToSeconds(time: string): number {
  let t = time.replace(/\[|\]/g, '');
  const parts = t.split(':');
  if (parts.length === 2) {
    const [min, rest] = parts;
    const [sec] = rest.split('.');
    return parseInt(min, 10) * 60 + parseInt(sec, 10);
  } else if (parts.length === 3) {
    const [hour, min, rest] = parts;
    const [sec] = rest.split('.');
    return (
      parseInt(hour, 10) * 3600 + parseInt(min, 10) * 60 + parseInt(sec, 10)
    );
  }
  return 0;
}

export function parseTranscript(raw: string): TranscriptEntryType[] {
  const lines = raw.split(/\r?\n/);
  const entries: TranscriptEntryType[] = [];
  let current: TranscriptEntryType | null = null;
  let lastSpeaker: string | null = null;
  let lastTime: string | null = null;
  let expectTimeAfterDash = false;
  const headerRegex =
    /^(.+?)\s*[\(\[]((?:\d{1,2}:)?\d{1,2}:\d{2}(?:\.\d{1,3})?)[\)\]]$/;
  const timeOnlyRegex =
    /^[\(\[]((?:\d{1,2}:)?\d{1,2}:\d{2}(?:\.\d{1,3})?)[\)\]]$/;
  const timeBracketOnlyRegex =
    /^\[((?:\d{1,2}:)?\d{1,2}:\d{2}(?:\.\d{1,3})?)\]$/;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const headerMatch = line.match(headerRegex);
    const timeOnlyMatch = line.match(timeOnlyRegex);
    const timeBracketMatch = line.match(timeBracketOnlyRegex);
    if (headerMatch) {
      // Format: Name (timecode) ou Name [timecode]
      if (current) entries.push(current);
      current = {
        speaker: headerMatch[1].trim(),
        time: headerMatch[2],
        text: '',
      };
      lastSpeaker = headerMatch[1].trim();
      lastTime = headerMatch[2];
      expectTimeAfterDash = false;
    } else if ((timeOnlyMatch || timeBracketMatch) && lastSpeaker) {
      if (current) entries.push(current);
      const timeVal = timeOnlyMatch
        ? timeOnlyMatch[1]
        : timeBracketMatch
          ? timeBracketMatch[1]
          : '';
      current = { speaker: lastSpeaker, time: timeVal, text: '' };
      lastTime = timeVal;
      expectTimeAfterDash = false;
    } else if (line === '-') {
      expectTimeAfterDash = true;
      continue;
    } else if (
      line &&
      !line.startsWith('(') &&
      !line.startsWith('[') &&
      !line.match(headerRegex)
    ) {
      if (
        i + 2 < lines.length &&
        lines[i + 1].trim() === '-' &&
        (lines[i + 2].trim().match(timeOnlyRegex) ||
          lines[i + 2].trim().match(timeBracketOnlyRegex))
      ) {
        lastSpeaker = line;
        expectTimeAfterDash = true;
        continue;
      }
      if (
        i + 1 < lines.length &&
        (lines[i + 1].trim().match(timeOnlyRegex) ||
          lines[i + 1].trim().match(timeBracketOnlyRegex))
      ) {
        lastSpeaker = line;
        continue;
      }
      if (current) {
        if (current.text) current.text += '\n';
        current.text += line;
      }
    } else if (
      expectTimeAfterDash &&
      (timeOnlyMatch || timeBracketMatch) &&
      lastSpeaker
    ) {
      if (current) entries.push(current);
      const timeVal = timeOnlyMatch
        ? timeOnlyMatch[1]
        : timeBracketMatch
          ? timeBracketMatch[1]
          : '';
      current = { speaker: lastSpeaker, time: timeVal, text: '' };
      lastTime = timeVal;
      expectTimeAfterDash = false;
    } else if (current) {
      if (current.text) current.text += '\n';
      current.text += line;
    }
  }
  if (current) entries.push(current);
  return entries;
}
