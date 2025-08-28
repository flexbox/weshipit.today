import { SpotLeft } from '@weshipit/ui';

export default {
  title: 'SpotLeft',
  component: SpotLeft,
};

export const Default = () => <SpotLeft spotsLeft={2} />;

export const FullyBooked = () => <SpotLeft spotsLeft={0} />;

export const Variants = () => (
  <div className="flex gap-6">
    <SpotLeft spotsLeft={0} />
    <SpotLeft spotsLeft={1} />
    <SpotLeft spotsLeft={2} />
    <SpotLeft spotsLeft={4} />
  </div>
);
