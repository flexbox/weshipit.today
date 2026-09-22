import { AuthorDisclosure, Button, Faq, LinkButton, Text } from '@weshipit/ui';

import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  CheckIcon,
  CodeBracketIcon,
  CpuChipIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  SparklesIcon,
  TagIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { linksApi } from './api/links';

const AFFILIATE_URL = linksApi.affiliate.INCUBATEUR_SOLOPRENEUR;
const CODE_REDUCTION_URL = '/code-reduction-solopreneur';
const AVIS_URL = '/avis-incubateur-solopreneur';

const CTA_LABEL = 'Rejoindre le Sprint au tarif parrainage';
const CTA_LABEL_SHORT = 'Rejoindre le Sprint Solo SaaS';

const SPRINT_START = '2026-10-09';
const SPRINT_END = '2026-10-30';

const faqs = [
  {
    id: 'faq-saas-1',
    question: 'Faut-il savoir coder pour suivre le Sprint Solo SaaS ?',
    answer:
      "Non. Le Sprint est justement conçu pour les freelances et solopreneurs qui ne sont pas développeurs. Le live 2 installe avec toi tout le setup technique (base de données type Supabase, déploiement, sécurité) que les non-devs ne comprennent pas seuls. Ensuite tu construis en vibe coding, c'est-à-dire en décrivant ce que tu veux à Claude ou Codex. Le prérequis, c'est d'être à l'aise avec les outils IA au quotidien, pas de savoir écrire du code.",
  },
  {
    id: 'faq-saas-2',
    question: 'Quel type de SaaS peut-on construire en 4 semaines ?',
    answer:
      "Deux familles. Le SaaS back-office : un logiciel que tu ne vends à personne mais qui automatise ce que tu refais chaque mois pour tes clients (reporting, suivi, onboarding, livraison de mission). Flavie a construit le back-office de l'Incubateur de cette façon. Ou le SaaS produit : un outil que tu vends pour générer des revenus scalables, comme plusieurs incubés le font déjà. Le Sprint accepte les deux profils.",
  },
  {
    id: 'faq-saas-3',
    question: 'Qui est Pierre Thomassina ?',
    answer:
      "Un ancien incubé du bootcamp de Flavie devenu développeur agentique, c'est-à-dire spécialisé dans la construction de logiciels avec des agents IA. Il co-anime les 4 lives du Sprint : idée, setup, features, bêta-test. Les incubés qui rejoignent via un parrainage peuvent aussi demander une session de roast de 30 minutes où Pierre passe leur SaaS au crible.",
  },
  {
    id: 'faq-saas-4',
    question: 'Combien coûte le Sprint Solo SaaS ?',
    answer:
      "Flavie vend chaque Sprint à deux prix : le Sprint seul (1 mois) autour de 1 490 € HT, ou le Sprint + 12 mois d'Incubateur autour de 1 990 € HT. Les prix exacts sont sur sa page de vente. Via le lien de parrainage de cette page, tu paies 1 490 € HT pour les 12 mois complets, Sprint Solo SaaS inclus : le prix du Sprint seul, mais avec l'année entière et les 11 autres Sprints.",
  },
  {
    id: 'faq-saas-5',
    question: 'Ce Sprint est-il adapté à un débutant en freelancing ?',
    answer:
      "Non, et Flavie le dit elle-même : c'est un Sprint avancé. Il faut déjà avoir eu plusieurs clients et trouvé sa niche pour identifier une offre réplicable qui mérite d'être outillée. Quelqu'un qui relance son bootcamp pour la deuxième fois, qui livre le même reporting chaque mois ou qui gère un produit avec des sponsors est dans la cible. Quelqu'un qui cherche encore ses premiers clients devrait plutôt viser le Sprint suivant, « Client Express ».",
  },
  {
    id: 'faq-saas-6',
    question: 'Que se passe-t-il si je rate un live ?',
    answer:
      "Tous les lives sont enregistrés et disponibles en replay dans l'espace live de la communauté. Avec une journée tranquille, tu peux rattraper deux replays et leurs exercices d'affilée. Les lives ont lieu le vendredi midi, le Sprint court du 9 au 30 octobre 2026.",
  },
  {
    id: 'faq-saas-7',
    question: 'Comment tester sans payer ?',
    answer:
      "Flavie anime une masterclass gratuite le jeudi midi avant le lancement du Sprint, ouverte à tout le monde. Elle y aide à trouver une idée de SaaS back-office, puis présente le Sprint. C'est le meilleur moyen de voir sa façon de travailler avant de t'engager. Écris-moi si tu veux le lien de la prochaine session.",
  },
  {
    id: 'faq-saas-8',
    question: 'Et si le SaaS n’est pas mon sujet ?',
    answer:
      "L'Incubateur programme 12 Sprints par an. Après Solo SaaS viennent « Client Express » (4 semaines pour trouver 10 clients) en novembre et « Indé blindé » (fiscalité, finances, rémunération) en fin d'année. Tu rejoins pour le Sprint qui te parle, les autres sont inclus dans les 12 mois. Beaucoup d'incubés découvrent qu'un Sprint qu'ils jugeaient inutile était exactement ce dont ils avaient besoin.",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          <CalendarDaysIcon className="h-4 w-4" />
          Sprint Incubateur Solopreneur — du 9 au 30 octobre 2026
        </div>

        <Text variant="h1" as="h1" className="mb-6 text-balance">
          Sprint <span className="text-accent">Solo SaaS</span>&nbsp;: construis
          un logiciel qui bosse à ta place en 4 semaines
        </Text>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-xl">
          4 lives avec{' '}
          <Link
            href="/flavie-prevot-avis"
            className="font-semibold text-neutral-950 underline-offset-2 hover:underline dark:text-neutral-100"
          >
            Flavie Prevot
          </Link>{' '}
          et Pierre Thomassina, développeur agentique. Tu pars de l&apos;idée,
          tu installes ton environnement de vibe coding, tu construis tes
          premières features et tu trouves tes premiers utilisateurs. Sans
          savoir coder. Pour les freelances et solopreneurs qui refont la même
          chose chaque mois pour leurs clients.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={AFFILIATE_URL}
            as="a"
            size="xl"
            variant="primary"
            isExternalLink
            withExternalLinkIcon={false}
          >
            {CTA_LABEL}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button as="a" href="#programme" size="xl" variant="outline">
            Voir le programme des 4 lives
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Aucun code à écrire soi-même
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            Replays de chaque live
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            12 mois d&apos;Incubateur pour le prix du Sprint
          </span>
        </div>
      </div>
    </section>
  );
}

