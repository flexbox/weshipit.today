import { Text } from '../text/text';
import CardBootcamp from '../card/card-bootcamp';
import CardChecklist from '../card/card-checklist';
import CardConsultation from '../card/card-consultation';

export function UsefulResources() {
  return (
    <div>
      <Text variant="h2" className="mx-44 text-left">
        Useful Resources
      </Text>
      <div className="flex flex-col justify-center gap-16 py-12 md:flex-row">
        <CardBootcamp
          cardSize={'w-2/3 md:w-1/5'}
          imgWidth={124}
          imgHeight={124}
          cardColor="blue-light"
        />
        <CardChecklist
          cardColor="pink"
          cardSize={'w-2/3 md:w-1/5'}
          imgWidth={124}
          imgHeight={124}
        />
        <CardConsultation
          cardSize={'w-2/3 md:w-1/5'}
          gravatarSize={80}
          cardColor="purple"
        />
      </div>
    </div>
  );
}

export default UsefulResources;
