import React, { FormEvent, useContext, useState } from 'react';
import PrimaryButton from '~/components/Button/PrimaryButton';
import {
  choiceClassName,
  fieldClassName,
  RatingField,
  ratingScale,
} from '~/components/Form/RatingField';
import { supabase } from '~/lib/supabase';
import { UserContext } from '~/lib/UserContext';

const TEXT_MAX_LENGTH = 5000;
const RATINGS = ratingScale(1, 10);
const SETUP_GUIDE_URL =
  'https://github.com/flexbox/react-native-workshop/blob/main/setup/';

// Postgres unique_violation: this email already filled the form.
const UNIQUE_VIOLATION = '23505';

const PHONE_OS = [
  { label: 'iOS', value: 'ios' },
  { label: 'Android', value: 'android' },
  { label: 'Other', value: 'other' },
];

const COMPUTER_OS = [
  { label: 'macOS', value: 'macos' },
  { label: 'Linux', value: 'linux' },
  { label: 'Windows', value: 'windows' },
];

const SETUP_DONE = [
  { label: 'Yes', value: 'yes' },
  { label: 'No, but I will do it before the workshop', value: 'no' },
];

interface ChoiceFieldProps {
  name: string;
  label: string;
  value: string | null;
  hint?: React.ReactNode;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

const ChoiceField = ({
  hint,
  label,
  name,
  onChange,
  options,
  value,
}: ChoiceFieldProps) => (
  <fieldset className="mt-6">
    <legend className="font-semibold">{label}</legend>
    {hint && <p className="mt-1 text-gray-600 dark:text-gray-400">{hint}</p>}
    <div className="mt-2 flex flex-wrap gap-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`px-4 py-2 ${choiceClassName(value === option.value)}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
            required
          />
          {option.label}
        </label>
      ))}
    </div>
  </fieldset>
);

interface TextFieldProps {
  label: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}

const TextField = ({ children, hint, label, optional }: TextFieldProps) => (
  <label className="mt-6 block">
    <span className="font-semibold">{label}</span>
    {optional && (
      <>
        {' '}
        <span className="text-gray-500 dark:text-gray-400">(optional)</span>
      </>
    )}
    {hint && (
      <span className="mt-1 block text-gray-600 dark:text-gray-400">
        {hint}
      </span>
    )}
    {children}
  </label>
);

