import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  CheckCircle,
  Sliders01,
  RefreshCw01,
  FileCode01,
  ShieldTick,
  Eye,
  Play,
  PauseCircle,
  Activity,
  LayersTwo01,
  Check,
  ArrowRight,
  Maximize01,
} from '@untitledui/icons';
import { Badge } from './untitledui/Badge';
import { Button } from './untitledui/Button';
import { BorderBeam } from './animations/BorderBeam';
import { AnimatedNumber } from './animations/AnimatedNumber';
import { SpotlightCard } from './animations/SpotlightCard';
import { ShinyText } from './animations/ShinyText';
import { DecryptedText } from './animations/DecryptedText';

interface StageInfo {
  step: number;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  technicalDetails: string;
}

const STAGES: StageInfo[] = [
  {
    step: 1,
    title: 'Macroblock Grid Segmentation',
    badge: 'Stage 1: Spatial Partition',
    tagline: 'Decomposes raw pixel raster into 16×16 & 4×4 macroblocks',
    description:
      'Instead of processing megabytes of uncompressed RGB pixels uniformly, WebP divides the canvas into hierarchical macroblocks. Color is converted to YUV (YCbCr) 4:2:0 subsampling, cutting chroma data in half before compression begins.',
    technicalDetails: '16×16 Luma blocks · 8×8 Chroma subsampling · Flat vs textured edge classifier',
  },
  {
    step: 2,
    title: 'Intra-Frame Spatial Prediction',
    badge: 'Stage 2: VP8 Prediction',
    tagline: 'Predicts pixel values from adjacent blocks — encodes only residuals',
    description:
      'The secret to WebP fidelity: VP8 predicts each pixel using four directional prediction modes (Horizontal, Vertical, DC Average, TrueMotion) from already-decoded adjacent pixels. The encoder only stores the tiny residual differences, cutting ~70% of payload.',
    technicalDetails: 'H-Predict / V-Predict / DC / TrueMotion modes · Residual error matrix encoding',
  },
  {
    step: 3,
    title: 'DCT Frequency Quantization',
    badge: 'Stage 3: Psycho-Visual Filter',
    tagline: 'Eliminates imperceptible high-frequency visual noise',
    description:
      'A Discrete Cosine Transform (DCT) converts residual pixel matrices into frequency domain coefficients. The quality slider controls quantization: high-frequency noise that the human eye cannot resolve is zeroed out while preserving razor-sharp silhouettes and contrast.',
    technicalDetails: '4×4 FDCT Transform · Psycho-visual quantization matrix · Zero high-freq coefficients',
  },
  {
    step: 4,
    title: 'Arithmetic Bitstream Packaging',
    badge: 'Stage 4: Bitstream Output',
    tagline: 'Packed into compact WebP container with 100% client-side privacy',
    description:
      'Quantized coefficients are compressed using Boolean arithmetic entropy coding (more efficient than standard JPEG Huffman). Transparency is embedded in an optional VP8X alpha chunk, generating an ultra-compact file ready for instant web rendering.',
    technicalDetails: 'VP8/VP8L bitstream · Boolean arithmetic encoder · RIFF WebP header + EXIF metadata',
  },
];

