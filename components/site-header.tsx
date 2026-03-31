"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon?: ReactNode;
};

const navItems: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/artistas", label: "Artistas" },
  { href: "/lanzamientos", label: "Lanzamientos" },
  { href: "/fechas", label: "Fechas" },
  { href: "/videos", label: "Videos" },
  { href: "/noticias", label: "Noticias" },
  { href: "/prensa", label: "Prensa" },
  { href: "/tienda", label: "Tienda" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="container-site flex items-center justify-between py-5">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-black"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="La Silla international Corp"
            width={160}
            height={48}
            className="h-9 w-auto object-contain"
            priority
          />
          <span>La Silla international Corp.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-sm text-zinc-600 transition hover:text-[#E8452C]"
            >
              {item.icon ?? null}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black transition hover:border-black/30 md:hidden"
        >
          <span className="sr-only">{isOpen ? "Cerrar menu" : "Abrir menu"}</span>

          {isOpen ? (
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 18 6m0 12L6 6"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-black/10 md:hidden">
          <nav className="container-site flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 border-b border-black/5 py-4 text-base text-zinc-700 transition hover:text-[#E8452C]"
              >
                {item.icon ?? null}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
