import Link from 'next/link';
import { KELAS, PULAU } from '@/lib/eduplay';

/* ============================================================================
   Peta 12 pulau — motif khas EduPlay. Kurikulumnya memang berupa pulau, jadi
   ditampilkan sebagai peta: laut cekung (neumorfis), pulau-pulau timbul
   berbentuk kerikil, dan jalur perahu putus-putus dari pulau 1 ke 12.
   Setiap pulau menaut ke contoh soalnya di halaman kurikulum.
   ========================================================================== */

const BISA_DICOBA = new Set(['teman-sepuluh', 'timbangan']);
// Bentuk kerikil yang sedikit berbeda untuk tiap posisi, supaya tidak terlihat seperti kotak berulang.
const BENTUK = [
  'rounded-[46%_54%_42%_58%/55%_45%_55%_45%]',
  'rounded-[58%_42%_55%_45%/45%_58%_42%_55%]',
  'rounded-[42%_58%_48%_52%/52%_44%_56%_48%]',
  'rounded-[54%_46%_60%_40%/48%_56%_44%_52%]',
];

export default function PetaPulau() {
  return (
    <div className="neu-sunken peta-laut relative rounded-[2.5rem] p-4 sm:p-6 lg:p-8">
      <ol className="grid gap-3 lg:grid-cols-3 lg:gap-6">
        {KELAS.map((k, ki) => (
          <li key={k.no} className="relative">
            <p className="flex items-baseline justify-between px-2 pb-3">
              <span className="font-[family-name:var(--font-baloo)] text-xl font-extrabold text-ink">Kelas {k.no}</span>
              <span className="text-xs font-semibold">{k.fase}</span>
            </p>
            <div className="relative">
              {/* Jalur perahu di dalam satu kelas: 1 → 2 → 3 → 4 (zig-zag) */}
              <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
                <path d="M25 25 H75 L25 75 H75" fill="none" stroke="var(--color-brand)" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
              </svg>
              <ol className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {PULAU.filter((p) => p.kelas === k.no).map((p, i) => {
                  const nomor = ki * 4 + i + 1;
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/kurikulum#${p.slug}`}
                        className={`neu-raised group flex h-full min-h-[6.5rem] flex-col justify-between px-4 py-3.5 transition-colors hover:text-brand-ink ${BENTUK[i]}`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="neu-sunken grid h-7 w-7 shrink-0 place-items-center rounded-full font-[family-name:var(--font-baloo)] text-sm font-extrabold text-brand-ink">{nomor}</span>
                          {BISA_DICOBA.has(p.slug) && <span className="rounded-full bg-brand-ink px-2 py-0.5 text-[0.65rem] font-bold text-white">bisa dicoba</span>}
                        </span>
                        <span className="mt-2 block font-[family-name:var(--font-baloo)] text-lg leading-tight font-extrabold text-ink group-hover:text-brand-ink">
                          {p.nama.replace(/^Pulau /, '')}
                        </span>
                        <span className="block text-xs leading-snug">{p.main}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
            {ki < KELAS.length - 1 && (
              <p aria-hidden="true" className="flex items-center justify-center gap-2 pt-3 text-xs font-semibold text-brand-ink lg:hidden">
                <span className="h-5 border-l-2 border-dashed border-brand/45" /> berlayar ke kelas {k.no + 1}
              </p>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-5 px-2 text-sm leading-relaxed">
        Anak membuka pulau berikutnya setelah menjawab benar 8 dari 10 soal tiga hari berturut-turut. Ketuk pulau untuk melihat contoh soalnya.
      </p>
    </div>
  );
}
