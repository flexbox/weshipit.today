import type { Meta, StoryObj } from '@storybook/react';
import { AuthorDisclosure } from './author-disclosure';

const meta: Meta<typeof AuthorDisclosure> = {
  component: AuthorDisclosure,
  title: 'AuthorDisclosure',
};

export default meta;
type Story = StoryObj<typeof AuthorDisclosure>;

export const Default: Story = {
  args: {
    children: (
      <>
        <p>
          Je m’appelle David Leuliette, je suis solopreneur depuis 2016 et
          incubé chez Flavie Prevot depuis 2025. J’ai payé l’Incubateur de ma
          poche, au tarif public en vigueur à l’époque. Personne ne m’a payé
          pour écrire cet avis.
        </p>
        <p>
          Cet avis est volontairement structuré autour des points faibles autant
          que des points forts.
        </p>
      </>
    ),
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Pourquoi je publie ce code réduction Solopreneur',
    children: (
      <p>
        Le contenu de cette page change, mais l’en-tête (titre + avatar) reste
        partagé via le composant.
      </p>
    ),
  },
};
