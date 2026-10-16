'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NAV = [
  ['/kurikulum', 'Kurikulum'],
  ['/#peta', 'Peta pulau'],
  ['/#orang-tua', 'Untuk orang tua'],
  ['/#harga', 'Harga'],
];

/* Navigasi utama + menu ponsel. Di ponsel panelnya berupa papan neumorfis yang timbul; tiap tautan adalah ubin cekung bernomor seperti ubin permainan Teman Sepuluh.
   Menu tertutup sendiri saat pindah halaman, menekan Escape (fokus kembali ke
   tombol), atau mengetuk di luar panel. */
export default function Navigasi({ children }) {
  const path = usePathname();
  const [buka, setBuka] = useState(false);
  const tombol = useRef(null);
  const panel = useRef(null);

  useEffect(() => setBuka(false), [path]);

  useEffect(() => {
    if (!buka) return undefined;
    const tutup = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape') return;
      if (e.type === 'pointerdown' && (panel.current?.contains(e.target) || tombol.current?.contains(e.target))) return;
      setBuka(false);
      if (e.type === 'keydown') tombol.current?.focus();
    };
    document.addEventListener('keydown', tutup);
    document.addEventListener('pointerdown', tutup);
    return () => {
      document.removeEventListener('keydown', tutup);
      document.removeEventListener('pointerdown', tutup);
    };
  }, [buka]);

  const aktif = (href) => (!href.includes('#') && href !== '/' && path.startsWith(href) ? 'page' : undefined);

  return (
    <>
      <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex">
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} aria-current={aktif(href)} className="text-sm font-semibold text-ink-2 hover:text-ink aria-[current=page]:text-brand-ink">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        {children}
        <button
          ref={tombol}
          type="button"
          aria-expanded={buka}
          aria-controls="menu-ponsel"
          onClick={() => setBuka((b) => !b)}
          className="neu-raised inline-flex h-10 min-w-[4.5rem] items-center justify-center rounded-full px-3.5 text-sm font-semibold text-ink md:hidden"
        >
          {buka ? 'Tutup' : 'Menu'}
        </button>
      </div>
      <nav id="menu-ponsel" ref={panel} aria-label="Navigasi ponsel" hidden={!buka} className="absolute inset-x-0 top-full px-4 pt-2 pb-4 md:hidden">
        <ol className="neu-raised mx-auto grid max-w-6xl grid-cols-2 gap-3 rounded-[2rem] p-4">
          {NAV.map(([href, label], i) => (
            <li key={href} className="">
              <Link href={href} onClick={() => setBuka(false)} aria-current={aktif(href)} className="neu-sunken flex min-h-14 items-center gap-3 rounded-2xl px-4 py-3 text-ink aria-[current=page]:text-brand-ink aria-[current=page]:ring-2 aria-[current=page]:ring-brand-ink">
                <span className="font-[family-name:var(--font-baloo)] text-lg font-extrabold text-brand-ink">{i + 1}</span>
                <span className="text-sm leading-tight font-semibold">{label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
