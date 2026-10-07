"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Gamepad2,
  Download,
  Flame,
  Swords,
  Layers,
  Home,
  Users,
  Newspaper,
  MessageSquare,
  Headphones,
} from "lucide-react";
import { siteContent } from "@/lib/translations";

interface AvatarStarNavbarProps {
  activeNav?: string;
  onNavClick?: (key: string) => void;
}

export function AvatarStarNavbar({
  activeNav: controlledActiveNav,
  onNavClick,
}: AvatarStarNavbarProps) {
  const t = siteContent;
  const [internalActiveNav, setInternalActiveNav] = useState("home");
  const activeNav = controlledActiveNav ?? internalActiveNav;

  const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const gameRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (key: string) => {
    setInternalActiveNav(key);
    onNavClick?.(key);
    setIsMobileMenuOpen(false);
    setIsGameMenuOpen(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (gameRef.current && !gameRef.current.contains(target)) {
        setIsGameMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousMobileMenuOpen = document.documentElement.dataset.mobileMenuOpen;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.mobileMenuOpen = "true";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      if (previousMobileMenuOpen === undefined) {
        delete document.documentElement.dataset.mobileMenuOpen;
      } else {
        document.documentElement.dataset.mobileMenuOpen = previousMobileMenuOpen;
      }
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { key: "home", label: t.nav.home, href: "/#game", icon: Home },
    { key: "game", label: t.nav.game, href: "/#game", hasDropdown: true, icon: Gamepad2 },
    { key: "characters", label: t.nav.characters, href: "/#characters", icon: Users },
    { key: "events", label: t.nav.events, href: "/events", icon: Flame },
    { key: "news", label: t.nav.news, href: "/#news", icon: Newspaper },
    { key: "community", label: t.nav.community, href: "/#community", icon: MessageSquare },
    { key: "download", label: t.nav.downloadNav, href: "/download", isDownloadPill: true, icon: Download },
  ];

  return (
    <>
      <header className="fixed top-2 sm:top-3.5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1480px] px-2 sm:px-4 lg:px-6 pointer-events-none">
        <div className="as-navbar-capsule pointer-events-auto min-h-[48px] sm:min-h-[64px] px-2 sm:px-3">
          {/* 1. Official Avatar Star Logo on the left pill end */}
          <Link
            href="/#game"
            onClick={() => handleNavClick("home")}
            className="flex items-center pl-0.5 sm:pl-2 shrink-0 transition-transform hover:scale-105 active:scale-95"
            aria-label="Avatar Star Home"
          >
            <Image
              src="/images/brand/logo.png"
              alt="Avatar Star Logo"
              width={140}
              height={42}
              priority
              className="h-7 sm:h-9 md:h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
            />
          </Link>

          {/* 2. Desktop Navigation Center Menu */}
          <nav
            aria-label="Primary Game Navigation"
            className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 2xl:gap-2.5"
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.key;
              const Icon = item.icon;

              // Download button styled as glowing golden pill
              if (item.isDownloadPill) {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => handleNavClick(item.key)}
                    className="as-nav-download-badge group relative mx-1 flex items-center gap-1.5"
                  >
                    <Download className="size-3.5 stroke-[2.5]" />
                    <span>{item.label}</span>
                    {/* Sparkle Glint */}
                    <span className="absolute -bottom-1 -right-1 text-white text-[11px] drop-shadow-[0_0_4px_rgba(255,255,255,0.95)] animate-sparkle-glint pointer-events-none">
                      ✦
                    </span>
                  </Link>
                );
              }

              // "Game" with Dropdown
              if (item.hasDropdown) {
                return (
                  <div key={item.key} className="relative" ref={gameRef}>
                    <button
                      type="button"
                      onClick={() => setIsGameMenuOpen(!isGameMenuOpen)}
                      className={`as-nav-item flex items-center gap-1.5 ${isActive ? "active" : ""}`}
                    >
                      <Icon className="size-3.5 stroke-[2.2] text-[#70dbff]/85 transition-transform group-hover:text-white" />
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`size-3.5 stroke-[2.5] transition-transform duration-200 ${
                          isGameMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Game Submenu Dropdown */}
                    {isGameMenuOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2.5 w-52 rounded-2xl border border-white/20 bg-[#002787]/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                        <Link
                          href="#game"
                          onClick={() => handleNavClick("game")}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-white hover:bg-white/15 transition"
                        >
                          <Gamepad2 className="size-4 text-[#ffd51c]" />
                          <span>{t.nav.gameOverview}</span>
                        </Link>
                        <Link
                          href="/#characters"
                          onClick={() => handleNavClick("characters")}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-white hover:bg-white/15 transition"
                        >
                          <Swords className="size-4 text-[#00f0ff]" />
                          <span>{t.nav.gameModes}</span>
                        </Link>
                        <Link
                          href="/#characters"
                          onClick={() => handleNavClick("characters")}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-white hover:bg-white/15 transition"
                        >
                          <Layers className="size-4 text-[#a855f7]" />
                          <span>{t.nav.gameClasses}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              // Standard Nav Link
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => handleNavClick(item.key)}
                  className={`as-nav-item flex items-center gap-1.5 ${isActive ? "active" : ""}`}
                >
                  <Icon className="size-3.5 stroke-[2.2] text-[#70dbff]/85 transition-transform group-hover:text-white" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Right Controls: Register and Hamburger Button */}
          <div className="flex items-center gap-1 sm:gap-2 pr-0.5 sm:pr-1 shrink-0">
            {/* "สมัคร >" Golden Glossy Pill CTA Button */}
            <Link
              href="/register"
              onClick={() => handleNavClick("register")}
              className="as-nav-play-button text-xs sm:text-base px-2.5 py-1 sm:px-5 sm:py-2"
            >
              <span>{t.nav.register}</span>
              <ChevronRight className="size-3.5 sm:size-4.5 stroke-[3] -mr-0.5" />
            </Link>

            {/* Mobile Hamburger Menu Toggle Button (ปุ่มเปิด-ปิด ชัดเจน ไม่หลุดจอ) */}
            <div className="flex lg:hidden shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex size-7.5 sm:size-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all active:scale-95 shadow-[0_0_10px_rgba(255,255,255,0.25)] ml-1"
                aria-label={isMobileMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
              >
                {isMobileMenuOpen ? (
                  <X className="size-4.5 sm:size-5 stroke-[2.8]" />
                ) : (
                  <Menu className="size-4.5 sm:size-5 stroke-[2.8]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Panel */}
        <>
            {/* Dark Backdrop Overlay */}
            <div
              className="mobile-menu-backdrop"
              data-state={isMobileMenuOpen ? "open" : "closed"}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden={!isMobileMenuOpen}
            />

            {/* Floating Menu Popover Card */}
            <div
              className="mobile-menu-panel"
              data-state={isMobileMenuOpen ? "open" : "closed"}
              role="dialog"
              aria-label="Mobile navigation"
              aria-hidden={!isMobileMenuOpen}
            >
              <div className="mobile-menu-heading">
                <Image
                  src="/images/brand/logo.png"
                  alt="Avatar Star"
                  width={120}
                  height={36}
                  className="mobile-menu-logo"
                />
                <button
                  type="button"
                  className="mobile-menu-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close mobile navigation"
                >
                  <X className="size-6" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeNav === item.key;
                  const Icon = item.icon;
                  if (item.isDownloadPill) {
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => handleNavClick(item.key)}
                        className="as-nav-download-badge mobile-menu-download mt-2.5 py-3 text-center text-sm w-full flex items-center justify-center gap-2"
                      >
                        <Download className="size-4 stroke-[2.5]" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => handleNavClick(item.key)}
                      className={`mobile-menu-item rounded-xl px-4 py-2.5 text-sm font-bold flex items-center justify-between ${
                        isActive ? "mobile-menu-item-active" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4 text-[#70dbff]" />
                        <span>{item.label}</span>
                      </div>
                      {item.hasDropdown && <ChevronRight className="size-4 opacity-70" />}
                    </Link>
                  );
                })}

              </div>
            </div>
          </>
      </header>
    </>
  );
}
