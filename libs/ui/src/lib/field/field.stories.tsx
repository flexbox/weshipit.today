import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { FieldError, Input, Label, LabelHint, Select, Textarea } from './field';

const meta: Meta<typeof Input> = {
  argTypes: {
    'aria-invalid': {
      control: 'boolean',
      description: 'Shows the red error ring.',
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    size: {
      control: 'inline-radio',
      description: '`sm` filters and toolbars · `md` forms · `lg` public forms',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
  },
  args: {
    placeholder: 'you@example.com',
    size: 'md',
  },
  component: Input,
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '`Input`, `Textarea` and `Select` share `fieldVariants`. Compose them with `Label`, `LabelHint` and `FieldError`. They take `ref` as a plain prop (React 19), so `register()` from react-hook-form works as is.',
      },
    },
  },
  subcomponents: { FieldError, Label, LabelHint, Select, Textarea },
  title: 'Form/Field',
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  render: (args) => (
    <div>
      <Label htmlFor="playground" className="mb-2">
        Email
      </Label>
      <Input id="playground" type="email" {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <Label htmlFor={`size-${size}`} className="mb-1">
            size=&quot;{size}&quot;
          </Label>
          <Input id={`size-${size}`} size={size} placeholder="Ada Lovelace" />
        </div>
      ))}
    </div>
  ),
};

export const WithHint: Story = {
  render: () => (
    <div>
      <Label htmlFor="first-name" className="mb-2">
        First name <LabelHint>(optional)</LabelHint>
      </Label>
      <Input id="first-name" autoComplete="given-name" />
    </div>
  ),
};

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Set `aria-invalid` on the field and point `aria-describedby` at the `FieldError` id: the ring turns red and screen readers read the message.',
      },
    },
  },
  render: () => (
    <div>
      <Label htmlFor="invalid-email" className="mb-2">
        Email
      </Label>
      <Input
        id="invalid-email"
        type="email"
        size="lg"
        defaultValue="ada@"
        aria-invalid
        aria-describedby="invalid-email-error"
      />
      <FieldError id="invalid-email-error">
        Enter a valid email, like you@example.com.
      </FieldError>
    </div>
  ),
};

export const TextareaField: Story = {
  name: 'Textarea',
  render: () => (
    <div>
      <Label htmlFor="content" className="mb-1">
        Contenu en markdown <LabelHint>(- [ ] pour une checklist)</LabelHint>
      </Label>
      <Textarea
        id="content"
        rows={6}
        className="font-mono text-sm"
        defaultValue={'## Avant de commencer\n\n- [ ] Première étape\n'}
      />
    </div>
  ),
};

export const SelectField: Story = {
  name: 'Select',
  render: () => (
    <div className="flex flex-wrap items-end gap-3 text-sm">
      <label className="flex flex-col gap-1 text-slate-600 dark:text-slate-400">
        Suivi
        <Select size="sm" defaultValue="">
          <option value="">Tous</option>
          <option value="to_contact">À contacter</option>
          <option value="sent">Relance envoyée</option>
        </Select>
      </label>
      <label className="flex flex-col gap-1 text-slate-600 dark:text-slate-400">
        Source
        <Input size="sm" type="search" placeholder="r-page, audit:security…" />
      </label>
      <Button variant="outline">Filtrer</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { defaultValue: 'locked@weshipit.today', disabled: true },
  render: (args) => (
    <div>
      <Label htmlFor="disabled" className="mb-2">
        Email
      </Label>
      <Input id="disabled" {...args} />
    </div>
  ),
};

export const LeadMagnetForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The public capture form on /r/[slug], built from these parts.',
      },
    },
  },
  render: () => (
    <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
      <div>
        <Label htmlFor="lm-first-name" className="mb-2">
          First name <LabelHint>(optional)</LabelHint>
        </Label>
        <Input id="lm-first-name" size="lg" autoComplete="given-name" />
      </div>
      <div>
        <Label htmlFor="lm-email" className="mb-2">
          Email
        </Label>
        <Input
          id="lm-email"
          type="email"
          size="lg"
          placeholder="you@example.com"
          aria-invalid
          aria-describedby="lm-email-error"
        />
        <FieldError id="lm-email-error">
          Enter your email to unlock the content.
        </FieldError>
      </div>
      <Button size="xl" className="justify-center">
        Unlock content for free
      </Button>
    </form>
  ),
};
