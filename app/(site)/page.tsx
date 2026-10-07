"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Crosshair,
  Download,
  Gamepad2,
  MessageCircle,
  Play,
  Search,
  Shield,
  Skull,
  Sparkles,
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
import { siteContent } from "@/lib/translations";
import { AvatarStarNavbar } from "@/components/avatar-star-navbar";
import { AvatarStarFooter } from "@/components/avatar-star-footer";
import { HallOfFame } from "@/components/hall-of-fame";

export default function HomePage() {
  const t = siteContent;
  const [activeNav, setActiveNav] = useState("home");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const characterClasses = [
    {
      id: "assassin",
      name: t.characters.assassin?.name || "Assassin",
      role: t.characters.assassin?.role || "Stealth & Melee",
      line: t.characters.assassin?.line || "Shadow speed, lethal strikes.",
      desc: t.characters.assassin?.desc || "Master of covert infiltration and rapid dual-blade execution.",
      playstyle: t.characters.assassin?.playstyle || "High mobility, deadly burst damage from behind enemy lines.",
      image: "/images/characters/assassin.png",
      titleImage: "/images/characters/title-assassin.png",
      tone: "character-card-assassin",
      tabActive: "as-char-tab-active-assassin",
      accentGradient: "from-purple-900/40 via-fuchsia-950/20 to-transparent",
      accentBorder: "border-purple-500/70 shadow-[0_0_35px_rgba(168,85,247,0.35)]",
      badgeColor: "bg-purple-950/90 border-purple-500/60 text-purple-200",
      barColor: "bg-purple-500 shadow-[0_0_12px_#a855f7]",
      stats: [
        { label: t.characters.stats.attack, percent: "95%" },
        { label: t.characters.stats.defense, percent: "48%" },
        { label: t.characters.stats.mobility, percent: "98%" },
      ],
      weapons: ["มีดโค้งสังหารคู่", "ระเบิดควันพรางตัว", "เคียวความมืด"],
    },
    {
      id: "gunner",
      name: t.characters.gunner?.name || "Gunner",
      role: t.characters.gunner?.role || "Heavy Firepower",
      line: t.characters.gunner?.line || "Maximum ammo, explosive beats.",
      desc: t.characters.gunner?.desc || "Lays down devastating suppression fire with heavy gatling weaponry.",
      playstyle: t.characters.gunner?.playstyle || "Sustained suppressive fire and frontline demolition power.",
      image: "/images/characters/gunner.png",
      titleImage: "/images/characters/title-gunner.png",
      tone: "character-card-gunner",
      tabActive: "as-char-tab-active-gunner",
      accentGradient: "from-amber-900/40 via-orange-950/20 to-transparent",
      accentBorder: "border-amber-500/70 shadow-[0_0_35px_rgba(245,158,11,0.35)]",
      badgeColor: "bg-amber-950/90 border-amber-500/60 text-amber-200",
      barColor: "bg-amber-400 shadow-[0_0_12px_#f59e0b]",
      stats: [
        { label: t.characters.stats.attack, percent: "92%" },
        { label: t.characters.stats.defense, percent: "78%" },
        { label: t.characters.stats.mobility, percent: "58%" },
      ],
      weapons: ["ปืนกลกิตาร์เฮฟวี่", "กระสุนระเบิดแรงสูง", "จรวดนำวิถี"],
    },
    {
      id: "biochemist",
      name: t.characters.biochemist?.name || "Biochemist",
      role: t.characters.biochemist?.role || "Toxic Hazard",
      line: t.characters.biochemist?.line || "Corrosive chemicals, tactical control.",
      desc: t.characters.biochemist?.desc || "Dominates the zone with hazardous chemical compounds and debuffs.",
      playstyle: t.characters.biochemist?.playstyle || "Area denial, corrosive damage-over-time, and combat disruption.",
      image: "/images/characters/biochemist.png",
      titleImage: "/images/characters/title-biochemist.png",
      tone: "character-card-biochemist",
      tabActive: "as-char-tab-active-biochemist",
      accentGradient: "from-rose-900/40 via-red-950/20 to-transparent",
      accentBorder: "border-rose-500/70 shadow-[0_0_35px_rgba(244,63,94,0.35)]",
      badgeColor: "bg-rose-950/90 border-rose-500/60 text-rose-200",
      barColor: "bg-rose-500 shadow-[0_0_12px_#f43f5e]",
      stats: [
        { label: t.characters.stats.attack, percent: "86%" },
        { label: t.characters.stats.defense, percent: "72%" },
        { label: t.characters.stats.mobility, percent: "70%" },
      ],
      weapons: ["ปืนยิงสารชีวเคมี", "กระบอกก๊าซพิษกัดกร่อน", "ระเบิดมลพิษวงกว้าง"],
    },
    {
      id: "guardian",
      name: t.characters.guardian?.name || "Guardian",
      role: t.characters.guardian?.role || "Shield & Support",
      line: t.characters.guardian?.line || "Healing light, energy barrier.",
      desc: t.characters.guardian?.desc || "Deploys impenetrable force fields and delivers vital restorative aids.",
      playstyle: t.characters.guardian?.playstyle || "Team defense, emergency healing, and tactical frontline anchor.",
      image: "/images/characters/guardian.png",
      titleImage: "/images/characters/title-guardian.png",
      tone: "character-card-guardian",
      tabActive: "as-char-tab-active-guardian",
      accentGradient: "from-sky-900/40 via-cyan-950/20 to-transparent",
      accentBorder: "border-sky-500/70 shadow-[0_0_35px_rgba(14,165,233,0.35)]",
      badgeColor: "bg-sky-950/90 border-sky-500/60 text-sky-200",
      barColor: "bg-sky-400 shadow-[0_0_12px_#38bdf8]",
      stats: [
        { label: t.characters.stats.attack, percent: "68%" },
        { label: t.characters.stats.defense, percent: "96%" },
        { label: t.characters.stats.mobility, percent: "74%" },
      ],
      weapons: ["หน้าไม้ยิงพัลส์ฟื้นฟู", "โล่พลังงานบริสุทธิ์", "แอมพูลนาโนรักษา"],
    },
  ];

  const activeChar = characterClasses[activeCharIndex];

  const handleNextChar = () => {
    setActiveCharIndex((prev) => (prev + 1) % characterClasses.length);
  };

  const handlePrevChar = () => {
    setActiveCharIndex((prev) => (prev - 1 + characterClasses.length) % characterClasses.length);
  };

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
          src="/images/backgrounds/hero.png"
          alt="Luna, Ryu and Kai charging into battle across the floating islands of Avatar Star"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hidden sm:block object-cover object-center w-full h-full"
        />
        <Image
          src="/images/backgrounds/hero-mobile.png"
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
          <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 sm:gap-6" data-motion="stagger">
            {/* REGISTER BUTTON (GOLD) */}
            <Link
              href="/register"
              className="as-hero-btn as-hero-btn-gold as-btn-shimmer group flex-1 min-w-[220px] max-w-[280px]"
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
              className="as-hero-btn as-hero-btn-blue as-btn-shimmer group flex-1 min-w-[220px] max-w-[280px]"
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
              className="as-hero-btn as-hero-btn-pink as-btn-shimmer group flex-1 min-w-[220px] max-w-[280px]"
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
        </div>

        {/* WATCH TRAILER FLOATING CARD (BOTTOM RIGHT) */}
        <div className="absolute bottom-8 right-6 z-20 hidden lg:block xl:right-12 as-motion-float">
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="group relative flex items-center gap-3 overflow-hidden rounded-xl border-2 border-info/70 bg-game-deep/90 p-2.5 shadow-[0_0_25px_rgba(16,174,242,0.4)] backdrop-blur-md transition-all hover:scale-105 hover:border-info hover:shadow-[0_0_35px_rgba(16,174,242,0.7)]"
          >
            <div className="relative size-14 overflow-hidden rounded-lg">
              <Image
                src="/images/backgrounds/footer-img.png"
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
                {t.hero.trailerBadge}
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
      <section id="news" aria-label="Latest news" className="as-news-ticker-bar py-2" data-motion="fade-up">
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

      {/* EVENTS SECTION */}
      <section id="events" className="relative overflow-hidden py-12 sm:py-16 lg:py-24 border-t border-game-border/60">
        {/* Background Image: public/images/event/bg.png */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/event/bg.png"
            alt="Avatar Star Events Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Multi-layered overlay for high contrast & readability */}
          <div className="absolute inset-0 bg-game-deep/85 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-game-deep via-transparent to-game-deep" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* 3D Events & News Header Graphic - Centered */}
          <div className="relative flex flex-col items-center justify-center pb-4 sm:pb-6 as-motion-float">
            <Link href="/events" className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 block">
              <h2 className="sr-only">
                {t.events.title} {t.events.accent} - {t.events.subtitle}
              </h2>
              {/* Radiant cyan/blue glow behind 3D artwork */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/25 via-cyan-400/30 to-amber-400/20 blur-2xl opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              <Image
                src="/images/event/title.png"
                alt="กิจกรรมและข่าวสาร Avatar Star"
                width={720}
                height={264}
                priority
                className="relative z-10 h-28 sm:h-36 md:h-44 lg:h-48 w-auto max-w-[95vw] object-contain drop-shadow-[0_14px_36px_rgba(0,0,0,0.85)] filter"
              />
            </Link>
          </div>

                    {/* COMING SOON EVENT SHOWCASE */}
          <div className="mt-8 flex flex-col items-center justify-center" data-motion="scale-in">
            <div className="relative group w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-game-border/80 shadow-2xl bg-game-deep/80 backdrop-blur-md transition-all duration-300 hover:border-info hover:shadow-[0_0_35px_rgba(16,174,242,0.35)]">
              <Image
                src="/images/event/coming-soon.png"
                alt="Avatar Star Events Coming Soon"
                width={1672}
                height={941}
                priority
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* ========================================================
              TEMPORARILY COMMENTED OUT: Events Grid & View All Button
              ========================================================
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <!-- Feature Card -->
            <article className="event-feature group relative min-h-[340px] overflow-hidden rounded-2xl border border-game-border shadow-game lg:min-h-[420px]">
              <Image
                src="/images/event/bg.png"
                alt="Avatar Star Harbor Event"
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
                  href="/events"
                  className="game-button-3d-purple mt-6 w-fit px-7 py-3 text-sm"
                >
                  {t.events.starfront.learnMore} <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>

            <!-- Grid Cards -->
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

          <!-- View All Events Action -->
          <div className="mt-8 flex justify-center">
            <Link
              href="/events"
              className="as-btn-cyan px-8 py-3 text-sm sm:text-base font-black shadow-[0_8px_24px_rgba(2,132,199,0.45)]"
            >
              <span>ดูปฏิทินและกิจกรรมทั้งหมด</span>
              <ArrowRight className="size-4.5 stroke-[2.5]" />
            </Link>
          </div>
          */}
        </div>
      </section>

      {/* CHARACTERS SECTION WITH GAME SLIDEBAR */}
      <section
        id="characters"
        aria-label="Character Classes Roster"
        className="relative overflow-hidden pt-2 sm:pt-4 lg:pt-6 pb-14 sm:pb-20 lg:pb-24 border-t border-game-border/60"
        onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const diff = touchStart - e.changedTouches[0].clientX;
          if (diff > 50) handleNextChar();
          if (diff < -50) handlePrevChar();
          setTouchStart(null);
        }}
      >
        {/* Background Artwork: characters/bg.png */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/characters/bg.png"
            alt="Avatar Star Characters Showcase Stage"
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-60"
          />
          {/* Sci-Fi Stage Atmosphere Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-game-deep/95 via-game-deep/75 to-game-deep" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(11,19,43,0.85)_100%)] pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* Header Area with Centered Extra-Large 3D Graphic */}
          <div className="relative flex flex-col items-center justify-center pt-1 pb-2 as-motion-float-slow">
            <h2 className="sr-only">
              {t.characters.title} - {t.characters.subtitle}
            </h2>

            {/* Giant Centered 3D Typography Graphic */}
            <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 via-sky-400/30 to-amber-400/20 blur-2xl opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              <Image
                src="/images/characters/text.png"
                alt="ตัวละคร - เลือกสไตล์การเล่นในแบบของคุณ"
                width={760}
                height={570}
                priority
                className="relative z-10 h-36 sm:h-48 md:h-60 lg:h-72 xl:h-80 w-auto max-w-[95vw] object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] filter"
              />
            </div>

            {/* View All Button */}
            <div className="mt-3 sm:mt-0 sm:absolute sm:right-0 sm:top-2 md:top-4 z-20">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 rounded-xl border border-info/60 bg-game-deep/70 px-4 py-2 text-xs sm:text-sm font-bold text-info hover:bg-info/20 hover:border-info shadow-[0_4px_16px_rgba(16,174,242,0.25)] backdrop-blur-md transition-all"
              >
                <span>{t.characters.viewAll}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* 1. INTERACTIVE CLASS SELECTOR TABS (SLIDEBAR TABS) */}
          <div className="my-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5" data-motion="fade-up">
            {characterClasses.map((char, index) => {
              const isActive = activeCharIndex === index;
              return (
                <button
                  key={char.id}
                  type="button"
                  onClick={() => setActiveCharIndex(index)}
                  className={`as-char-tab ${isActive ? `${char.tabActive} active` : ""}`}
                  aria-label={char.name}
                  aria-selected={isActive}
                >
                  <span className="sr-only">{char.name}</span>
                  <Image
                    src={char.titleImage}
                    alt={char.name}
                    width={220}
                    height={74}
                    priority
                    className={`h-6 sm:h-7.5 md:h-9 w-auto max-w-[95px] sm:max-w-[125px] md:max-w-[155px] object-contain transition-all duration-200 ${
                      isActive
                        ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] filter brightness-110"
                        : "filter brightness-90 hover:brightness-105"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* 2. MAIN CHARACTER SHOWCASE SLIDER */}
          <div className="relative mt-4 sm:mt-6 rounded-3xl border border-game-border/80 bg-game-deep/70 p-4 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md" data-motion="fade-up">
            {/* Ambient Backlight for Active Class */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${activeChar.accentGradient} pointer-events-none transition-colors duration-500`} />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Interactive Poster Slide with Next/Prev Arrow Controls */}
              <div className="flex flex-col items-center lg:col-span-5 xl:col-span-5">
                <div className="relative flex w-full max-w-[340px] sm:max-w-[400px] items-center justify-center">
                  {/* Previous Arrow Button */}
                  <button
                    type="button"
                    onClick={handlePrevChar}
                    aria-label="Previous Character"
                    className="as-slide-arrow absolute -left-3 sm:-left-6 z-30 size-11 sm:size-14"
                  >
                    <ChevronLeft className="size-6 sm:size-7" />
                  </button>

                  {/* Character Poster Card */}
                  <div className={`relative w-full aspect-[4/5] overflow-hidden rounded-2xl border-2 ${activeChar.accentBorder} bg-black/40 transition-all duration-500`}>
                    <Image
                      key={activeChar.id}
                      src={activeChar.image}
                      alt={`${activeChar.name} - ${activeChar.role}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 400px, 90vw"
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />

                    {/* Class Index Watermark badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="font-display text-xs sm:text-sm tracking-wider uppercase px-3 py-1 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md">
                        CLASS 0{activeCharIndex + 1} / 04
                      </span>
                    </div>
                  </div>

                  {/* Next Arrow Button */}
                  <button
                    type="button"
                    onClick={handleNextChar}
                    aria-label="Next Character"
                    className="as-slide-arrow absolute -right-3 sm:-right-6 z-30 size-11 sm:size-14"
                  >
                    <ChevronRight className="size-6 sm:size-7" />
                  </button>
                </div>
              </div>

              {/* Right Column: Character Combat HUD, Stats & Lore */}
              <div className="flex flex-col lg:col-span-7 xl:col-span-7">
                {/* Class Badge & Name */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-black uppercase tracking-wider ${activeChar.badgeColor} backdrop-blur-sm`}>
                    <Sparkles className="size-3.5" />
                    <span>{activeChar.role}</span>
                  </span>
                  <span className="text-xs font-bold text-game-muted uppercase tracking-widest">
                    Avatar Star Combat Division
                  </span>
                </div>

                {/* 3D Metallic Class Title Graphic replacing plain text heading */}
                <div className="relative mt-2 mb-1 flex items-center">
                  <h3 className="sr-only">{activeChar.name}</h3>
                  <Image
                    key={activeChar.id}
                    src={activeChar.titleImage}
                    alt={activeChar.name}
                    width={480}
                    height={160}
                    priority
                    className="h-14 sm:h-18 md:h-20 lg:h-24 w-auto max-w-[90vw] object-contain drop-shadow-[0_10px_26px_rgba(0,0,0,0.85)] filter transition-all duration-300 hover:scale-105"
                  />
                </div>

                <p className="mt-2 text-base font-bold italic text-sky-200/90 sm:text-lg">
                  &quot;{activeChar.line}&quot;
                </p>

                {/* Lore / Playstyle Box */}
                <div className="mt-5 rounded-2xl border border-game-border/80 bg-game/60 p-4 sm:p-5 backdrop-blur-sm">
                  <p className="text-sm leading-relaxed text-sky-100/90">
                    {activeChar.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-2 pt-3 border-t border-game-border/50 text-xs font-bold text-sky-300">
                    <span className="text-highlight">⚡ Playstyle:</span>
                    <span>{activeChar.playstyle}</span>
                  </div>
                </div>

                {/* Combat Stats Bars */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-game-muted">
                    Combat Performance Rating
                  </h4>
                  {activeChar.stats.map((stat) => (
                    <div key={stat.label} className="grid grid-cols-[90px_1fr_45px] sm:grid-cols-[100px_1fr_45px] items-center gap-3">
                      <span className="text-xs font-black uppercase text-white tracking-wide">
                        {stat.label}
                      </span>
                      <div className="h-3 w-full rounded-full bg-black/60 p-0.5 border border-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${activeChar.barColor}`}
                          style={{ width: stat.percent }}
                        />
                      </div>
                      <span className="text-right font-display text-xs font-black text-sky-200">
                        {stat.percent}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Signature Weaponry Chips */}
                <div className="mt-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-game-muted mb-2.5">
                    Signature Loadout
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeChar.weapons.map((w) => (
                      <span
                        key={w}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-game-border bg-game-deep/80 px-3 py-1.5 text-xs font-extrabold text-white shadow-sm"
                      >
                        <Crosshair className="size-3.5 text-info" />
                        <span>{w}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons & Slidebar Tracker */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-game-border/60">
                  <Link
                    href="/download"
                    className="as-dl-btn px-8 py-3 text-base shadow-[0_8px_24px_rgba(245,158,11,0.5)]"
                  >
                    <Download className="size-5 stroke-[2.8]" />
                    <span>เลือกเล่นคลาสนี้</span>
                  </Link>

                  {/* Interactive Slidebar Tracker */}
                  <div className="flex items-center gap-2">
                    {characterClasses.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveCharIndex(idx)}
                        aria-label={`Jump to Character ${idx + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeCharIndex === idx
                            ? "w-8 bg-info shadow-[0_0_10px_#10aef2]"
                            : "w-2.5 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. QUICK-PICK SLIDEBAR ROSTER THUMBNAILS */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto py-2">
            {characterClasses.map((char, index) => {
              const isSelected = activeCharIndex === index;
              return (
                <button
                  key={char.id}
                  type="button"
                  onClick={() => setActiveCharIndex(index)}
                  className={`group relative flex flex-col items-center rounded-xl p-1 transition-all duration-300 ${
                    isSelected
                      ? "scale-105 border-2 border-info shadow-[0_0_20px_rgba(16,174,242,0.5)] bg-game-deep"
                      : "opacity-60 hover:opacity-100 hover:scale-100 border border-game-border/50 bg-game-deep/50"
                  }`}
                >
                  <div className="relative w-16 sm:w-20 md:w-24 aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={char.image}
                      alt={char.name}
                      fill
                      sizes="100px"
                      className="object-cover object-top"
                    />
                  </div>
                  <span className={`mt-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider ${isSelected ? "text-white" : "text-game-muted"}`}>
                    {char.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* HALL OF FAME LEADERBOARD */}
      <HallOfFame />

      {/* FOOTER */}
      <AvatarStarFooter />
    </main>
  );
}
