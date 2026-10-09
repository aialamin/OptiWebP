import React from 'react';
import { ArrowDown, Download02, Zap, Image01, RefreshCw01 } from '@untitledui/icons';
import { Badge } from './untitledui/Badge';
import { ShinyText } from './animations/ShinyText';
import { SAMPLE_IMAGES, SampleImageDef } from '../utils/samples';

interface HeroProps {
  onScrollToConverter: () => void;
  onScrollToPlugin: () => void;
  onQuickSampleClick?: (sample: SampleImageDef) => void;
  loadingSampleId?: string | null;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToConverter,
  onScrollToPlugin,
  onQuickSampleClick,
  loadingSampleId = null,
}) => {
  return (
    <section className="w-full pt-8 sm:pt-12 pb-8 text-center">
      <div className="w-full max-w-5xl lg:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Brand & WordPress Feature Badge */}
        <div className="inline-flex items-center mb-6">
          <Badge variant="brand" size="md" dot>
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              Every WordPress Feature Built-In
            </span>
            <span className="mx-2 text-emerald-400">·</span>
            <ShinyText speed={5} className="font-semibold text-emerald-700 dark:text-emerald-300">
              Next-Gen WebP Engine (100% Free Forever)
            </ShinyText>
          </Badge>
        </div>

        {/* Hero Title - Bold, Balanced, Expansive */}
        <h1 className="typespace-heading text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold text-neutral-950 dark:text-white mb-5 tracking-tight text-balance">
          High-Fidelity{' '}
          <ShinyText speed={6} className="bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-emerald-400">
            WebP Converter
          </ShinyText>{' '}
          & Speed Optimizer
        </h1>

        {/* Readable Subtitle with Generous Typespace */}
        <p className="typespace-subhead text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8 leading-relaxed text-balance font-normal">
          Compress photos with original visual fidelity and zero loss in sharpness. 100% private in-browser engine paired with an official, free WordPress plugin for automatic uploads, responsive thumbnails, and server-level rewrites.
        </p>

        {/* Action Buttons - Modern, Simple, Stable Animations (Zero Jitter, Zero Translation Wobble) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-9">
          {/* Primary CTA: Solid, modern hover glow & clean icon nudge */}
          <button
            type="button"
            onClick={onScrollToConverter}
            className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl shadow-sm hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98] transition-all duration-200 ease-out cursor-pointer select-none"
          >
            <Zap className="w-4 h-4 text-white shrink-0" />
            <span>Convert Images Now</span>
            <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform duration-200 ease-out shrink-0" />
          </button>

          {/* Secondary CTA: Crisp border elevation & subtle icon scale */}
          <button
            type="button"
            onClick={onScrollToPlugin}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-850 dark:hover:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-700 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 rounded-xl shadow-xs hover:shadow-sm active:scale-[0.98] transition-all duration-200 ease-out cursor-pointer select-none"
          >
            <Download02 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-200 ease-out shrink-0" />
            <span>Free WordPress Plugin</span>
          </button>
        </div>

        {/* DRIVE USER INTO OPTIMIZATION: Instant 1-Click Launchpad */}
        {onQuickSampleClick && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 text-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2 text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Drive into instant optimization — click any sample to test:</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/60">
                  Sub-second parallel encoding
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SAMPLE_IMAGES.map((sample) => {
                  const isSampleLoading = loadingSampleId === sample.id;
                  const label =
                    sample.id === 'sample-optiweb'
                      ? 'Penthouse (Optiweb.jpg)'
                      : sample.id === 'sample-photo'
                      ? 'Sunset Landscape'
                      : 'Vector Logo Graphic';
                  const origSize =
                    sample.id === 'sample-optiweb' ? '313 KB' : sample.id === 'sample-photo' ? '1.8 MB' : '340 KB';
                  const savedEst =
                    sample.id === 'sample-optiweb' ? '→ ~60 KB (-81%)' : sample.id === 'sample-photo' ? '→ ~280 KB (-84%)' : '→ ~48 KB (-86%)';

                  return (
                    <button
                      key={sample.id}
                      type="button"
                      disabled={loadingSampleId !== null}
                      onClick={() => onQuickSampleClick(sample)}
                      className="group flex flex-col items-start p-3 bg-white hover:bg-neutral-50 dark:bg-neutral-850 dark:hover:bg-neutral-800 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-out cursor-pointer text-left disabled:opacity-50"
                    >
                      <div className="w-full flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-white text-xs truncate">
                          <Image01 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span className="truncate">{label}</span>
                        </div>
                        {isSampleLoading ? (
                          <RefreshCw01 className="w-3.5 h-3.5 animate-spin text-emerald-500 shrink-0" />
                        ) : (
                          <Zap className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                        )}
                      </div>
                      <div className="w-full flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                        <span className="font-mono">{origSize}</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{savedEst}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges - Spaced & Clean */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>100% In-Browser Privacy</span>
          </div>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">·</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Multi-Core Parallel Encoding</span>
          </div>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">·</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>WordPress Plugin Included Free</span>
          </div>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">·</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Google Core Web Vitals Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};
