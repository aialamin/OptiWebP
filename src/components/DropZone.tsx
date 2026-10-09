import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { UploadCloud02, Image01, RefreshCw01, CheckCircle } from '@untitledui/icons';
import { SAMPLE_IMAGES, createSampleFile, SampleImageDef } from '../utils/samples';
import { BorderBeam } from './animations/BorderBeam';
import { ShinyText } from './animations/ShinyText';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadingSample, setLoadingSample] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      const imageFiles: File[] = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) imageFiles.push(file);
        }
      }

      if (imageFiles.length > 0) {
        onFilesSelected(imageFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFilesSelected]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/') || /\.(png|jpe?g|webp|avif|gif|bmp|svg|tiff)$/i.test(file.name)
      );
      if (droppedFiles.length > 0) {
        onFilesSelected(droppedFiles);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleSampleClick = async (sample: SampleImageDef) => {
    if (loadingSample) return;
    try {
      setLoadingSample(sample.id);
      const file = await createSampleFile(sample);
      onFilesSelected([file]);
    } finally {
      setLoadingSample(null);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.png,.jpg,.jpeg,.webp,.avif,.gif,.bmp"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <motion.div
        whileHover={{ scale: 1.002 }}
        whileTap={{ scale: 0.998 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={onDropHandler}
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer p-8 sm:p-12 text-center group overflow-hidden ${
          isDragOver
            ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
            : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#11141b] hover:border-neutral-400 dark:hover:border-neutral-600 shadow-xs'
        }`}
      >
        {isDragOver && (
          <BorderBeam size={160} duration={6} colorFrom="#10b981" colorTo="#06b6d4" />
        )}

        <div className="max-w-md mx-auto flex flex-col items-center justify-center">
          <motion.div
            animate={isDragOver ? { y: -4 } : { y: 0 }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105 ${
              isDragOver
                ? 'bg-emerald-500 text-neutral-950 shadow-md'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <UploadCloud02 className="w-7 h-7" />
          </motion.div>

          <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mb-1 tracking-tight">
            Drag & drop images here, or{' '}
            <span className="underline underline-offset-4 decoration-emerald-500 font-bold">
              <ShinyText speed={4} className="text-emerald-600 dark:text-emerald-400">
                browse files
              </ShinyText>
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            Supports PNG, JPG, AVIF, GIF · 100% Client-Side Private · Paste with <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px] border border-neutral-200 dark:border-neutral-700">Ctrl+V</kbd>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-400 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> No Uploads
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Auto Compression
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Offline Capable
            </span>
          </div>
        </div>
      </motion.div>

      {/* Quick Samples */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
        <span className="text-neutral-400 text-xs">Try with immediate samples:</span>
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              disabled={isProcessing || loadingSample !== null}
              onClick={(e) => {
                e.stopPropagation();
                handleSampleClick(sample);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl transition-all duration-150 border border-neutral-200/90 dark:border-neutral-700 cursor-pointer disabled:opacity-50 shadow-xs active:scale-95"
            >
              <Image01 className="w-3.5 h-3.5 text-neutral-500" />
              <span>
                {sample.id === 'sample-photo'
                  ? 'Sunset Photo (1.8MB)'
                  : sample.id === 'sample-transparent'
                  ? 'Vector Logo (340KB)'
                  : sample.id === 'sample-optiweb'
                  ? 'Penthouse (Optiweb.jpg)'
                  : 'Product Studio'}
              </span>
              {loadingSample === sample.id && <RefreshCw01 className="w-3.5 h-3.5 animate-spin text-emerald-500" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
