import { CardBootcamp } from '../card/card-bootcamp';
import { CardChecklist } from '../card/card-checklist';
import { CardConsultation } from '../card/card-consultation';

export function CallToActionCards() {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <CardBootcamp imageSize={124} />
      <CardChecklist imageSize={124} />
      <CardConsultation gravatarSize={80} />
    </div>
  );
}

export default CallToActionCards;