function PourquoiSection() {
  const cards = [
    {
      icon: WrenchScrewdriverIcon,
      title: 'Un SaaS back-office',
      description:
        'Tu ne le vends à personne. Il fait à ta place ce que tu refais chaque mois : reporting client, suivi de mission, onboarding, livraison. Flavie gère l’Incubateur avec le sien. Tu gagnes du temps en delivery et tu livres un meilleur service.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Un SaaS produit',
      description:
        'Tu veux des utilisateurs payants chaque mois. Plusieurs incubés vendent déjà le leur. Le Sprint t’emmène jusqu’au bêta-test avec de vrais utilisateurs, pas jusqu’à une maquette.',
    },
    {
      icon: SparklesIcon,
      title: 'Ou les deux',
      description:
        'Un outil qui commence comme back-office pour ton activité et que tu finis par vendre à tes pairs. C’est souvent le chemin le plus court vers un revenu scalable pour un solopreneur.',
    },
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Soit ça travaille à ta place, soit ça génère tes premiers revenus
            scalables
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Le Sprint n&apos;est pas réservé aux indie hackers. Les devs
            n&apos;ont pas besoin de Flavie pour créer un SaaS. Il est pensé
            pour les freelances et solopreneurs qui veulent mettre plus
            d&apos;IA dans leur business sans savoir par où commencer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <card.icon className="h-5 w-5 text-accent" />
              </div>
              <Text variant="h4" as="h3" className="mb-2">
                {card.title}
              </Text>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgrammeSection() {
  const lives = [
    {
      number: '1',
      icon: LightBulbIcon,
      title: 'Trouver la bonne idée de SaaS',
      description:
        'Partir de ce que tu refais chaque mois pour tes clients, ou de la douleur que tes pairs te décrivent. Sortir du live avec une idée cadrée, ni trop grosse ni gadget.',
    },
    {
      number: '2',
      icon: CpuChipIcon,
      title: 'Installer ton setup technique',
      description:
        'Base de données (type Supabase), déploiement, authentification, sécurité. Tout ce que les non-devs ne comprennent pas, installé ensemble avec Pierre. Tu repars avec un environnement de vibe coding propre et sécurisé.',
    },
    {
      number: '3',
      icon: CodeBracketIcon,
      title: 'Construire tes premières features',
      description:
        'En décrivant ce que tu veux à Claude ou Codex. Une feature qui marche vaut mieux que dix à moitié faites. Tu construis en live, tu finis dans le mois.',
    },
    {
      number: '4',
      icon: UsersIcon,
      title: 'Trouver tes premiers utilisateurs',
      description:
        'Organiser ton bêta-test : qui inviter, quoi mesurer, comment récolter les retours. Le Sprint se termine avec des vraies personnes sur ton outil, pas avec une démo.',
    },
  ];

  return (
    <section id="programme" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Le programme&nbsp;: 4 lives, de l&apos;idée aux premiers
            utilisateurs
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Un live par semaine le vendredi midi, du 9 au 30 octobre 2026. On te
            prend par la main sur toute la chaîne. Replays disponibles si tu
            rates une séance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {lives.map((live) => (
            <div
              key={live.number}
              className="group relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-xl font-bold text-neutral-950 dark:text-neutral-200">
                  {live.number}
                </div>
                <live.icon className="h-6 w-6 text-accent" />
              </div>
              <Text variant="h4" as="h3" className="mb-2">
                {live.title}
              </Text>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {live.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-accent/30 bg-accent/5 p-5 text-sm leading-relaxed text-neutral-950 dark:text-neutral-200">
          <span className="font-semibold text-accent">
            Bonus parrainage&nbsp;:
          </span>{' '}
          Flavie propose aux incubés qui arrivent par un parrainage une session
          de roast de 30 minutes avec Pierre. Il passe ton SaaS au crible et te
          dit franchement si c&apos;est bon ou pas. Demande-la moi après ton
          inscription.
        </div>
      </div>
    </section>
  );
}

function PourQuiSection() {
  const yes = [
    'Tu es freelance ou solopreneur avec déjà plusieurs clients derrière toi.',
    'Tu refais la même chose chaque mois : reporting, onboarding, suivi, livraison.',
    'Tu relances une offre réplicable (bootcamp, formation, accompagnement) pour la 2e fois.',
    'Tu utilises déjà Claude, ChatGPT ou Codex au quotidien, même simplement.',
    'Tu as une idée d’outil pour ta niche et tu ne sais pas comment la lancer.',
    'Tu gères un produit, des sponsors ou une communauté et tes outils ne suivent plus.',
  ];

  const no = [
    'Tu démarres tout juste en freelancing et tu cherches encore tes premiers clients.',
    'Tu n’es pas à l’aise avec les outils digitaux et tu veux qu’on te tienne la main sur chaque clic.',
    'Tu es développeur confirmé et tu cherches un cours de code : tu n’as pas besoin de ce Sprint.',
    'Tu ne peux pas bloquer 1 h le vendredi midi ni 2 à 4 h dans le mois pour construire.',
  ];

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Le Sprint Solo SaaS, c&apos;est pour toi si…
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Flavie le dit sans détour&nbsp;: c&apos;est un Sprint avancé, pas un
            Sprint débutant. Voici comment savoir de quel côté tu es.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <Text variant="h4" as="h3" className="mb-4 text-accent">
              ✅ Oui, fonce
            </Text>
            <ul className="space-y-3">
              {yes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-neutral-950 dark:text-neutral-200"
                >
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <Text
              variant="h4"
              as="h3"
              className="mb-4 text-neutral-500 dark:text-neutral-400"
            >
              ❌ Passe ton chemin
            </Text>
            <ul className="space-y-3">
              {no.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-neutral-500 dark:text-neutral-400"
                >
                  <XMarkIcon className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrixSection() {
  const rows = [
    {
      label: 'Sprint Solo SaaS seul (1 mois)',
      price: '~1 490 € HT',
      duration: '1 mois',
      best: false,
    },
    {
      label: 'Sprint + 12 mois d’Incubateur (page de vente)',
      price: '~1 990 € HT',
      duration: '12 mois',
      best: false,
    },
    {
      label: 'Tarif parrainage (lien de cette page)',
      price: '1 490 € HT',
      duration: '12 mois, Sprint inclus',
      best: true,
    },
  ];

  return (
    <section id="prix" className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <Text variant="h3" as="h2" className="mb-4 text-balance">
            Le prix du Sprint seul, avec l&apos;année entière
          </Text>
          <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
            Chaque Sprint est vendu seul ou couplé aux 12 mois. Les tarifs
            indiqués avec « ~ » sont ceux du Sprint précédent, la page de vente
            officielle fait foi. Le tarif parrainage, lui, ne change pas&nbsp;:
            c&apos;est le prix plancher que Flavie n&apos;affiche nulle part.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-secondary">
            <div className="p-4 text-sm font-medium text-neutral-950 dark:text-neutral-200">
              Formule
            </div>
            <div className="border-l border-border p-4 text-center text-sm font-medium text-neutral-950 dark:text-neutral-200">
              Prix HT
            </div>
            <div className="border-l border-border p-4 text-center text-sm font-medium text-neutral-950 dark:text-neutral-200">
              Accès
            </div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 ${
                i !== rows.length - 1 ? 'border-b border-border' : ''
              } ${row.best ? 'bg-accent/10' : 'bg-card'}`}
            >
              <div className="flex items-center gap-2 p-4 text-sm text-neutral-950 dark:text-neutral-200">
                {row.best && (
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-accent" />
                )}
                <span className={row.best ? 'font-semibold' : ''}>
                  {row.label}
                </span>
              </div>
              <div
                className={`border-l border-border p-4 text-center ${
                  row.best
                    ? 'text-lg font-bold text-accent'
                    : 'text-sm text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {row.price}
              </div>
              <div
                className={`border-l border-border p-4 text-center ${
                  row.best
                    ? 'font-semibold text-accent'
                    : 'text-sm text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {row.duration}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            href={AFFILIATE_URL}
            as="a"
            size="lg"
            variant="primary"
            isExternalLink
            withExternalLinkIcon={false}
          >
            {CTA_LABEL}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          <LinkButton
            href={`${CODE_REDUCTION_URL}#comparatif`}
            size="lg"
            variant="outline"
          >
            Comprendre le tarif parrainage
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

function OnLeFaitEnsembleSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            <UsersIcon className="h-3.5 w-3.5" />
            Plus on est de fous
          </div>
          <Text variant="h3" as="h2" className="mb-3">
            Je fais ce Sprint aussi. On peut le faire en binôme.
          </Text>
          <p className="mb-4 text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
            Je suis développeur React Native et Next.js depuis 2016 et incubé
            chez Flavie depuis 2025. En octobre, je construis mon propre SaaS
            back-office pendant le Sprint. Ce que j&apos;ai remarqué dans les
            Sprints précédents&nbsp;: quand on est deux ou trois à se connaître,
            on vit les hauts et les bas ensemble et on finit vraiment.
          </p>
          <p className="mb-6 text-pretty leading-relaxed text-neutral-500 dark:text-neutral-400">
            Si tu rejoins par cette page, dis-le moi. Je te retrouve dans la
            communauté, on partage nos avancées chaque semaine, et quand ton
            setup bloque sur un truc de dev, tu as quelqu&apos;un à qui demander
            en dehors du live.
          </p>
          <Link
            href={AVIS_URL}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-2 hover:underline"
          >
            Lire mon avis détaillé après 6 mois d&apos;incubation
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DisclosureSection() {
  return (
    <AuthorDisclosure title="Pourquoi je publie cette page">
      <p>
        Je m&apos;appelle David Leuliette, je suis solopreneur depuis 2016 et
        incubé chez{' '}
        <Link
          href="/flavie-prevot-avis"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          Flavie Prevot
        </Link>{' '}
        depuis 2025. Je suis ambassadeur de l&apos;Incubateur&nbsp;: si tu
        rejoins via mon lien de parrainage, je touche une commission
        d&apos;apporteur d&apos;affaires.
      </p>
      <p>
        En contrepartie, tu paies{' '}
        <span className="font-semibold text-neutral-950 dark:text-neutral-200">
          le tarif parrainage (1 490 € HT pour 12 mois)
        </span>
        , le prix le plus bas que Flavie autorise. Aucune promo publique, même
        pendant une masterclass, ne descend en dessous. Tu obtiens exactement le
        même Sprint et le même accès qu&apos;un client direct.
      </p>
      <p>
        Le contenu de cette page vient du brief que Flavie a donné à ses
        ambassadeurs pour ce Sprint. Les tarifs marqués « ~ » sont ceux du
        Sprint précédent&nbsp;; je mettrai la page à jour dès que la page de
        vente officielle du Sprint sera publiée.
      </p>
      <p className="text-sm">
        Tu peux aussi acheter le Sprint au tarif public directement sur
        incubateursolopreneur.fr. Le seul intérêt de passer par ici&nbsp;:
        l&apos;année entière pour le prix du mois, et un binôme de dev pendant
        le Sprint.
      </p>
    </AuthorDisclosure>
  );
}

function CtaFinalSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
          </div>

          <div className="relative px-8 py-16 text-center md:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <TagIcon className="h-4 w-4" />
              Premier live le vendredi 9 octobre 2026
            </div>
            <Text variant="h2" as="h2" className="mb-6 text-balance">
              Fin octobre, ton SaaS tourne{' '}
              <span className="text-accent">avec de vrais utilisateurs</span>
            </Text>
            <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
              4 lives, un setup propre, tes premières features, un bêta-test. Et
              11 autres Sprints dans l&apos;année pour le même prix.
            </p>

            <Button
              href={AFFILIATE_URL}
              as="a"
              size="xxl"
              variant="primary"
              isExternalLink
              withExternalLinkIcon={false}
              className="mx-auto justify-center"
            >
              {CTA_LABEL}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Page de parrainage officielle
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />1 490 €
                HT pour 12 mois
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Roast de ton SaaS avec Pierre sur demande
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SprintSoloSaasPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://weshipit.today',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Code réduction Solopreneur',
        item: 'https://weshipit.today/code-reduction-solopreneur',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Sprint Solo SaaS',
        item: 'https://weshipit.today/sprint-solo-saas',
      },
    ],
  };

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Sprint Solo SaaS : construire un SaaS qui bosse à ta place',
    description:
      "Sprint de 4 semaines de l'Incubateur Solopreneur de Flavie Prevot, co-animé avec Pierre Thomassina. 4 lives : trouver l'idée, installer son setup technique, construire ses premières features, trouver ses premiers utilisateurs.",
    startDate: SPRINT_START,
    endDate: SPRINT_END,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'VirtualLocation',
      url: 'https://www.incubateursolopreneur.fr',
    },
    organizer: {
      '@type': 'Person',
      name: 'Flavie Prevot',
      url: 'https://www.incubateursolopreneur.fr',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://weshipit.today/sprint-solo-saas',
      priceCurrency: 'EUR',
      price: '1490',
      priceValidUntil: SPRINT_END,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://weshipit.today/sprint-solo-saas" />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://weshipit.today/sprint-solo-saas"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://weshipit.today/sprint-solo-saas"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      </Head>
      <Layout
        seoTitle="Sprint Solo SaaS (oct. 2026) : construire un SaaS qui bosse à ta place, sans coder"
        seoDescription="Le Sprint Solo SaaS de l'Incubateur Solopreneur, du 9 au 30 octobre 2026 : 4 lives avec Flavie Prevot et Pierre Thomassina pour trouver ton idée, installer ton setup, construire tes features et trouver tes premiers utilisateurs. Tarif parrainage : 12 mois d'Incubateur pour le prix du Sprint."
        ogImageTitle="Sprint Solo SaaS — Incubateur Solopreneur"
        ogImageAlt="Sprint Solo SaaS : construire un SaaS qui bosse à ta place en 4 semaines"
        locale="fr_FR"
        withHeader
        withFooter
        callToActionButton={{
          name: CTA_LABEL_SHORT,
          href: AFFILIATE_URL,
          isExternalLink: true,
        }}
      >
        <HeroSection />
        <PourquoiSection />
        <ProgrammeSection />
        <PourQuiSection />
        <PrixSection />
        <OnLeFaitEnsembleSection />
        <DisclosureSection />

        <section id="faq" className="border-t border-border py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-12 text-center">
              <Text variant="h3" as="h2" className="mb-4 text-balance">
                FAQ — Sprint Solo SaaS
              </Text>
              <p className="text-neutral-500 dark:text-neutral-400">
                Les questions qui reviennent avant de se lancer.
              </p>
            </div>
            <Faq faqs={faqs} title="" headingId="faq-saas-heading" />
          </div>
        </section>

        <CtaFinalSection />
      </Layout>
    </>
  );
}
