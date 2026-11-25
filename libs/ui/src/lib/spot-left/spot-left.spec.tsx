import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { render, screen } from '@testing-library/react';

import { SpotLeft } from './spot-left';

describe('SpotLeft', () => {
  afterEach(() => {
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  it('names the month after the current one', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 10, 25));
    render(<SpotLeft spotsLeft={2} />);
    expect(screen.getByText('2 spots left in December ✨')).toBeTruthy();
  });

  it('does not skip a month on the 31st', () => {
    jest.useFakeTimers().setSystemTime(new Date(2027, 0, 31));
    render(<SpotLeft spotsLeft={0} />);
    expect(screen.getByText('Fully booked for February')).toBeTruthy();
  });

  it('hydrates HTML built in an earlier month without a mismatch', async () => {
    // The page was prerendered in November, the visitor opens it in January.
    jest.useFakeTimers().setSystemTime(new Date(2027, 0, 5));
    const container = document.createElement('div');
    container.innerHTML =
      '<div class="shrink-0"><div class="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 dark:text-neutral-200"><span class="flex items-center"><span class="relative flex h-2 w-2 mr-2"><span class="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span><span>Fully booked for December</span></span></div></div>';
    document.body.appendChild(container);

    const onRecoverableError = jest.fn();
    await act(async () => {
      hydrateRoot(container, <SpotLeft spotsLeft={0} />, {
        onRecoverableError,
      });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.textContent).toBe('Fully booked for February');
  });
});