export const OptimizationExplainerAnimation: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [stageProgress, setStageProgress] = useState(0); // 0 to 100% within current stage
  const [selectedPreset, setSelectedPreset] = useState<'photo' | 'transparent'>('photo');
  const [qualitySlider, setQualitySlider] = useState(85);
  const [sliderPosition, setSliderPosition] = useState(50); // Split slider 0 to 100%
  const [isHovered, setIsHovered] = useState(false);
  const [activeGridScanX, setActiveGridScanX] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(640);

  const activeStage = STAGES[activeStageIndex];

  // Dynamic calculations based on quality and preset
  const originalSizeKb = selectedPreset === 'photo' ? 313 : 1420;
  const webpSizeKb = selectedPreset === 'photo'
    ? Math.round(originalSizeKb * (0.28 + Math.pow(qualitySlider / 100, 2.3) * 0.14))
    : Math.round(originalSizeKb * (0.07 + Math.pow(qualitySlider / 100, 2.3) * 0.18));
  const savedPercent = Math.round(((originalSizeKb - webpSizeKb) / originalSizeKb) * 100);
  const encodingTimeMs = Math.round(24 + (qualitySlider / 100) * 18);

  // Measure container width for pixel-perfect split image slider
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Butter-smooth 60fps timer loop for stage progression
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    let lastTime = performance.now();
    let frameId: number;
    const stageDurationMs = 5500; // 5.5 seconds per stage

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      setStageProgress((prev) => {
        const next = prev + (delta / stageDurationMs) * 100;
        if (next >= 100) {
          setActiveStageIndex((curr) => (curr + 1) % STAGES.length);
          return 0;
        }
        return next;
      });

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, isHovered, activeStageIndex]);

  // Animated laser scan across the macroblock grid
  useEffect(() => {
    let frame: number;
    let pos = 0;
    let dir = 1;

    const animateScan = () => {
      pos += 0.4 * dir;
      if (pos >= 100) dir = -1;
      else if (pos <= 0) dir = 1;
      setActiveGridScanX(pos);
      frame = requestAnimationFrame(animateScan);
    };

    frame = requestAnimationFrame(animateScan);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleNextStage = () => {
    setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
    setStageProgress(0);
  };

  const handlePrevStage = () => {
    setActiveStageIndex((prev) => (prev === 0 ? STAGES.length - 1 : prev - 1));
    setStageProgress(0);
  };

  const handleSelectStage = (idx: number) => {
    setActiveStageIndex(idx);
    setStageProgress(0);
  };

  return (
    <div
      className="w-full transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Controller Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="sm" dot>
              <ShinyText speed={4} className="text-emerald-700 dark:text-emerald-300">
                Live Compression Pipeline
              </ShinyText>
            </Badge>
            <span className="text-xs text-neutral-400">·</span>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Hardware Canvas VP8 & VP8L
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How WebP Optimization Works
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            See how predictive macroblock quantization strips redundant payload without losing visual sharpness on real photography.
          </p>
        </div>

        {/* Control Actions & Preset Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Preset Buttons */}
          <div className="inline-flex p-1 bg-neutral-100 dark:bg-neutral-850 rounded-xl border border-neutral-200/80 dark:border-neutral-800">
            <button
              onClick={() => setSelectedPreset('photo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedPreset === 'photo'
                  ? 'bg-white dark:bg-[#1a1f2c] text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Penthouse Photo (OptiWeb)
            </button>
            <button
              onClick={() => setSelectedPreset('transparent')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedPreset === 'transparent'
                  ? 'bg-white dark:bg-[#1a1f2c] text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Graphic (Lossless VP8L)
            </button>
          </div>

          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white dark:bg-[#161a24] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-[#1e2330] rounded-xl transition-all duration-150 cursor-pointer shadow-xs active:scale-95"
          >
            {isPlaying ? (
              <PauseCircle className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Play className="w-3.5 h-3.5 text-emerald-500" />
            )}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
        </div>
      </div>

      {/* Stage Step Tabs with Motion layoutId indicator & silky smooth 60fps green line */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-6 pb-6">
        {STAGES.map((s, idx) => {
          const isActive = idx === activeStageIndex;
          const isDone = idx < activeStageIndex;

          return (
            <button
              key={s.step}
              onClick={() => handleSelectStage(idx)}
              className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-neutral-50 dark:bg-[#141822] border-emerald-500/80 dark:border-emerald-500/80 shadow-xs'
                  : isDone
                  ? 'bg-white dark:bg-[#11141b] border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                  : 'bg-white dark:bg-[#11141b] border-neutral-200 dark:border-neutral-800 opacity-70 hover:opacity-100 hover:border-neutral-300'
              }`}
            >
              {/* Smooth Framer Motion active ring highlight */}
              {isActive && (
                <motion.div
                  layoutId="activeStepGlow"
                  className="absolute inset-0 rounded-xl ring-2 ring-emerald-500/40 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}

              {/* Silky-smooth green progress line animation under button on Steps */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-200/50 dark:bg-neutral-800/80 overflow-hidden">
                {isActive ? (
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 shadow-[0_0_8px_#10b981]"
                    style={{
                      width: `${stageProgress}%`,
                      transition: isPlaying ? 'width 100ms linear' : 'width 0.2s ease',
                      willChange: 'width',
                    }}
                  />
                ) : isDone ? (
                  <div className="h-full w-full bg-emerald-500/60" />
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-1 mb-1.5 relative z-10">
                <span className="font-mono text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Step 0{s.step}
                </span>
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : isActive ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
                ) : null}
              </div>

              <div className="text-xs font-semibold text-neutral-900 dark:text-white truncate relative z-10">
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        {/* Left Column: Visual Interactive Graphic Simulation */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div
            ref={containerRef}
            className="relative w-full h-76 sm:h-88 rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-950 select-none shadow-sm"
          >
            {/* React Bits BorderBeam on the active video canvas */}
            <BorderBeam
              size={180}
              duration={10}
              colorFrom="#10b981"
              colorTo="#06b6d4"
              borderWidth={1.5}
            />

            {/* Base Visual Scene */}
            {selectedPreset === 'photo' ? (
              /* Real Photography Scene (Optiweb.jpg) */
              <div className="absolute inset-0 bg-neutral-950 overflow-hidden">
                <img
                  src="/Optiweb.jpg"
                  alt="High-resolution modern interior architecture with ocean view"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient vignette to keep UI text crisp and readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30 pointer-events-none" />

                <div className="absolute bottom-4 left-4 z-10 font-mono text-[11px] text-white/90 bg-neutral-900/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>OptiWeb Raw Interior · 1600 × 1067 px</span>
                </div>
              </div>
            ) : (
              /* Transparent Vector UI Badge Scene */
              <div className="absolute inset-0 bg-[#0d1117] flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, #262c36 25%, transparent 25%), 
                      linear-gradient(-45deg, #262c36 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, #262c36 75%), 
                      linear-gradient(-45deg, transparent 75%, #262c36 75%)
                    `,
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-300 p-1 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                  >
                    <div className="w-full h-full rounded-2xl bg-neutral-950/90 flex flex-col items-center justify-center">
                      <Zap className="w-12 h-12 text-emerald-400 mb-1" />
                      <span className="font-mono text-xs font-bold text-white tracking-wider">
                        VP8L ALPHA
                      </span>
                    </div>
                  </motion.div>
                  <span className="mt-3 font-mono text-[11px] text-emerald-400/90 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Lossless 32-Bit RGBA Transparency
                  </span>
                </div>
              </div>
            )}

            {/* STAGE-SPECIFIC ANIMATIONS OVERLAY */}

            {/* Stage 1: Macroblock Grid Overlay */}
            {activeStageIndex === 0 && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-45">
                  <defs>
                    <pattern id="macroblock-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#34d399" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#macroblock-grid)" />
                </svg>

                <div
                  className="absolute top-1/4 h-28 w-28 rounded-lg border-2 border-emerald-400 bg-emerald-500/15 backdrop-blur-[1px] transition-all duration-300 shadow-[0_0_24px_#10b981]"
                  style={{ left: `${Math.min(activeGridScanX, 75)}%` }}
                >
                  <div className="absolute -top-5 left-0 font-mono text-[9px] font-bold bg-emerald-500 text-neutral-950 px-1.5 py-0.5 rounded shadow-sm">
                    16×16 LUMA BLOCK
                  </div>
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 divide-x divide-y divide-emerald-400/50" />
                </div>
              </div>
            )}

            {/* Stage 2: Intra-Prediction Directional Vectors */}
            {activeStageIndex === 1 && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 350 }}
                  className="w-56 rounded-xl border border-emerald-400/80 bg-neutral-900/90 backdrop-blur-md p-3.5 flex flex-col justify-between shadow-2xl"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-2">
                    <span>VP8 PREDICTION</span>
                    <span className="font-bold">MODE: H+V</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 my-2">
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-center p-2 rounded bg-neutral-800/90 border border-neutral-700"
                    >
                      <div className="text-emerald-400 font-bold text-xs">→</div>
                      <span className="text-[9px] font-mono text-neutral-400">H-Predict</span>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                      className="text-center p-2 rounded bg-neutral-800/90 border border-neutral-700"
                    >
                      <div className="text-emerald-400 font-bold text-xs">↓</div>
                      <span className="text-[9px] font-mono text-neutral-400">V-Predict</span>
                    </motion.div>
                    <motion.div
                      animate={{ x: [0, 2, 0], y: [0, 2, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                      className="text-center p-2 rounded bg-neutral-800/90 border border-neutral-700"
                    >
                      <div className="text-emerald-400 font-bold text-xs">↘</div>
                      <span className="text-[9px] font-mono text-neutral-400">TrueMotion</span>
                    </motion.div>
                  </div>

                  <div className="text-[10px] font-mono text-emerald-300 text-center bg-emerald-950/70 py-1 rounded border border-emerald-800/40 mt-1">
                    Encodes Residual: -68% Bytes
                  </div>
                </motion.div>
              </div>
            )}

            {/* Stage 3: DCT Frequency Quantization Spectrum */}
            {activeStageIndex === 2 && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 350 }}
                  className="w-full max-w-sm rounded-xl border border-emerald-400/70 bg-neutral-950/90 backdrop-blur-md p-4 shadow-2xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white">
                      DCT Quantization Matrix (Q={qualitySlider})
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      FDCT 4×4
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="flex items-center justify-between text-neutral-300">
                      <span>Low Frequencies (Edges & Silhouette)</span>
                      <span className="text-emerald-400 font-bold">100% Retained</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full w-full" />
                    </div>

                    <div className="flex items-center justify-between text-neutral-300 pt-1">
                      <span>High Frequencies (Sub-pixel noise)</span>
                      <span className="text-amber-400 font-bold">Quantized to 0</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-200"
                        style={{ width: `${Math.max(10, 100 - qualitySlider)}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-400 leading-tight">
                    Psycho-visual curve preserves 100% retina clarity while eliminating unnecessary payload.
                  </p>
                </motion.div>
              </div>
            )}

            {/* Stage 4: Byte stream delivery and Split slider view */}
            {activeStageIndex === 3 && (
              <>
                {/* Left Side: Original Image clipping */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-emerald-400 shadow-2xl z-20 pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src="/Optiweb.jpg"
                    alt="Original JPEG 313 KB"
                    className="absolute inset-0 h-full object-cover"
                    style={{
                      width: containerWidth ? `${containerWidth}px` : '100%',
                      maxWidth: 'none',
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/20" />
                  <div className="absolute top-3 left-3 bg-neutral-950/85 text-white font-mono text-[11px] px-2.5 py-1 rounded-md border border-neutral-700/80 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Original JPEG: 313 KB</span>
                  </div>
                </div>

                {/* Right Side: WebP Tag */}
                <div className="absolute top-3 right-3 bg-emerald-950/85 text-emerald-300 font-mono text-[11px] px-2.5 py-1 rounded-md backdrop-blur-md border border-emerald-500/40 flex items-center gap-1.5 shadow-md z-10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Optimized WebP: {webpSizeKb} KB (-{savedPercent}%)</span>
                </div>

                {/* Interactive Drag Handle */}
                <div
                  className="absolute inset-y-0 w-8 -translate-x-4 cursor-ew-resize flex items-center justify-center z-30"
                  style={{ left: `${sliderPosition}%` }}
                  onMouseDown={(e) => {
                    const handleMove = (me: MouseEvent) => {
                      if (!containerRef.current) return;
                      const rect = containerRef.current.getBoundingClientRect();
                      const pct = Math.max(5, Math.min(95, ((me.clientX - rect.left) / rect.width) * 100));
                      setSliderPosition(pct);
                    };
                    const handleUp = () => {
                      window.removeEventListener('mousemove', handleMove);
                      window.removeEventListener('mouseup', handleUp);
                    };
                    window.addEventListener('mousemove', handleMove);
                    window.addEventListener('mouseup', handleUp);
                  }}
                  onTouchMove={(e) => {
                    if (!containerRef.current || !e.touches[0]) return;
                    const rect = containerRef.current.getBoundingClientRect();
                    const pct = Math.max(5, Math.min(95, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
                    setSliderPosition(pct);
                  }}
                >
                  <div className="w-7 h-7 rounded-full bg-white dark:bg-neutral-900 border-2 border-emerald-500 shadow-xl flex items-center justify-center text-[10px] font-bold text-neutral-900 dark:text-white cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                    ↔
                  </div>
                </div>
              </>
            )}

            {/* Stage Badge on bottom right */}
            <div className="absolute bottom-3 right-3 z-10">
              <span className="font-mono text-[10px] font-bold bg-neutral-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded backdrop-blur-xs">
                <DecryptedText text={activeStage.badge} speed={25} />
              </span>
            </div>
          </div>

          {/* Sub-bar hint */}
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 px-1">
            <span className="truncate">
              {activeStageIndex === 3
                ? 'Drag handle ↔ to compare original JPEG vs compressed WebP'
                : 'Hovering over animation pauses stage advance'}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrevStage}
                className="hover:text-neutral-900 dark:hover:text-white cursor-pointer px-2 py-0.5 text-xs font-semibold"
              >
                ← Prev
              </button>
              <button
                onClick={handleNextStage}
                className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer px-2 py-0.5 text-xs font-semibold"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Explanatory Context & Live Quality Simulator */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          {/* Active Stage Deep-Dive Card with Spotlight */}
          <SpotlightCard className="p-5 border-neutral-200/80 dark:border-neutral-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 text-[11px] font-bold font-mono flex items-center justify-center">
                {activeStage.step}
              </span>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {activeStage.title}
              </h3>
            </div>

            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {activeStage.tagline}
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {activeStage.description}
            </p>

            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              <DecryptedText text={activeStage.technicalDetails} triggerOnHover={true} speed={20} />
            </div>
          </SpotlightCard>

          {/* Live Metrics Telemetry with Animated Numbers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#141822] border border-neutral-200/80 dark:border-neutral-800">
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">
                Payload Reduction
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 tabular-nums">
                -<AnimatedNumber value={savedPercent} />%
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                <span>{originalSizeKb} KB</span>
                <ArrowRight className="w-3 h-3 text-neutral-400 inline shrink-0" />
                <span><AnimatedNumber value={webpSizeKb} /> KB</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#141822] border border-neutral-200/80 dark:border-neutral-800">
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">
                In-Browser Encode
              </span>
              <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white mt-0.5 tabular-nums">
                <AnimatedNumber value={encodingTimeMs} />ms
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                0ms Server Upload
              </span>
            </div>
          </div>

          {/* Interactive Quality Slider */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#141822] border border-neutral-200/80 dark:border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white">
                <Sliders01 className="w-3.5 h-3.5 text-neutral-500" />
                <span>Simulate WebP Quality Factor:</span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {qualitySlider}%
              </span>
            </div>

            <input
              type="range"
              min="50"
              max="100"
              value={qualitySlider}
              onChange={(e) => setQualitySlider(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
              <span>60% (Max Speed)</span>
              <span>85% (Smart Auto)</span>
              <span>100% (Lossless VP8L)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
