"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  Trophy,
  CalendarDays,
  Gift,
  Users,
  Clock,
  Sparkles,
  Share2,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  X,
  Search,
  Gamepad2,
  Swords,
  Star,
  ShieldCheck,
  Download,
  Check,
  Radio,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { AvatarStarNavbar } from "@/components/avatar-star-navbar";
import { AvatarStarFooter } from "@/components/avatar-star-footer";
import {
  eventsList,
  EventItem,
  EventCategory,
  EventStatus,
  EventReward,
} from "@/lib/events-data";

export default function EventsPage() {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<"all" | EventCategory>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | EventStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Featured event (first featured item or default)
  const featuredEvent = useMemo(
    () => eventsList.find((e) => e.featured) || eventsList[0],
    []
  );

  // Live countdown timer for featured event
  const [countdown, setCountdown] = useState({
    days: 38,
    hours: 14,
    minutes: 26,
    seconds: 45,
  });

  useEffect(() => {
    if (!featuredEvent.countdownDate) return;
    const target = new Date(featuredEvent.countdownDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [featuredEvent.countdownDate]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return eventsList.filter((event) => {
      // Category filter
      if (selectedCategory !== "all" && event.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== "all" && event.status !== selectedStatus) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleEn = event.title.en.toLowerCase();
        const titleTh = event.title.th.toLowerCase();
        const descEn = event.shortDesc.en.toLowerCase();
        const descTh = event.shortDesc.th.toLowerCase();
        return (
          titleEn.includes(query) ||
          titleTh.includes(query) ||
          descEn.includes(query) ||
          descTh.includes(query)
        );
      }
      return true;
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  const handleShare = (event: EventItem) => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/events?id=${event.slug}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        setCopiedId(event.id);
        setTimeout(() => setCopiedId(null), 2500);
      }
    }
  };

  const getRarityBadgeClass = (rarity: EventReward["rarity"]) => {
    switch (rarity) {
      case "legendary":
        return "bg-highlight/20 text-highlight border border-highlight/50";
      case "epic":
        return "bg-brand-violet/25 text-game-foreground border border-brand-violet/60";
      case "rare":
        return "bg-info/20 text-info border border-info/40";
      default:
        return "bg-game-surface text-game-muted border border-game-border";
    }
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case "ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-green/60 bg-brand-green/20 px-2 py-0.5 text-[11px] font-black uppercase text-game-foreground tracking-wider">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-green" />
            </span>
            {t.eventsPage.statusOngoing}
          </span>
        );
      case "upcoming":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-brand-violet/50 bg-brand-violet/20 px-2 py-0.5 text-[11px] font-black uppercase text-game-foreground tracking-wider">
            <Clock className="size-3 text-info" />
            {t.eventsPage.statusUpcoming}
          </span>
        );
      case "ended":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-game-border bg-game-surface/80 px-2 py-0.5 text-[11px] font-black uppercase text-game-muted tracking-wider">
            {t.eventsPage.statusEnded}
          </span>
        );
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-game-deep text-game-foreground">
      {/* ATMOSPHERIC BACKGROUND WITH FLOATING ISLAND HARBOR */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/images/event/bg.png"
          alt="Avatar Star Events Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-game-deep/50 via-game-deep/85 to-game-deep" />
      </div>

      {/* TOP FLOATING ARCADE CAPSULE NAVBAR */}
      <AvatarStarNavbar activeNav="events" />

      {/* MAIN CONTAINER */}
      <div className="relative z-20 mx-auto max-w-[1440px] px-4 pt-24 pb-20 sm:pt-32 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB NAVIGATION */}
        <div className="flex items-center gap-2 text-xs font-bold text-game-muted mb-4 sm:mb-6">
          <Link
            href="/#game"
            className="hover:text-highlight transition flex items-center gap-1"
          >
            <span>{t.eventsPage.homeBreadcrumb}</span>
          </Link>
          <ChevronRight className="size-3.5 opacity-60" />
          <span className="text-highlight font-black">
            {t.eventsPage.eventsBreadcrumb}
          </span>
        </div>

        {/* 3D EVENTS & NEWS HEADER GRAPHIC */}
        <header className="flex flex-col items-center text-center pb-8 sm:pb-12 as-motion-float-slow">
          {/* Ribbon Header Badge */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="as-section-ribbon">
              <Star className="size-4 fill-highlight text-highlight" />
              <div className="flex size-6 items-center justify-center rounded-full bg-info/30">
                <Flame className="size-3.5 text-white" />
              </div>
              <span>{t.eventsPage.badge}</span>
              <Star className="size-4 fill-highlight text-highlight" />
            </div>
          </div>

          {/* 3D Header Logo Art */}
          <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 my-1">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-brand-blue/30 via-info/35 to-highlight/25 blur-3xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />
            <Image
              src="/images/event/title.png"
              alt="Avatar Star Events"
              width={760}
              height={280}
              priority
              className="relative z-10 h-28 sm:h-36 md:h-44 lg:h-52 w-auto max-w-[95vw] object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Subtitle */}
          <p className="mt-3 max-w-2xl text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wide text-game-muted drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {t.eventsPage.subtitle}
          </p>
        </header>

        {/* ========================================================
            FEATURED HERO EVENT SHOWCASE (STARFRONT ARENA 2026)
            ======================================================== */}
        <section aria-label="Featured Event" className="mb-12 sm:mb-16" data-motion="scale-in">
          <div className="as-event-hero-card p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Event Artwork & Badges */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3">
                  <span className="badge badge-orange">
                    {featuredEvent.tag[lang]}
                  </span>
                  {getStatusBadge(featuredEvent.status)}
                </div>

                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase italic leading-[0.95] text-white tracking-wide drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]">
                  {featuredEvent.title[lang]}
                </h1>

                <p className="mt-2 text-sm sm:text-base font-bold text-highlight">
                  {featuredEvent.subtitle[lang]}
                </p>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-game-muted font-semibold max-w-lg">
                  {featuredEvent.shortDesc[lang]}
                </p>

                {/* Grand Prize Box */}
                <div className="mt-6 w-full rounded-2xl border border-highlight/40 bg-game-surface/60 p-4 backdrop-blur-md shadow-inner flex items-center gap-3.5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-highlight to-brand-gold text-game-deep shadow-md font-black">
                    <Trophy className="size-6 text-game-deep stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-black uppercase text-highlight tracking-widest">
                      {t.eventsPage.grandPrize}
                    </div>
                    <div className="font-display text-lg sm:text-xl font-black text-white">
                      {t.eventsPage.grandPrizeVal}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Countdown & Action Hub */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-end">
                {/* Visual Banner Preview */}
                <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-game-border/80 shadow-2xl group">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={featuredEvent.image}
                      alt={featuredEvent.title[lang]}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-game-deep via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-brand-blue/15 mix-blend-color-dodge pointer-events-none" />

                    {/* Duration chip on banner */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white bg-game-deep/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="size-4 text-highlight" />
                        <span>{featuredEvent.dateRange[lang]}</span>
                      </div>
                      <span className="text-info font-black">SEASON 03</span>
                    </div>
                  </div>
                </div>

                {/* Live Countdown Display */}
                <div className="mt-6 flex flex-col items-center lg:items-end w-full max-w-lg">
                  <span className="text-xs font-black uppercase tracking-widest text-game-muted mb-2 flex items-center gap-1.5">
                    <Radio className="size-3.5 text-danger animate-pulse" />
                    TIME REMAINING
                  </span>

                  <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full">
                    <div className="as-countdown-unit">
                      <span className="font-display text-2xl sm:text-3xl font-black text-white">
                        {String(countdown.days).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-black uppercase text-game-muted tracking-wider">
                        {t.eventsPage.countdownDays}
                      </span>
                    </div>
                    <div className="as-countdown-unit">
                      <span className="font-display text-2xl sm:text-3xl font-black text-white">
                        {String(countdown.hours).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-black uppercase text-game-muted tracking-wider">
                        {t.eventsPage.countdownHours}
                      </span>
                    </div>
                    <div className="as-countdown-unit">
                      <span className="font-display text-2xl sm:text-3xl font-black text-white">
                        {String(countdown.minutes).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-black uppercase text-game-muted tracking-wider">
                        {t.eventsPage.countdownMins}
                      </span>
                    </div>
                    <div className="as-countdown-unit border-highlight/40">
                      <span className="font-display text-2xl sm:text-3xl font-black text-highlight animate-pulse">
                        {String(countdown.seconds).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-black uppercase text-highlight tracking-wider">
                        {t.eventsPage.countdownSecs}
                      </span>
                    </div>
                  </div>

                  {/* Hero Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => setActiveModalEvent(featuredEvent)}
                      className="as-dl-btn as-btn-shimmer px-6 py-3 text-sm sm:text-base shadow-[0_8px_24px_rgba(245,158,11,0.5)]"
                    >
                      <Trophy className="size-4.5 stroke-[2.5]" />
                      <span>{t.eventsPage.featuredCta}</span>
                    </button>

                    <Link
                      href="/download"
                      className="as-btn-cyan px-6 py-3 text-sm sm:text-base"
                    >
                      <Download className="size-4.5 stroke-[2.5]" />
                      <span>{t.eventsPage.downloadToPlay}</span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            FILTER CONTROLS & SEARCH BAR
            ======================================================== */}
        <section aria-label="Events Filter" className="mb-8" data-motion="fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-game-border/60 pb-6">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`as-filter-pill ${selectedCategory === "all" ? "active" : ""}`}
              >
                <Flame className="size-3.5" />
                <span>{t.eventsPage.filterAll}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("ingame")}
                className={`as-filter-pill ${selectedCategory === "ingame" ? "active" : ""}`}
              >
                <Gamepad2 className="size-3.5" />
                <span>{t.eventsPage.filterIngame}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("tournament")}
                className={`as-filter-pill ${selectedCategory === "tournament" ? "active" : ""}`}
              >
                <Trophy className="size-3.5" />
                <span>{t.eventsPage.filterTournament}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("free")}
                className={`as-filter-pill ${selectedCategory === "free" ? "active" : ""}`}
              >
                <Gift className="size-3.5" />
                <span>{t.eventsPage.filterFree}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("community")}
                className={`as-filter-pill ${selectedCategory === "community" ? "active" : ""}`}
              >
                <Users className="size-3.5" />
                <span>{t.eventsPage.filterCommunity}</span>
              </button>
            </div>

            {/* Status & Search Inputs */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Select */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as "all" | EventStatus)}
                  className="rounded-full border border-game-border bg-game-surface/90 px-4 py-2 text-xs font-bold text-game-foreground transition focus:border-info focus:outline-none appearance-none pr-8 cursor-pointer"
                  aria-label="Filter by Event Status"
                >
                  <option value="all" className="bg-game-deep text-white">{t.eventsPage.statusAll}</option>
                  <option value="ongoing" className="bg-game-deep text-white">{t.eventsPage.statusOngoing}</option>
                  <option value="upcoming" className="bg-game-deep text-white">{t.eventsPage.statusUpcoming}</option>
                  <option value="ended" className="bg-game-deep text-white">{t.eventsPage.statusEnded}</option>
                </select>
                <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3.5 rotate-90 text-game-muted" />
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[200px] sm:min-w-[240px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-game-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.eventsPage.searchPlaceholder}
                  className="w-full rounded-full border border-game-border bg-game-surface/70 pl-10 pr-4 py-2 text-xs font-bold text-white placeholder:text-game-muted focus:border-info focus:bg-game-surface focus:outline-none transition shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-game-muted hover:text-white"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            EVENTS GRID
            ======================================================== */}
        <section aria-label="Events List" className="mb-16">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-game-border bg-game-raised/40 p-12 text-center">
              <Sparkles className="size-12 text-game-muted mb-3 opacity-60" />
              <p className="text-base font-extrabold text-white">
                {t.eventsPage.noEventsFound}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                  setSearchQuery("");
                }}
                className="mt-4 as-btn-secondary text-xs px-4 py-2"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-motion="stagger">
              {filteredEvents.map((event) => {
                return (
                  <article
                    key={event.id}
                    className="as-event-card-item group"
                  >
                    {/* Event Banner Image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-game-deep">
                      <Image
                        src={event.image}
                        alt={event.title[lang]}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-game-deep via-transparent to-transparent opacity-90" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="badge badge-orange shadow-md">
                          {event.tag[lang]}
                        </span>
                        {getStatusBadge(event.status)}
                      </div>

                      {/* Date Range Chip */}
                      <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[11px] font-black text-game-foreground bg-game-deep/80 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                        <CalendarDays className="size-3 text-info" />
                        <span>{event.dateRange[lang]}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-wide group-hover:text-highlight transition">
                        {event.title[lang]}
                      </h3>

                      <p className="mt-2 text-xs text-game-muted font-bold line-clamp-2 leading-relaxed">
                        {event.shortDesc[lang]}
                      </p>

                      {/* Reward Preview Chips */}
                      <div className="mt-4 pt-4 border-t border-game-border/60">
                        <div className="text-[10px] font-black uppercase tracking-wider text-game-muted mb-2 flex items-center gap-1">
                          <Gift className="size-3 text-highlight" />
                          <span>{t.eventsPage.rewardsLabel}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {event.rewards.slice(0, 2).map((rew, idx) => (
                            <span
                              key={idx}
                              className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md truncate max-w-full ${getRarityBadgeClass(
                                rew.rarity
                              )}`}
                            >
                              ★ {rew.name[lang]}
                            </span>
                          ))}
                          {event.rewards.length > 2 && (
                            <span className="text-[10px] font-black text-info px-1.5 py-0.5 self-center">
                              +{event.rewards.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-6 pt-3 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveModalEvent(event)}
                          className="as-btn-cyan text-xs py-2 px-4 flex-1 justify-center"
                        >
                          <span>{t.eventsPage.viewDetails}</span>
                          <ChevronRight className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShare(event)}
                          title={t.eventsPage.shareEvent}
                          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-game-border bg-white/[0.06] text-white hover:bg-white/20 transition hover:border-info"
                        >
                          {copiedId === event.id ? (
                            <Check className="size-4 text-brand-green" />
                          ) : (
                            <Share2 className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ========================================================
            WEEKLY BATTLE SCHEDULE & TIMETABLE
            ======================================================== */}
        <section aria-label="Weekly Battle Schedule" className="mb-16" data-motion="fade-up">
          <div className="rounded-3xl border-2 border-game-border/80 bg-gradient-to-b from-game-raised to-game-deep p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="flex items-center gap-2 text-highlight font-black text-xs uppercase tracking-widest mb-1">
                <Zap className="size-4" />
                <span>SERVER TIMETABLE</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white drop-shadow">
                {t.eventsPage.scheduleTitle}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-game-muted font-bold max-w-xl">
                {t.eventsPage.scheduleSubtitle}
              </p>
            </div>

            {/* Schedule Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.eventsPage.scheduleItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-game-border/70 bg-game-surface/40 p-4 sm:p-5 backdrop-blur-md transition hover:border-info hover:bg-game-surface/60"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-lg bg-info/20 px-2.5 py-1 text-xs font-black text-info border border-info/40">
                      {item.day}
                    </span>
                    <Star className="size-3.5 fill-highlight text-highlight" />
                  </div>
                  <h4 className="font-display text-lg font-black text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs font-semibold text-game-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            FAIR PLAY & EVENT NOTICES
            ======================================================== */}
        <section aria-label="Event Guidelines" className="mb-12" data-motion="fade-up">
          <div className="rounded-2xl border border-game-border/60 bg-white/[0.03] p-5 sm:p-7 backdrop-blur-md">
            <div className="flex items-center gap-2.5 mb-3 text-highlight">
              <ShieldCheck className="size-5" />
              <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white">
                {t.eventsPage.noticeTitle}
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-game-muted font-bold list-disc pl-5">
              <li>{t.eventsPage.notice1}</li>
              <li>{t.eventsPage.notice2}</li>
              <li>{t.eventsPage.notice3}</li>
            </ul>
          </div>
        </section>

      </div>

      {/* ========================================================
          EVENT DETAIL MODAL DIALOG
          ======================================================== */}
      {activeModalEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="as-modal-backdrop animate-in fade-in duration-200"
          onClick={() => setActiveModalEvent(null)}
        >
          <div
            className="as-modal-card animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-game-surface border border-white/20 text-white hover:text-highlight hover:bg-game-raised transition"
              aria-label={t.eventsPage.closeModal}
            >
              <X className="size-5" />
            </button>

            {/* Modal Header Artwork */}
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-6 border border-white/20">
              <Image
                src={activeModalEvent.image}
                alt={activeModalEvent.title[lang]}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-game-deep via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
                <span className="badge badge-orange">
                  {activeModalEvent.tag[lang]}
                </span>
                {getStatusBadge(activeModalEvent.status)}
              </div>
            </div>

            {/* Modal Title & Desc */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white drop-shadow">
              {activeModalEvent.title[lang]}
            </h2>
            <p className="mt-1 text-sm font-bold text-highlight">
              {activeModalEvent.subtitle[lang]}
            </p>

            <div className="flex items-center gap-2 text-xs font-extrabold text-game-muted mt-2">
              <CalendarDays className="size-4 text-info" />
              <span>{t.eventsPage.eventDuration}:</span>
              <span className="text-white">{activeModalEvent.dateRange[lang]}</span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-game-muted font-medium leading-relaxed">
              {activeModalEvent.fullDesc[lang]}
            </p>

            {/* Modal Rewards Section */}
            <div className="mt-6 pt-6 border-t border-game-border/60">
              <h4 className="font-display text-lg font-black uppercase text-highlight flex items-center gap-2 mb-3">
                <Gift className="size-4.5" />
                <span>{t.eventsPage.rewardsLabel}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModalEvent.rewards.map((rew, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-xl border border-game-border bg-game-surface/50 p-3.5"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${getRarityBadgeClass(
                            rew.rarity
                          )}`}
                        >
                          {rew.badgeText[lang]}
                        </span>
                        <Star className="size-3 fill-highlight text-highlight" />
                      </div>
                      <h5 className="font-display text-base font-black text-white">
                        {rew.name[lang]}
                      </h5>
                    </div>
                    <p className="mt-2 text-[11px] font-medium text-game-muted">
                      {rew.detail[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Missions / Steps */}
            {activeModalEvent.missions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-game-border/60">
                <h4 className="font-display text-lg font-black uppercase text-info flex items-center gap-2 mb-3">
                  <Swords className="size-4.5" />
                  <span>{t.eventsPage.missionsLabel}</span>
                </h4>
                <div className="space-y-2.5">
                  {activeModalEvent.missions.map((mission) => (
                    <div
                      key={mission.step}
                      className="flex items-start gap-3 rounded-xl border border-game-border/60 bg-white/[0.04] p-3 text-xs"
                    >
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-info font-black text-game-deep text-xs shadow-sm">
                        {mission.step}
                      </div>
                      <div>
                        <div className="font-extrabold text-white">
                          {mission.title[lang]}
                        </div>
                        <div className="text-game-muted font-medium mt-0.5">
                          {mission.desc[lang]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Rules */}
            {activeModalEvent.rules.length > 0 && (
              <div className="mt-6 pt-6 border-t border-game-border/60">
                <h4 className="font-display text-sm font-black uppercase text-game-muted flex items-center gap-2 mb-2">
                  <ShieldCheck className="size-4 text-brand-green" />
                  <span>RULES & CONDITIONS</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-game-muted list-disc pl-5">
                  {activeModalEvent.rules.map((rule, idx) => (
                    <li key={idx}>{rule[lang]}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Action Footer */}
            <div className="mt-8 pt-4 border-t border-game-border flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => handleShare(activeModalEvent)}
                className="as-btn-secondary text-xs px-4 py-2.5"
              >
                <Share2 className="size-4" />
                <span>{copiedId === activeModalEvent.id ? t.eventsPage.copiedNotice : t.eventsPage.shareEvent}</span>
              </button>

              <Link
                href="/download"
                className="as-dl-btn text-xs px-6 py-2.5 shadow-md"
              >
                <Gamepad2 className="size-4 stroke-[2.5]" />
                <span>{t.eventsPage.participateNow}</span>
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <AvatarStarFooter />
    </main>
  );
}