export const BootcampOnboardingForm = () => {
  const { user } = useContext(UserContext);
  const [typedEmail, setTypedEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [gitConfidence, setGitConfidence] = useState<number | null>(null);
  const [javascriptConfidence, setJavascriptConfidence] = useState<
    number | null
  >(null);
  const [reactExperience, setReactExperience] = useState<number | null>(null);
  const [motivation, setMotivation] = useState('');
  const [phoneOs, setPhoneOs] = useState<string | null>(null);
  const [computerOs, setComputerOs] = useState<string | null>(null);
  const [setupDone, setSetupDone] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sent' | 'already-sent'>(
    'idle',
  );

  // Signed-in students skip typing the email they already use for the workshop.
  const email = typedEmail ?? user?.email ?? '';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !supabase ||
      gitConfidence === null ||
      javascriptConfidence === null ||
      reactExperience === null ||
      phoneOs === null ||
      computerOs === null ||
      setupDone === null
    ) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await supabase.from('bootcamp_onboarding').insert({
      computer_os: computerOs,
      email: email.trim().toLowerCase(),
      full_name: fullName.trim(),
      git_confidence: gitConfidence,
      github_username: githubUsername.trim().replace(/^@/, '') || null,
      javascript_confidence: javascriptConfidence,
      motivation: motivation.trim(),
      phone_os: phoneOs,
      react_experience: reactExperience,
      setup_done: setupDone === 'yes',
    });

    setIsSubmitting(false);

    if (error?.code === UNIQUE_VIOLATION) {
      setStatus('already-sent');
      return;
    }
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setStatus('sent');
  }

  if (status !== 'idle') {
    return (
      <div role="status" className="py-8 text-center">
        <p className="text-4xl" aria-hidden="true">
          🚀
        </p>
        <h2 className="mt-4 text-2xl font-bold">
          {status === 'sent'
            ? 'You are ready for the bootcamp!'
            : 'You are already registered'}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {status === 'sent'
            ? 'Thanks for your answers, see you soon.'
            : `We already have your answers for ${email.trim().toLowerCase()}. Reply to my email if something changed.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="What is your email?"
        hint="Example: dleuliette@gmail.com"
      >
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setTypedEmail(event.target.value)}
          maxLength={320}
          required
          className={fieldClassName}
        />
      </TextField>

      <TextField label="Your full name" hint="Example: David Leuliette">
        <input
          type="text"
          name="full_name"
          autoComplete="name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          maxLength={200}
          required
          className={fieldClassName}
        />
      </TextField>

      <TextField label="Your GitHub username" hint="Example: flexbox" optional>
        <input
          type="text"
          name="github_username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          value={githubUsername}
          onChange={(event) => setGithubUsername(event.target.value)}
          pattern="@?[A-Za-z0-9\-]{1,39}"
          title="Letters, numbers and dashes only"
          className={fieldClassName}
        />
      </TextField>

      <RatingField
        label="What is your level of confidence with git and GitHub?"
        name="git_confidence"
        ratings={RATINGS}
        value={gitConfidence}
        onChange={setGitConfidence}
      />

      <RatingField
        label="What is your level of confidence with modern JavaScript?"
        hint="Are you familiar with the ES6+ syntax? Destructuring? Spread operator? Interpolation?"
        name="javascript_confidence"
        ratings={RATINGS}
        value={javascriptConfidence}
        onChange={setJavascriptConfidence}
      />

      <RatingField
        label="Do you have some basic experience with React?"
        hint="You should be able to create React components."
        name="react_experience"
        ratings={RATINGS}
        value={reactExperience}
        onChange={setReactExperience}
      />

      <TextField
        label="Why are you taking the class? What do you hope to get out of the experience?"
        hint="Example: I want to be able to release a Spotify clone application to the store."
      >
        <textarea
          name="motivation"
          value={motivation}
          onChange={(event) => setMotivation(event.target.value)}
          maxLength={TEXT_MAX_LENGTH}
          rows={4}
          required
          className={fieldClassName}
        />
      </TextField>

      <ChoiceField
        label="What’s your smartphone OS?"
        name="phone_os"
        options={PHONE_OS}
        value={phoneOs}
        onChange={setPhoneOs}
      />

      <ChoiceField
        label="What’s your computer OS?"
        name="computer_os"
        options={COMPUTER_OS}
        value={computerOs}
        onChange={setComputerOs}
      />

      <ChoiceField
        label="Did you follow the setup guide?"
        hint={
          <>
            You should have a running Expo client on your laptop and Expo Go on
            your phone.{' '}
            <a
              href={SETUP_GUIDE_URL}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Read the setup guide
            </a>
          </>
        }
        name="setup_done"
        options={SETUP_DONE}
        value={setupDone}
        onChange={setSetupDone}
      />

      {errorMessage && (
        <p role="alert" className="mt-4 text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}

      <div className="mt-8">
        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'I am ready for the bootcamp'}
        </PrimaryButton>
      </div>
    </form>
  );
};

export const BootcampOnboardingCard = () => (
  <div className="mx-auto max-w-xl rounded-lg bg-white p-6 text-gray-900 shadow-sm sm:p-10 dark:border dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100">
    <h1 className="text-2xl font-bold">React Native Bootcamp</h1>
    <p className="mt-2 text-gray-600 dark:text-gray-400">
      Please take a few moments to answer these questions and we’ll do an
      amazing bootcamp together!
    </p>
    <BootcampOnboardingForm />
  </div>
);
