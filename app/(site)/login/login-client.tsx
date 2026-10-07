"use client";

import React, { useState, useMemo, useActionState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ChevronLeft,
  KeyRound,
  Check,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { login } from "./actions";

export function LoginClient() {
  const { lang, setLang, t } = useLanguage();
  const [state, formAction, isPending] = useActionState(login, { error: "" });

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Email format check
  const isEmailFormatValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }, [email]);

  // Demo credentials autofill
  const handleAutofillDemo = () => {
    setEmail("user@example.com");
    setPassword("demo-password");
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-game-deep text-game-foreground flex flex-col justify-between selection:bg-info selection:text-game-deep">
      
      {/* EPIC BATTLE SCENE BACKGROUND (FULL ARTWORK) */}
      <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
        <Image
          src="/images/register/bg.png"
          alt="Avatar Star Battle Scene"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-[center_20%] md:object-center transition-transform duration-1000 ease-out"
        />
        {/* Soft radial overlay so the central cyber form is 100% legible on any device */}
        <div className="absolute inset-0 bg-gradient-to-b from-game-deep/50 via-game-deep/70 to-game-deep/90 sm:via-game-deep/50 sm:to-game-deep/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(3,11,29,0.72)_0%,_transparent_75%)]" />

        {/* Ambient Floating Dust / Light Beams */}
        <div className="absolute top-1/4 left-1/5 size-48 rounded-full bg-cyan-500/10 blur-3xl as-motion-float-slow pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/5 size-64 rounded-full bg-purple-600/10 blur-3xl as-motion-float pointer-events-none" />
      </div>

      {/* TOP HEADER: BRAND LOGO + LANGUAGE SWITCHER */}
      <header className="relative z-30 flex items-center justify-between w-full max-w-[1440px] mx-auto px-4 py-3 sm:px-8 sm:py-5 animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Clickable Brand Logo with Glow */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105 active:scale-95"
          aria-label={t.loginPage.backToHome}
        >
          <Image
            src="/images/brand/logo.png"
            alt="Avatar Star"
            width={140}
            height={44}
            priority
            className="h-8 sm:h-11 md:h-12 w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] filter transition-all group-hover:drop-shadow-[0_0_20px_rgba(16,174,242,0.8)]"
          />
        </Link>

        {/* Right Action: Language Switcher Pill + Back Link */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-game-deep/80 px-3.5 py-1.5 text-xs font-black text-sky-200 backdrop-blur-md transition-all duration-200 hover:bg-game-surface hover:text-white hover:border-info hover:scale-105 active:scale-95 shadow-md"
          >
            <ChevronLeft className="size-3.5" />
            <span>{t.loginPage.backToHome}</span>
          </Link>

          {/* Language Toggle Pill */}
          <div className="flex items-center rounded-full border border-sky-400/50 bg-game-deep/85 p-1 shadow-md backdrop-blur-md">
            <button
              type="button"
              onClick={() => setLang("th")}
              className={`rounded-full px-2.5 py-1 text-xs font-black transition-all duration-200 cursor-pointer ${
                lang === "th"
                  ? "bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-[0_0_10px_rgba(56,189,248,0.5)] scale-105"
                  : "text-game-muted hover:text-white"
              }`}
            >
              TH
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 text-xs font-black transition-all duration-200 cursor-pointer ${
                lang === "en"
                  ? "bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-[0_0_10px_rgba(56,189,248,0.5)] scale-105"
                  : "text-game-muted hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* CENTER LOGIN CONTAINER */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-4 py-4 sm:py-8">
        
        {/* CYBERNETIC LOGIN CARD */}
        <div className="as-regis-card as-regis-card-animate w-full max-w-[440px] sm:max-w-[480px] p-5 sm:p-7 md:p-8 overflow-hidden">
          
          {/* Cyber Laser Scanline Beam Effect */}
          <div className="as-scan-beam" />

          {/* Cyber Notch Cap on Top */}
          <div className="as-regis-card-notch" />
          
          {/* Side Sci-Fi Accents */}
          <div className="as-regis-notch-left" />
          <div className="as-regis-notch-right" />

          {/* 3D TITLE GRAPHIC (text.png) */}
          <div className="relative flex flex-col items-center justify-center -mt-2 mb-4 as-motion-float-slow">
            <h1 className="sr-only">{t.loginPage.title}</h1>
            <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
              {/* Radial Cyan Glow behind title */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/30 via-cyan-400/40 to-sky-400/30 blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none as-flare-pulse" />
              <Image
                src="/images/login/text.png"
                alt={t.loginPage.title}
                width={724}
                height={240}
                priority
                className="relative z-10 h-16 sm:h-20 md:h-22 w-auto max-w-[280px] sm:max-w-[340px] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.95)]"
              />
            </div>
          </div>

          {/* DEMO CREDENTIALS SHORTCUT CHIP */}
          <div className="mb-4 flex items-center justify-between rounded-xl border border-sky-400/30 bg-game-deep/80 px-3 py-2 text-xs backdrop-blur-sm as-field-entrance" style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center gap-2 text-sky-200 font-semibold truncate pr-2">
              <KeyRound className="size-4 text-highlight shrink-0" />
              <span className="truncate">{t.loginPage.demoNotice}</span>
            </div>
            <button
              type="button"
              onClick={handleAutofillDemo}
              className="shrink-0 rounded-lg bg-info/20 px-2.5 py-1 text-[11px] font-black text-info border border-info/40 hover:bg-info/30 hover:text-white transition cursor-pointer"
            >
              Fill Demo
            </button>
          </div>

          {/* LOGIN FORM */}
          <form action={formAction} className="space-y-3.5 sm:space-y-4">
            
            {/* 1. EMAIL / USERNAME FIELD */}
            <div className="as-field-entrance" style={{ animationDelay: "0.10s" }}>
              <div className="as-regis-input-wrapper group">
                <div className="pl-3 text-info transition-transform duration-200 group-focus-within:scale-115 group-focus-within:text-highlight">
                  <Mail className="size-4.5 stroke-[2.2]" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.loginPage.emailPlaceholder}
                  className="as-regis-input"
                  required
                />
                {/* Green Checkmark Circle when valid */}
                <div className="pr-3 flex items-center min-w-[32px] justify-end">
                  {isEmailFormatValid && (
                    <div className="as-pop-in flex size-5 items-center justify-center rounded-full bg-brand-green text-white shadow-[0_0_10px_rgba(34,197,94,0.7)]">
                      <Check className="size-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 2. PASSWORD FIELD */}
            <div className="as-field-entrance" style={{ animationDelay: "0.18s" }}>
              <div className="as-regis-input-wrapper group">
                <div className="pl-3 text-info transition-transform duration-200 group-focus-within:scale-115 group-focus-within:text-highlight">
                  <Lock className="size-4.5 stroke-[2.2]" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.loginPage.passwordPlaceholder}
                  className="as-regis-input"
                  required
                />
                {/* Eye Show/Hide Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-3 text-game-muted hover:text-white transition-transform duration-150 hover:scale-110 active:scale-95 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4.5 text-info animate-in zoom-in-75 duration-150" />
                  ) : (
                    <Eye className="size-4.5 animate-in zoom-in-75 duration-150" />
                  )}
                </button>
              </div>
            </div>

            {/* 3. OPTIONS: REMEMBER ME + FORGOT PASSWORD */}
            <div className="flex items-center justify-between text-xs font-semibold as-field-entrance" style={{ animationDelay: "0.24s" }}>
              <label className="flex items-center gap-2 cursor-pointer select-none group text-game-muted hover:text-white transition">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="as-regis-checkbox transition-transform duration-150 group-hover:scale-110"
                />
                <span>{t.loginPage.rememberMe}</span>
              </label>

              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password recovery: please contact support or check demo credentials.");
                }}
                className="text-info font-bold hover:text-white hover:underline transition"
              >
                {t.loginPage.forgotPassword}
              </a>
            </div>

            {/* SERVER ERROR ALERT */}
            {state?.error && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-xl border border-danger/40 bg-danger/15 p-3 text-xs font-bold text-danger animate-in fade-in duration-200"
              >
                <AlertCircle className="size-4.5 shrink-0" />
                <span>{state.error}</span>
              </div>
            )}

            {/* 3D SUBMIT BUTTON (login-button.png) */}
            <div className="pt-2 flex flex-col items-center as-field-entrance" style={{ animationDelay: "0.32s" }}>
              <button
                type="submit"
                disabled={isPending}
                className="group relative w-full cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-75 disabled:pointer-events-none"
              >
                {/* Glowing Radiant Flare behind 3D Button with pulse animation */}
                <div className="as-flare-pulse absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500/40 via-orange-500/50 to-yellow-400/40 blur-xl pointer-events-none" />

                <Image
                  src="/images/login/login-button.png"
                  alt={t.loginPage.btnSubmit}
                  width={724}
                  height={241}
                  priority
                  className="relative z-10 w-full h-auto object-contain drop-shadow-[0_8px_22px_rgba(245,158,11,0.65)] filter transition-all group-hover:brightness-105"
                />

                {/* Shimmer light bar sweeping periodically across button */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full">
                  <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transform -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
                </div>
              </button>
            </div>

            {/* ALTERNATIVE SOCIAL SIGN-IN DIVIDER */}
            <div className="pt-2 as-field-entrance" style={{ animationDelay: "0.40s" }}>
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-sky-400/25" />
                <span className="relative z-10 shrink-0 bg-game-deep px-3 text-[11px] font-black uppercase tracking-wider text-game-muted">
                  {t.loginPage.orSocial}
                </span>
                <div className="w-full border-t border-sky-400/25" />
              </div>

              {/* 3 SOCIAL BUTTONS (GOOGLE, FACEBOOK, LINE) */}
              <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-2.5">
                
                {/* Google Button */}
                <button
                  type="button"
                  onClick={() => alert("Google Sign-In integration ready")}
                  className="as-social-btn-google flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <svg className="size-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="font-extrabold">{t.loginPage.google}</span>
                </button>

                {/* Facebook Button */}
                <button
                  type="button"
                  onClick={() => alert("Facebook Sign-In integration ready")}
                  className="as-social-btn-fb flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <svg className="size-4 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="font-extrabold">{t.loginPage.facebook}</span>
                </button>

                {/* LINE Button */}
                <button
                  type="button"
                  onClick={() => alert("LINE Sign-In integration ready")}
                  className="as-social-btn-line flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <svg className="size-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 5.82 2 10.53c0 4.22 3.63 7.74 8.52 8.41.33.07.78.22.9.5.1.26.07.66.03.92-.09.56-.37 2.21-.41 2.45-.06.35.15.58.48.39.26-.15 3.54-2.14 5.36-3.79C19.78 17.51 22 14.28 22 10.53 22 5.82 17.52 2 12 2z" />
                  </svg>
                  <span className="font-extrabold">{t.loginPage.line}</span>
                </button>

              </div>
            </div>

            {/* SWITCH TO REGISTER LINK */}
            <div className="pt-2 text-center text-xs font-bold text-game-muted as-field-entrance" style={{ animationDelay: "0.48s" }}>
              <span>{t.loginPage.noAccountYet} </span>
              <Link
                href="/register"
                className="text-info font-black hover:text-white underline transition-colors"
              >
                {t.loginPage.registerLink}
              </Link>
            </div>

          </form>

        </div>

      </div>

      {/* FOOTER COPYRIGHT */}
      <footer className="relative z-20 py-4 text-center text-[11px] font-bold text-game-muted/70">
        <span>© 2026 Avatar Star Online. All rights reserved.</span>
      </footer>

    </main>
  );
}
