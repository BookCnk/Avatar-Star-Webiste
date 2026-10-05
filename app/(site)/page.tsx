import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  Download,
  Gamepad2,
  Globe2,
  Camera,
  Menu,
  MessageCircle,
  Play,
  Search,
  Shield,
  Skull,
  Star,
  Swords,
  Trophy,
  Users,
  Volume2,
  Video,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Avatar Star — Fast-Paced Shooting Action",
  description:
    "Squad up, customize your avatar, and battle across colorful floating worlds in Avatar Star.",
};

const navigation = ["Game", "Characters", "Events", "News", "Community", "Support"];

const characters = [
  {
    name: "Luna",
    role: "Sniper",
    line: "Calm aim, big impact.",
    position: "15%",
    tone: "character-card-luna",
    stats: ["78%", "48%", "88%"],
  },
  {
    name: "Ryu",
    role: "Assault",
    line: "Fast moves, bigger wins.",
    position: "51%",
    tone: "character-card-ryu",
    stats: ["68%", "72%", "94%"],
  },
  {
    name: "Kai",
    role: "Heavy",
    line: "Bigger firepower, brighter victory.",
    position: "78%",
    tone: "character-card-kai",
    stats: ["94%", "86%", "46%"],
  },
];

function SectionTitle({
  icon,
  children,
  accent,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  accent: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-highlight text-ink shadow-game sm:size-14">
          {icon}
        </span>
        <h2 className="font-display text-3xl uppercase italic leading-none tracking-tight text-game-foreground sm:text-5xl">
          {children} <span className="text-highlight">{accent}</span>
        </h2>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-game text-game-foreground">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-game-foreground/10 bg-game/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 lg:h-[72px] lg:px-8">
          <Link href="#game" className="group mr-auto flex items-center gap-2" aria-label="Avatar Star home">
            <span className="relative flex size-9 rotate-[-8deg] items-center justify-center bg-highlight text-ink transition group-hover:rotate-0">
              <Star className="size-6 fill-current" />
            </span>
            <span className="font-display text-xl uppercase italic leading-[0.8] tracking-tight sm:text-2xl">
              Avatar<br /><span className="text-highlight">Star</span>
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
            {navigation.map((item, index) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link ${index === 0 ? "nav-link-active" : ""}`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <button type="button" aria-label="Search" className="icon-button"><Search className="size-5" /></button>
            <button type="button" aria-label="Choose language" className="icon-button"><Globe2 className="size-5" /></button>
            <Link href="#play" className="game-button game-button-small">
              <Gamepad2 className="size-5" /> Play now
            </Link>
          </div>

          <details className="relative ml-auto block shrink-0 lg:hidden">
            <summary className="icon-button list-none" aria-label="Open navigation">
              <Menu className="size-6" />
            </summary>
            <nav className="absolute right-0 top-12 grid w-56 gap-1 rounded-xl border border-game-border bg-game-raised p-2 shadow-game" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="rounded-lg px-4 py-3 text-sm font-bold uppercase hover:bg-game-surface">
                  {item}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </header>

      <section id="game" className="relative min-h-[760px] overflow-hidden sm:min-h-[720px] lg:aspect-[16/9] lg:min-h-0 lg:max-h-[940px]">
        <Image
          src="/hero.png"
          alt="Luna, Ryu and Kai charging into battle across the floating islands of Avatar Star"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center sm:block"
        />
        <Image
          src="/hero-mobile.png"
          alt="Luna, Ryu and Kai charging into battle across the floating islands of Avatar Star"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top sm:hidden"
        />
        <div className="hero-vignette absolute inset-0" />
        <div id="play" className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center px-4 sm:bottom-9 lg:bottom-10">
          <p className="mb-4 hidden font-display text-lg uppercase italic tracking-widest text-game-foreground drop-shadow-lg sm:block">
            Fast-paced shooting action
          </p>
          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <Link href="#characters" className="game-button flex-1">
              <Play className="size-6 fill-current" /> Play now
            </Link>
            <Link id="download" href="#support" className="game-button game-button-alt flex-1">
              <Download className="size-6" /> Download
            </Link>
          </div>
          <div className="mt-4 hidden items-center gap-5 text-xs font-semibold text-game-muted sm:flex">
            <span>● STEAM</span><span>▣ WINDOWS</span><span>● macOS</span><span>● iOS</span><span>● Android</span>
          </div>
        </div>
      </section>

      <section id="news" aria-label="Latest news" className="border-y border-info/40 bg-game-raised">
        <div className="mx-auto flex max-w-[1440px] items-center">
          <div className="flex h-12 shrink-0 items-center gap-2 bg-info px-4 font-display uppercase italic sm:px-8">
            <Volume2 className="size-5 fill-current" /> News
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-4 overflow-hidden px-4 text-xs sm:text-sm">
            <time className="text-game-muted">Oct 18</time>
            <p className="truncate font-bold">Season 3: Starfront Begins!</p>
            <span className="hidden text-game-muted md:inline">|</span>
            <p className="hidden truncate text-game-muted md:block">New Character “Nova” Arrives!</p>
          </div>
          <Link href="#events" className="mr-3 hidden items-center gap-2 rounded-md border border-info px-4 py-2 text-xs font-bold sm:flex">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <div className="game-grid-bg">
        <section id="events" className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <SectionTitle icon={<Star className="size-7 fill-current" />} accent="& Activities">Events</SectionTitle>
          <p className="mt-3 text-xs uppercase tracking-wider text-game-muted sm:ml-[70px]">Join exciting events, earn exclusive rewards, and be a star!</p>

          <div className="mt-7 grid gap-3 lg:grid-cols-2">
            <article className="event-feature group relative min-h-[330px] overflow-hidden rounded-xl border border-game-border shadow-game lg:min-h-[410px]">
              <Image src="/footer-img.png" alt="The Starfront floating island battlefield" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="event-overlay absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="badge badge-pink">Season 3</span>
                <h3 className="mt-3 font-display text-5xl uppercase italic leading-[0.85] sm:text-7xl">Starfront</h3>
                <p className="mt-3 max-w-sm text-sm font-bold uppercase text-game-muted">A new battlefield awaits</p>
                <Link href="#characters" className="game-button mt-5 w-fit px-7 py-3 text-sm">Learn more <ArrowRight className="size-4" /></Link>
              </div>
            </article>

            <div className="grid gap-3 sm:grid-cols-2">
              <article className="event-card event-card-orange">
                <CalendarDays className="size-8 text-highlight" />
                <div><p className="badge badge-orange">Oct 10–31</p><h3>Autumn Festival</h3><p>Complete missions and get limited skins!</p></div>
              </article>
              <article className="event-card event-card-purple">
                <Zap className="size-8 text-highlight" />
                <div><p className="badge badge-pink">2X XP</p><h3>Weekend Double XP</h3><p>Level faster with your whole squad.</p></div>
              </article>
              <article className="event-card event-card-blue">
                <Trophy className="size-9 text-highlight" />
                <div><p className="badge badge-blue">Ranked</p><h3>Star Tournament</h3><p>Prove your skill. Be a star!</p></div>
                <div className="mt-auto flex gap-3 font-display text-xl"><span>03<small>days</small></span><span>12<small>hours</small></span><span>34<small>min</small></span></div>
              </article>
              <article className="event-card event-card-green">
                <ClipboardCheck className="size-9 text-game-foreground" />
                <div><p className="badge badge-green">Daily</p><h3>Missions & Rewards</h3><p>Play. Complete. Reward.</p></div>
                <div className="mt-auto flex gap-2"><span className="reward-dot">★</span><span className="reward-dot">◆</span><span className="reward-dot">✚</span></div>
              </article>
            </div>
          </div>
        </section>

        <section id="characters" className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionTitle icon={<Skull className="size-8 fill-current" />} accent="">Characters</SectionTitle>
            <Link href="#characters" className="inline-flex items-center gap-2 rounded-lg border border-info px-4 py-2 text-xs font-bold hover:bg-info/10">
              View all characters <ArrowRight className="size-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs uppercase tracking-wider text-game-muted sm:ml-[70px]">Unique avatars, different styles, same epic battles!</p>

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {characters.map((character) => (
              <article key={character.name} className={`character-card ${character.tone}`}>
                <Image
                  src="/hero.png"
                  alt={`${character.name}, ${character.role} class hero`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: `${character.position} center` }}
                />
                <div className="character-shade absolute inset-0" />
                <div className="relative z-10 flex h-full flex-col p-6">
                  <h3 className="font-display text-5xl uppercase italic leading-none">{character.name}</h3>
                  <span className="badge mt-2 w-fit">{character.role}</span>
                  <p className="mt-3 max-w-44 font-display text-lg uppercase italic leading-tight">{character.line}</p>
                  <div className="mt-auto space-y-2 pt-32 text-[10px] font-bold uppercase">
                    {['Attack', 'Defense', 'Mobility'].map((stat, index) => (
                      <div key={stat} className="grid grid-cols-[62px_1fr] items-center gap-2">
                        <span>{stat}</span>
                        <span className="h-1.5 bg-game-foreground/20"><span className="block h-full bg-current" style={{ width: character.stats[index] }} /></span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <span className="ability"><Swords className="size-5" /></span>
                    <span className="ability"><Shield className="size-5" /></span>
                    <span className="ability"><Zap className="size-5" /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section id="community" className="relative min-h-[420px] overflow-hidden sm:aspect-[3/1] sm:min-h-0">
        <Image src="/footer-img.png" alt="The bright floating islands and sea of Avatar Star" fill sizes="100vw" className="hidden object-cover sm:block" />
        <Image src="/footer-mobile.png" alt="The bright floating islands and sea of Avatar Star" fill sizes="100vw" className="object-cover sm:hidden" />
        <div className="footer-scene-shade absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <p className="font-display text-3xl uppercase italic drop-shadow-lg sm:text-5xl">Different avatars. Same sky.</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest drop-shadow-lg">Let&apos;s shoot for a brighter tomorrow!</p>
            <Link href="#play" className="game-button mx-auto mt-6 w-fit">Join the battle <ChevronRight className="size-5" /></Link>
          </div>
        </div>
      </section>

      <footer id="support" className="border-t border-game-border bg-game-deep">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link href="#game" className="flex items-center gap-3 font-display text-xl uppercase italic"><Star className="size-7 fill-highlight text-highlight" /> Avatar Star</Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-game-muted" aria-label="Footer navigation">
            {navigation.map((item) => <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-game-foreground">{item}</Link>)}
          </nav>
          <div className="flex items-center gap-4 text-game-muted">
            <MessageCircle className="size-4" /><Video className="size-4" /><Camera className="size-4" /><Users className="size-4" />
            <span className="flex items-center gap-2 rounded-md border border-game-border px-3 py-2 text-xs"><Globe2 className="size-4" /> English</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
