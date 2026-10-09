import { render, screen } from '@testing-library/react';

import Faq from './faq';

const faqs = [
  { id: '1', question: 'First question?', answer: 'First answer.' },
  { id: '2', question: 'Second question?', answer: 'Second answer.' },
];

describe('Faq', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Faq faqs={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('keeps closed answers in the DOM so they stay indexable', () => {
    render(<Faq faqs={faqs} />);
    // getByText throws if the answer is not rendered at all.
    expect(
      screen.getByText('Second answer.').closest('[hidden]'),
    ).not.toBeNull();
    expect(screen.getByText('First answer.').closest('[hidden]')).toBeNull();
  });

  it('puts each question button inside its heading', () => {
    render(<Faq faqs={faqs} />);
    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'First question?',
    });
    expect(heading.querySelector('button')).not.toBeNull();
  });

  it('skips the heading when the title is empty', () => {
    render(<Faq faqs={faqs} title="" />);
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
  });
});
