import type { Meta } from '@storybook/react';
import { FieldError, Input, Label, LabelHint, Select, Textarea } from './field';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Form/Field',
};
export default meta;

export const Default = {
  render: () => (
    <div className="grid max-w-md gap-5">
      <div>
        <Label htmlFor="story-name" className="mb-2">
          First name <LabelHint>(optional)</LabelHint>
        </Label>
        <Input id="story-name" placeholder="Ada" />
      </div>
      <div>
        <Label htmlFor="story-email" className="mb-2">
          Email
        </Label>
        <Input
          id="story-email"
          type="email"
          size="lg"
          defaultValue="not-an-email"
          aria-invalid
          aria-describedby="story-email-error"
        />
        <FieldError id="story-email-error">
          Enter a valid email, like you@example.com.
        </FieldError>
      </div>
      <div>
        <Label htmlFor="story-notes" className="mb-2">
          Notes
        </Label>
        <Textarea id="story-notes" rows={4} />
      </div>
      <div>
        <Label htmlFor="story-status" className="mb-2">
          Status
        </Label>
        <Select id="story-status" size="sm">
          <option>À contacter</option>
          <option>Relance envoyée</option>
        </Select>
      </div>
    </div>
  ),
};
