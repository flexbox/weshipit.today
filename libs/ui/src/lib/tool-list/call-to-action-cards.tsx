import { CardBootcamp } from '../card/card-bootcamp';
import { CardChecklist } from '../card/card-checklist';
import { CardConsultation } from '../card/card-consultation';

export function CallToActionCards() {
  return (
    <div className="flex justify-between">
      <CardBootcamp imageSize={124} />
      <CardChecklist imageSize={124} />
      <CardConsultation gravatarSize={80} />
    </div>
  );
}

export default CallToActionCards;
