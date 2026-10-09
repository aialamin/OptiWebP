import React, { useState } from 'react';
import {
  Sun,
  Moon01,
  Download02,
  Menu01,
  X,
  Wallet01,
  Zap,
  LayersTwo01,
  BookOpen01,
  ShieldTick,
} from '@untitledui/icons';
import { Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { Web3WalletState } from '../utils/web3';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  hasConvertedItems: boolean;
  onDownloadAll?: () => void;
  wallet?: Web3WalletState;
  onConnectWallet?: () => void;
  onScrollToConverter?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  hasConvertedItems,
  onDownloadAll,
  wallet,
  onConnectWallet,
  onScrollToConverter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0c0e12]/95 backdrop-blur-md border-b border-neutral-200/90 dark:border-neutral-800/90 transition-colors">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="/" className="hover:opacity-90 transition-opacity">
            <Logo size="md" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
          <a
            href="#converter"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Converter
          </a>
          <a
            href="#how-it-works"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            How it Works
          </a>
          <a
            href="#wordpress-plugin"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>WP Plugin</span>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/20">
              FREE
            </span>
          </a>
          <a
            href="#compare"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Compare
          </a>
          <a
            href="#seo-faq"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            SEO & FAQ
          </a>
          <a
            href="#web3-integration"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Web3
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {wallet?.isConnected ? (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>
                {wallet.address?.substring(0, 6)}...{wallet.address?.substring(wallet.address.length - 4)}
              </span>
            </div>
          ) : (
            onConnectWallet && (
              <button
                type="button"
                onClick={onConnectWallet}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-all duration-150 cursor-pointer border border-neutral-200 dark:border-neutral-700 shadow-xs active:scale-95"
              >
                <Wallet01 className="w-3.5 h-3.5" />
                <span>Web3</span>
              </button>
            )
          )}

          {hasConvertedItems && onDownloadAll && (
            <button
              type="button"
              onClick={onDownloadAll}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 rounded-xl transition-all duration-150 shadow-xs whitespace-nowrap cursor-pointer active:scale-95"
            >
              <Download02 className="w-3.5 h-3.5" />
              <span>Download ZIP</span>
            </button>
          )}

          <a
            href="https://github.com/aialamin/optiwebp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub by Al Amin Hossain"
            title="GitHub: aialamin/optiwebp"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-all duration-150 border border-neutral-200 dark:border-neutral-700 shadow-xs active:scale-95"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="font-mono">GitHub</span>
          </a>

          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all duration-150 cursor-pointer active:scale-95"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon01 className="w-4 h-4" />}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile navigation menu"
            className="p-2 md:hidden text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-neutral-900 dark:text-white" /> : <Menu01 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Modern, Polished Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/98 dark:bg-[#0c0e12]/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="px-5 pt-4 pb-6 space-y-4">
            {/* Quick Conversion CTA */}
            <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => handleNavClick('converter')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Drop & Convert Images Now</span>
              </button>
            </div>

            {/* Navigation Links with Icons */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleNavClick('converter')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-left text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>WebP Converter Studio</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">100% Client-Side</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('how-it-works')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-left text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <LayersTwo01 className="w-4 h-4 text-neutral-500" />
                  <span>How WebP Works (Simulation)</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">Interactive</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('wordpress-plugin')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-left text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>WordPress Plugin</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  FREE DOWNLOAD
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('compare')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-left text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldTick className="w-4 h-4 text-neutral-500" />
                  <span>Competitor Comparison</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">Squoosh vs TinyPNG</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('seo-faq')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-left text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen01 className="w-4 h-4 text-neutral-500" />
                  <span>Google Core Web Vitals & SEO</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">FAQ Guide</span>
              </button>
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
              <a
                href="https://github.com/aialamin/optiwebp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub @aialamin</span>
              </a>

              <span className="text-[11px] font-mono text-neutral-400">
                Al Amin Hossain
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
