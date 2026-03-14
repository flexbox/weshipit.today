import Image from 'next/image';
import { ClientProps } from './clients-list';

export interface ClientsListMarkeeProps {
  clients: ClientProps[];
}

export function ClientsListMarkee({ clients }: ClientsListMarkeeProps) {
  const visibleClients = clients.filter((client) => client.data);

  return (
    <div className="overflow-hidden w-full py-6 [mask-image:linear-gradient(to_right,hsl(0_0%_0%/0),hsl(0_0%_0%/1)_20%,hsl(0_0%_0%/1)_80%,hsl(0_0%_0%/0))] [-webkit-mask-image:linear-gradient(to_right,hsl(0_0%_0%/0),hsl(0_0%_0%/1)_20%,hsl(0_0%_0%/1)_80%,hsl(0_0%_0%/0))]">
      <div className="flex w-max animate-marquee">
        {[...visibleClients, ...visibleClients].map((client, index) => (
          <div
            key={`${client.id}-${index}`}
            className="mx-8 flex items-center justify-center"
          >
            <Image
              src={client.data.logo?.url || ''}
              alt={`${client.data.name} logo`}
              width={125}
              height={125}
              className="size-32 object-contain opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:rounded-2xl dark:bg-white/80 dark:p-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientsListMarkee;
