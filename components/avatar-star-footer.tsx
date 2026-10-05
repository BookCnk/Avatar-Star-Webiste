"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe2,
  MessageCircle,
  Video,
  Users,
  Headphones,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function AvatarStarFooter() {
  const { lang, setLang, t } = useLanguage();

  const quickLinks = [
    { key: "home", label: t.nav.home, href: "/#game" },
    { key: "download", label: t.nav.downloadNav, href: "/download" },
    { key: "characters", label: t.nav.characters, href: "/#characters" },
    { key: "news", label: t.nav.news, href: "/#news" },
    { key: "events", label: t.nav.events, href: "/#events" },
    { key: "community", label: t.nav.community, href: "/#community" },
  ];

  return (
    <footer id="support" className="relative z-20 border-t-2 border-sky-500/40 bg-[#030919] text-game-foreground shadow-[0_-8px_30px_rgba(14,165,233,0.15)] overflow-hidden">
      {/* Background Top Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-32 w-3/4 bg-sky-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-8 sm:px-8 sm:pt-16 sm:pb-10">
        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-12">
          {/* Column 1: Brand Logo & Tagline (5 cols) */}
          <div className="flex flex-col items-start md:col-span-5">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/logo.png"
                alt="Avatar Star"
                width={190}
                height={56}
                priority
                className="h-auto w-40 object-contain drop-shadow-[0_4px_16px_rgba(0,184,255,0.4)] sm:w-48"
              />
            </Link>

            <p className="mt-4 max-w-sm text-xs font-medium leading-relaxed text-sky-200/80 sm:text-sm">
              {t.footer.tagline}
            </p>

            {/* Server Online Status Badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 shadow-[0_0_12px_rgba(16,185,129,0.2)] backdrop-blur-sm">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </span>
              <span className="text-xs font-bold tracking-wide text-emerald-300">
                {t.footer.serverStatus}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-wider text-white sm:text-base">
              <Sparkles className="size-4 text-highlight" />
              <span>{t.footer.quickLinks}</span>
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-semibold sm:text-sm">
              {quickLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-1.5 text-sky-200/80 transition hover:translate-x-1 hover:text-white"
                >
                  <ChevronRight className="size-3 text-sky-400" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Community & Language (3 cols) */}
          <div className="flex flex-col items-start md:col-span-3 md:items-end">
            <h4 className="font-display text-sm font-black uppercase tracking-wider text-white sm:text-base">
              {t.footer.communityTitle}
            </h4>

            {/* Social 3D Buttons */}
            <div className="mt-4 flex items-center gap-2.5">
              <a
                href="#discord"
                aria-label="Discord Community"
                className="as-footer-icon-btn"
                title="Discord"
              >
                <MessageCircle className="size-5" />
              </a>
              <a
                href="#video"
                aria-label="YouTube / Live Stream"
                className="as-footer-icon-btn"
                title="YouTube"
              >
                <Video className="size-5" />
              </a>
              <a
                href="#community"
                aria-label="Facebook Community"
                className="as-footer-icon-btn"
                title="Community"
              >
                <Users className="size-5" />
              </a>
              <a
                href="#support"
                aria-label="Customer Support"
                className="as-footer-icon-btn"
                title="Support"
              >
                <Headphones className="size-5" />
              </a>
            </div>

            {/* Language Switcher Pill Button */}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "th" : "en")}
                className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-gradient-to-b from-sky-900/60 to-blue-950/80 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:border-sky-300 hover:from-sky-800/80 hover:to-blue-900"
              >
                <Globe2 className="size-4 text-[#38bdf8]" />
                <span>{lang === "en" ? "🇺🇸 English (EN)" : "🇹🇭 ภาษาไทย (TH)"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-sky-900/50 pt-6 text-[11px] font-medium text-sky-200/60 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <p>© 2026 {t.footer.title}. {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <Link href="#terms" className="transition hover:text-white">
              {t.footer.terms}
            </Link>
            <span>•</span>
            <Link href="#privacy" className="transition hover:text-white">
              {t.footer.privacy}
            </Link>
            <span>•</span>
            <Link href="#support" className="transition hover:text-white">
              {t.footer.support}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
