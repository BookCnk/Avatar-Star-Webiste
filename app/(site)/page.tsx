"use client";

import React, { useState } from "react";
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
  Check,
  X,
  UserPlus,
  CreditCard,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { AvatarStarNavbar } from "@/components/avatar-star-navbar";
import { AvatarStarFooter } from "@/components/avatar-star-footer";

export default function HomePage() {
  const { lang, setLang, t } = useLanguage();
  const [activeNav, setActiveNav] = useState("home");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const navigationItems = [
    { key: "home", label: t.nav.home, href: "#game" },
    { key: "game", label: t.nav.game, href: "#game" },
    { key: "characters", label: t.nav.characters, href: "#characters" },
    { key: "events", label: t.nav.events, href: "#events" },
    { key: "news", label: t.nav.news, href: "#news" },
    { key: "community", label: t.nav.community, href: "#community" },
    { key: "download", label: t.nav.downloadNav, href: "/download" },
    { key: "support", label: t.nav.support, href: "#support" },
  ];

  const characters = [
    {
      name: t.characters.luna.name,
      role: t.characters.luna.role,
      line: t.characters.luna.line,
      position: "15%",
      tone: "character-card-luna",
      stats: ["78%", "48%", "88%"],
    },
    {
      name: t.characters.ryu.name,
      role: t.characters.ryu.role,
      line: t.characters.ryu.line,
      position: "51%",
      tone: "character-card-ryu",
      stats: ["68%", "72%", "94%"],
    },
    {
      name: t.characters.kai.name,
      role: t.characters.kai.role,
      line: t.characters.kai.line,
      position: "78%",
      tone: "character-card-kai",
      stats: ["94%", "86%", "46%"],
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-game text-game-foreground">
      {/* AVATAR STAR ARCADE CAPSULE NAVBAR */}
      <AvatarStarNavbar activeNav={activeNav} onNavClick={setActiveNav} />

      {/* HERO SECTION - 100% FULLSCREEN FIT WITHOUT OVERFLOW */}
      <section
        id="game"
        className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-end"
      >
        {/* Background Image Edge-to-Edge Desktop & Mobile */}
        <Image
          src="/hero.png"
          alt="Luna, Ryu and Kai charging into battle across the floating islands of Avatar Star"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hidden sm:block object-cover object-center w-full h-full"
        />
        <Image
          src="/hero-mobile.png"
          alt="Luna, Ryu and Kai charging into battle across the floating islands of Avatar Star"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="block sm:hidden object-cover object-[center_top] w-full h-full"
        />

        {/* Subtle Bottom Transition Overlay */}
        <div className="hero-vignette absolute inset-0 pointer-events-none" />

        {/* Hero Bottom Center Glossy Action Buttons */}
        <div
          id="play"
          className="relative z-20 flex flex-col items-center justify-center px-4 pb-4 sm:pb-6 lg:pb-8"
        >
          {/* 3 GLOSSY PILL BUTTONS (REGISTER, DOWNLOAD, TOP-UP) */}
          <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* REGISTER BUTTON (GOLD) */}
            <Link
              href="#characters"
              className="as-hero-btn as-hero-btn-gold group flex-1 min-w-[220px] max-w-[280px]"
            >
              <div className="as-hero-btn-badge group-hover:rotate-6 transition-transform">
                <UserPlus className="size-6 text-[#07152f] stroke-[2.8]" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-[10px] font-black uppercase text-[#2e1c00] tracking-wide">
                  {t.hero.btnRegisterSub}
                </span>
                <span className="mt-0.5 block font-display text-2xl font-black uppercase tracking-wider text-[#07152f] drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                  {t.hero.btnRegisterMain}
                </span>
              </div>
              <div className="ml-auto hidden sm:flex size-7 items-center justify-center rounded-full bg-black/10 text-[#07152f] transition-transform group-hover:translate-x-1">
                <ChevronRight className="size-4 stroke-[3]" />
              </div>
            </Link>

            {/* DOWNLOAD BUTTON (CYAN-BLUE) */}
            <Link
              href="/download"
              className="as-hero-btn as-hero-btn-blue group flex-1 min-w-[220px] max-w-[280px]"
            >
              <div className="as-hero-btn-badge group-hover:rotate-6 transition-transform">
                <Download className="size-6 text-white stroke-[2.8]" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-[10px] font-black uppercase text-white/95 tracking-wide drop-shadow-[0_1px_2px_rgba(0,30,90,0.8)]">
                  {t.hero.btnDownloadSub}
                </span>
                <span className="mt-0.5 block font-display text-2xl font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,30,90,0.8)]">
                  {t.hero.btnDownloadMain}
                </span>
              </div>
              <div className="ml-auto hidden sm:flex size-7 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:translate-x-1">
                <ChevronRight className="size-4 stroke-[3]" />
              </div>
            </Link>

            {/* TOP-UP BUTTON (RUBY PINK) */}
            <Link
              href="#support"
              className="as-hero-btn as-hero-btn-pink group flex-1 min-w-[220px] max-w-[280px]"
            >
              <div className="as-hero-btn-badge group-hover:rotate-6 transition-transform">
                <CreditCard className="size-6 text-white stroke-[2.8]" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-[10px] font-black uppercase text-white/95 tracking-wide drop-shadow-[0_1px_2px_rgba(70,0,30,0.8)]">
                  {t.hero.btnTopUpSub}
                </span>
                <span className="mt-0.5 block font-display text-2xl font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(70,0,30,0.8)]">
                  {t.hero.btnTopUpMain}
                </span>
              </div>
              <div className="ml-auto hidden sm:flex size-7 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:translate-x-1">
                <ChevronRight className="size-4 stroke-[3]" />
              </div>
            </Link>
          </div>

          {/* Platform Support Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-extrabold text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span>● {t.hero.platforms.steam}</span>
            <span>▣ {t.hero.platforms.windows}</span>
            <span>● {t.hero.platforms.macos}</span>
            <span>● {t.hero.platforms.ios}</span>
            <span>● {t.hero.platforms.android}</span>
          </div>
        </div>

        {/* WATCH TRAILER FLOATING CARD (BOTTOM RIGHT) */}
        <div className="absolute bottom-8 right-6 z-20 hidden lg:block xl:right-12">
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="group relative flex items-center gap-3 overflow-hidden rounded-xl border-2 border-info/70 bg-game-deep/90 p-2.5 shadow-[0_0_25px_rgba(16,174,242,0.4)] backdrop-blur-md transition-all hover:scale-105 hover:border-info hover:shadow-[0_0_35px_rgba(16,174,242,0.7)]"
          >
            <div className="relative size-14 overflow-hidden rounded-lg">
              <Image
                src="/footer-img.png"
                alt="Watch Trailer Preview"
                fill
                className="object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="flex size-8 items-center justify-center rounded-full bg-info text-ink shadow-[0_0_12px_#10aef2]">
                  <Play className="size-4 fill-current ml-0.5" />
                </span>
              </div>
            </div>
            <div className="pr-3 text-left">
              <span className="block font-display text-sm uppercase tracking-wider text-white">
                {t.hero.watchTrailer}
              </span>
              <span className="block text-[10px] font-bold uppercase text-info">
                Official Season 3
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl rounded-2xl border border-game-border bg-game-deep p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute -right-3 -top-3 flex size-9 items-center justify-center rounded-full bg-danger text-white shadow-lg transition hover:scale-110"
            >
              <X className="size-5" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                className="size-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Avatar Star Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* NEWS TICKER BAR */}
      <section id="news" aria-label="Latest news" className="as-news-ticker-bar py-2">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="as-news-category-badge">
            <Volume2 className="size-4 fill-current" />
            <span>{t.news.category}</span>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden px-2 text-xs sm:text-sm">
            <span className="as-news-date-pill">{t.news.item1Date}</span>
            <p className="truncate font-bold text-white transition hover:text-sky-300 cursor-pointer drop-shadow">
              {t.news.item1}
            </p>
            <span className="hidden text-sky-400/40 md:inline">|</span>
            <span className="as-news-date-pill hidden md:inline-flex">{t.news.item2Date}</span>
            <p className="hidden truncate text-sky-100/90 md:block transition hover:text-white cursor-pointer drop-shadow">
              {t.news.item2}
            </p>
          </div>

          <Link href="#events" className="as-news-view-all-btn shrink-0">
            <span>{t.news.viewAll}</span>
            <ArrowRight className="size-3.5 stroke-[2.8]" />
          </Link>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <div className="game-grid-bg">
        {/* EVENTS SECTION */}
        <section id="events" className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-highlight text-ink shadow-[0_0_20px_rgba(255,213,28,0.5)] sm:size-14">
                <Star className="size-7 fill-current" />
              </span>
              <h2 className="font-display text-3xl uppercase leading-none tracking-tight text-game-foreground sm:text-5xl">
                {t.events.title} <span className="text-highlight">{t.events.accent}</span>
              </h2>
            </div>
          </div>
          <p className="mt-3 text-xs uppercase tracking-wider text-game-muted sm:ml-[70px]">
            {t.events.subtitle}
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {/* Feature Card */}
            <article className="event-feature group relative min-h-[340px] overflow-hidden rounded-2xl border border-game-border shadow-game lg:min-h-[420px]">
              <Image
                src="/footer-img.png"
                alt="The Starfront floating island battlefield"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="event-overlay absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="badge badge-pink">{t.events.starfront.tag}</span>
                <h3 className="mt-3 font-display text-5xl uppercase leading-[0.85] text-white sm:text-7xl">
                  {t.events.starfront.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm font-bold uppercase text-game-muted">
                  {t.events.starfront.desc}
                </p>
                <Link
                  href="#characters"
                  className="game-button-3d-purple mt-6 w-fit px-7 py-3 text-sm"
                >
                  {t.events.starfront.learnMore} <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>

            {/* Grid Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="event-card event-card-orange">
                <CalendarDays className="size-8 text-highlight" />
                <div>
                  <p className="badge badge-orange">{t.events.autumn.tag}</p>
                  <h3>{t.events.autumn.title}</h3>
                  <p>{t.events.autumn.desc}</p>
                </div>
              </article>

              <article className="event-card event-card-purple">
                <Zap className="size-8 text-highlight" />
                <div>
                  <p className="badge badge-pink">{t.events.doubleXp.tag}</p>
                  <h3>{t.events.doubleXp.title}</h3>
                  <p>{t.events.doubleXp.desc}</p>
                </div>
              </article>

              <article className="event-card event-card-blue">
                <Trophy className="size-9 text-highlight" />
                <div>
                  <p className="badge badge-blue">{t.events.tournament.tag}</p>
                  <h3>{t.events.tournament.title}</h3>
                  <p>{t.events.tournament.desc}</p>
                </div>
                <div className="mt-auto flex gap-3 font-display text-xl text-white">
                  <span>03<small>{t.events.tournament.days}</small></span>
                  <span>12<small>{t.events.tournament.hours}</small></span>
                  <span>34<small>{t.events.tournament.min}</small></span>
                </div>
              </article>

              <article className="event-card event-card-green">
                <ClipboardCheck className="size-9 text-game-foreground" />
                <div>
                  <p className="badge badge-green">{t.events.daily.tag}</p>
                  <h3>{t.events.daily.title}</h3>
                  <p>{t.events.daily.desc}</p>
                </div>
                <div className="mt-auto flex gap-2">
                  <span className="reward-dot">★</span>
                  <span className="reward-dot">◆</span>
                  <span className="reward-dot">✚</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CHARACTERS SECTION */}
        <section id="characters" className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-highlight text-ink shadow-[0_0_20px_rgba(255,213,28,0.5)] sm:size-14">
                <Skull className="size-7 fill-current" />
              </span>
              <h2 className="font-display text-3xl uppercase leading-none tracking-tight text-game-foreground sm:text-5xl">
                {t.characters.title}
              </h2>
            </div>
            <Link
              href="#characters"
              className="inline-flex items-center gap-2 rounded-lg border border-info/60 px-4 py-2 text-xs font-bold text-info hover:bg-info/10"
            >
              {t.characters.viewAll} <ArrowRight className="size-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs uppercase tracking-wider text-game-muted sm:ml-[70px]">
            {t.characters.subtitle}
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
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
                  <h3 className="font-display text-5xl uppercase leading-none text-white">
                    {character.name}
                  </h3>
                  <span className="badge mt-2 w-fit">{character.role}</span>
                  <p className="mt-3 max-w-44 font-display text-lg uppercase leading-tight text-white">
                    {character.line}
                  </p>

                  <div className="mt-auto space-y-2 pt-28 text-[10px] font-extrabold uppercase">
                    {[t.characters.stats.attack, t.characters.stats.defense, t.characters.stats.mobility].map(
                      (stat, index) => (
                        <div key={stat} className="grid grid-cols-[70px_1fr] items-center gap-2">
                          <span className="text-white">{stat}</span>
                          <span className="h-2 rounded-full bg-black/60 p-0.5 border border-white/10">
                            <span
                              className="block h-full rounded-full bg-current shadow-[0_0_8px_currentColor]"
                              style={{ width: character.stats[index] }}
                            />
                          </span>
                        </div>
                      )
                    )}
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

      {/* COMMUNITY HERO BANNER */}
      <section id="community" className="relative min-h-[420px] overflow-hidden sm:aspect-[3/1] sm:min-h-0">
        <Image
          src="/footer-img.png"
          alt="The bright floating islands and sea of Avatar Star"
          fill
          sizes="100vw"
          className="hidden object-cover sm:block"
        />
        <Image
          src="/footer-mobile.png"
          alt="The bright floating islands and sea of Avatar Star"
          fill
          sizes="100vw"
          className="object-cover sm:hidden"
        />
        <div className="footer-scene-shade absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <p className="font-display text-4xl uppercase text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-6xl">
              {t.community.title}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest text-highlight drop-shadow-md">
              {t.community.subtitle}
            </p>
            <Link href="#play" className="game-button-3d-yellow mx-auto mt-6 w-fit">
              {t.community.join} <ChevronRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <AvatarStarFooter />
    </main>
  );
}
