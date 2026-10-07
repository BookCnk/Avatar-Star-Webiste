"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Cpu,
  HardDrive,
  Monitor,
  Layers,
  Settings,
  BookOpen,
  Wrench,
  FileText,
  Headphones,
  ChevronRight,
  Star,
  Crown,
  FolderOpen,
  Gamepad2,
  Globe2,
  MessageCircle,
  Video,
  Users,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { AvatarStarNavbar } from "@/components/avatar-star-navbar";
import { AvatarStarFooter } from "@/components/avatar-star-footer";

export default function DownloadPage() {
  const { lang, setLang, t } = useLanguage();

  const minSpecs = [
    { label: t.downloadPage.specCpu, value: t.downloadPage.minCpuVal, icon: Cpu },
    { label: t.downloadPage.specRam, value: t.downloadPage.minRamVal, icon: Layers },
    { label: t.downloadPage.specGpu, value: t.downloadPage.minGpuVal, icon: Monitor },
    { label: t.downloadPage.specStorage, value: t.downloadPage.minStorageVal, icon: HardDrive },
  ];

  const recSpecs = [
    { label: t.downloadPage.specCpu, value: t.downloadPage.recCpuVal, icon: Cpu },
    { label: t.downloadPage.specRam, value: t.downloadPage.recRamVal, icon: Layers },
    { label: t.downloadPage.specGpu, value: t.downloadPage.recGpuVal, icon: Monitor },
    { label: t.downloadPage.specStorage, value: t.downloadPage.recStorageVal, icon: HardDrive },
  ];

  const installSteps = [
    {
      step: "1",
      title: t.downloadPage.step1Title,
      desc: t.downloadPage.step1Desc,
      icon: Download,
    },
    {
      step: "2",
      title: t.downloadPage.step2Title,
      desc: t.downloadPage.step2Desc,
      icon: FolderOpen,
    },
    {
      step: "3",
      title: t.downloadPage.step3Title,
      desc: t.downloadPage.step3Desc,
      icon: Gamepad2,
    },
  ];

  const navigationItems = [
    { key: "home", label: t.nav.home, href: "/#game" },
    { key: "game", label: t.nav.game, href: "/#game" },
    { key: "characters", label: t.nav.characters, href: "/#characters" },
    { key: "events", label: t.nav.events, href: "/#events" },
    { key: "news", label: t.nav.news, href: "/#news" },
    { key: "community", label: t.nav.community, href: "/#community" },
    { key: "download", label: t.nav.downloadNav, href: "/download" },
    { key: "support", label: t.nav.support, href: "/#support" },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-game-deep text-game-foreground">
      {/* ATMOSPHERIC BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/images/backgrounds/hero.png"
          alt="Avatar Star Floating Islands"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/30 via-game-deep/80 to-game-deep" />
      </div>

      {/* TOP FLOATING ARCADE CAPSULE NAVBAR */}
      <AvatarStarNavbar />

      {/* MAIN CENTERED DOWNLOAD CONTENT */}
      <div className="relative z-20 mx-auto max-w-4xl px-4 pt-24 pb-20 sm:pt-32 sm:px-6">
        {/* CENTERED HERO ARTWORK & DOWNLOAD ACTION */}
        <section
          id="download"
          aria-label="Avatar Star Download Showcase"
          className="flex flex-col items-center text-center"
          data-motion="fade-up"
        >
          {/* Main Featured Artwork: dowload-avatar.png */}
          <div className="relative group my-2 as-motion-float">
            {/* Glowing Aura Behind Image */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-sky-500/30 via-cyan-400/40 to-amber-400/30 blur-2xl opacity-75 group-hover:opacity-100 transition duration-500" />
            <Image
              src="/images/download/dowload-avatar.png"
              alt="Avatar Star Download Official Art"
              width={520}
              height={520}
              priority
              className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* Subtitle / Tagline */}
          <p className="mt-2 text-sm sm:text-base font-extrabold uppercase tracking-widest text-sky-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {t.downloadPage.subtitle}
          </p>

          {/* Primary 3D Download Button & File Info */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <a
              href="#download"
              className="as-dl-btn as-btn-shimmer px-10 py-4 text-lg sm:px-14 sm:py-4.5 sm:text-xl shadow-[0_12px_36px_rgba(245,158,11,0.6)]"
            >
              <Download className="size-7 stroke-[3]" />
              <span>{t.downloadPage.btnDownload}</span>
            </a>
            <span className="text-xs font-bold text-sky-300/80 tracking-wide mt-1">
              Windows PC • {t.downloadPage.btnDownloadSub}
            </span>
          </div>
        </section>

        {/* SYSTEM REQUIREMENTS SECTION */}
        <section aria-label="System Requirements" className="mt-12 sm:mt-16" data-motion="fade-up">
          {/* Section Ribbon Header */}
          <div className="flex justify-center">
            <div className="as-section-ribbon">
              <Star className="size-4 fill-highlight text-highlight" />
              <div className="flex size-6 items-center justify-center rounded-full bg-sky-400/30">
                <Settings className="size-3.5 text-white" />
              </div>
              <span>{t.downloadPage.systemReqTitle}</span>
              <Star className="size-4 fill-highlight text-highlight" />
            </div>
          </div>

          {/* 2 Side-by-Side Spec Cards */}
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2" data-motion="stagger">
            {/* Minimum Specs - 3D Cyber Cyan Card */}
            <div className="as-spec-card-min p-5 sm:p-6 text-white">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7.5 items-center justify-center rounded-lg bg-sky-500 text-white shadow-[0_2px_8px_rgba(56,189,248,0.5)] border border-white/40">
                  <Star className="size-4.5 fill-white text-white" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {t.downloadPage.minSpecTitle}
                </h3>
              </div>

              <div className="mt-5 space-y-2.5">
                {minSpecs.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={spec.label}
                      className="flex items-center gap-3 rounded-xl border border-sky-400/25 bg-white/[0.06] p-2.5 sm:p-3 text-xs sm:text-sm font-semibold transition hover:border-sky-400/50 hover:bg-white/10"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-sm border border-sky-300/40">
                        <Icon className="size-4.5" />
                      </div>
                      <span className="w-18 sm:w-22 shrink-0 font-extrabold text-sky-200">
                        {spec.label}
                      </span>
                      <span className="text-white font-bold drop-shadow-sm">: {spec.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Specs - 3D Legendary Gold Card */}
            <div className="as-spec-card-rec p-5 sm:p-6 text-white">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7.5 items-center justify-center rounded-lg bg-gradient-to-b from-amber-400 to-amber-600 text-white shadow-[0_2px_8px_rgba(245,158,11,0.5)] border border-white/40">
                  <Crown className="size-4.5 fill-white text-white" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black tracking-wide text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {t.downloadPage.recSpecTitle}
                </h3>
              </div>

              <div className="mt-5 space-y-2.5">
                {recSpecs.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={spec.label}
                      className="flex items-center gap-3 rounded-xl border border-amber-400/30 bg-white/[0.06] p-2.5 sm:p-3 text-xs sm:text-sm font-semibold transition hover:border-amber-400/60 hover:bg-white/10"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-amber-400 to-amber-600 text-white shadow-sm border border-amber-300/40">
                        <Icon className="size-4.5" />
                      </div>
                      <span className="w-18 sm:w-22 shrink-0 font-extrabold text-amber-200">
                        {spec.label}
                      </span>
                      <span className="text-white font-bold drop-shadow-sm">: {spec.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO INSTALL SECTION */}
        <section aria-label="How to Install" className="mt-12 sm:mt-16">
          {/* Section Ribbon Header */}
          <div className="flex justify-center">
            <div className="as-section-ribbon">
              <Star className="size-4 fill-highlight text-highlight" />
              <div className="flex size-6 items-center justify-center rounded-full bg-sky-400/30">
                <BookOpen className="size-3.5 text-white" />
              </div>
              <span>{t.downloadPage.installGuideTitle}</span>
              <Star className="size-4 fill-highlight text-highlight" />
            </div>
          </div>

          {/* 3 Step Cards Flow - 3D Arcade Quest Stages */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {installSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="as-step-card relative flex flex-col justify-between p-5 text-white"
                >
                  <div className="flex items-start gap-3.5">
                    {/* 3D Gold Step Number Coin */}
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#ffd000] to-[#f59e0b] border-1.5 border-white font-display text-base font-black text-[#3b1d00] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_3px_0_#b45309,0_4px_10px_rgba(245,158,11,0.5)]">
                      {step.step}
                    </div>

                    {/* 3D Neon Icon Box */}
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-sky-400/30 to-blue-600/40 text-cyan-300 border border-sky-300/40 shadow-inner">
                      <Icon className="size-6 stroke-[2.5]" />
                    </div>

                    {/* Texts */}
                    <div>
                      <h4 className="font-display text-lg font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-xl">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-xs font-semibold leading-relaxed text-sky-200/90">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Flow 3D Chevron Arrow on desktop */}
                  {idx < 2 && (
                    <div className="pointer-events-none absolute -right-3.5 top-1/2 hidden -translate-y-1/2 z-20 md:block">
                      <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-b from-sky-400 to-blue-600 border border-white text-white shadow-[0_3px_0_#0369a1,0_4px_12px_rgba(2,132,199,0.7)]">
                        <ChevronRight className="size-4.5 stroke-[3]" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* HELPER QUICK-ACTION PILLS */}
        <section aria-label="Support and Information" className="mt-10 sm:mt-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Troubleshooting Pill */}
            <Link
              href="/#support"
              className="as-help-pill-purple group flex items-center justify-between p-4 text-white"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/30 border border-purple-400/30 text-purple-200">
                  <Wrench className="size-5" />
                </div>
                <div>
                  <h5 className="text-sm font-black tracking-wide text-white group-hover:text-purple-200">
                    {t.downloadPage.helpFaqTitle}
                  </h5>
                  <p className="text-[11px] font-medium text-purple-200/80">
                    {t.downloadPage.helpFaqDesc}
                  </p>
                </div>
              </div>
              <ChevronRight className="size-5 shrink-0 text-purple-300 transition group-hover:translate-x-1" />
            </Link>

            {/* Patch Notes Pill */}
            <Link
              href="/#news"
              className="as-help-blue-pill group flex items-center justify-between p-4 text-white"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/30 border border-sky-400/30 text-sky-200">
                  <FileText className="size-5" />
                </div>
                <div>
                  <h5 className="text-sm font-black tracking-wide text-white group-hover:text-sky-200">
                    {t.downloadPage.helpPatchTitle}
                  </h5>
                  <p className="text-[11px] font-medium text-sky-200/80">
                    {t.downloadPage.helpPatchDesc}
                  </p>
                </div>
              </div>
              <ChevronRight className="size-5 shrink-0 text-sky-300 transition group-hover:translate-x-1" />
            </Link>

            {/* Support Pill */}
            <Link
              href="/#support"
              className="as-help-pill-green group flex items-center justify-between p-4 text-white"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/30 border border-emerald-400/30 text-emerald-200">
                  <Headphones className="size-5" />
                </div>
                <div>
                  <h5 className="text-sm font-black tracking-wide text-white group-hover:text-emerald-200">
                    {t.downloadPage.helpSupportTitle}
                  </h5>
                  <p className="text-[11px] font-medium text-emerald-200/80">
                    {t.downloadPage.helpSupportDesc}
                  </p>
                </div>
              </div>
              <ChevronRight className="size-5 shrink-0 text-emerald-300 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <AvatarStarFooter />
    </main>
  );
}
