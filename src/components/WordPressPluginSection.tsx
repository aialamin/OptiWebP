import React, { useState } from 'react';
import {
  Download,
  CheckCircle2,
  Zap,
  Code2,
  Copy,
  Check,
  ToggleLeft,
  ToggleRight,
  Layers,
  ArrowRight,
  Gauge,
  Sparkles,
  RefreshCw,
  Globe,
  Wifi,
  FileCode,
  ShieldCheck,
  Cpu,
  Server,
  Sliders,
  Eye,
  CheckCircle,
  FileCheck,
  FolderArchive,
  Terminal,
  Settings2,
  Lock,
  AlertTriangle,
  Coins,
} from 'lucide-react';
import { downloadWordPressPluginZip } from '../utils/wordpressPlugin';
import { ShinyText } from './animations/ShinyText';

interface PluginFeature {
  id: string;
  category: 'engine' | 'frontend' | 'server' | 'safety';
  title: string;
  badge: string;
  badgeColor: string;
  hook: string;
  description: string;
  benefit: string;
}

const PLUGIN_FEATURES: PluginFeature[] = [
  {
    id: 'upload-convert',
    category: 'engine',
    title: 'Automatic On-Upload WebP Conversion',
    badge: 'Core Engine',
    badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    hook: 'wp_handle_upload',
    description: 'Every image uploaded to the WordPress Media Library is intercepted and converted to next-generation WebP format automatically on the fly.',
    benefit: 'Zero manual effort; saves 60–85% storage and bandwidth immediately upon file upload.',
  },
  {
    id: 'thumbnails',
    category: 'engine',
    title: 'Multi-Size Responsive Companions',
    badge: 'Responsive',
    badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    hook: 'wp_generate_attachment_metadata',
    description: 'Generates WebP variants for every registered image size (thumbnail, medium, medium_large, large, and all custom theme crop sizes).',
    benefit: 'Ensures mobile devices, tablets, and Retina displays receive pixel-perfect, lightweight WebP versions in srcset.',
  },
  {
    id: 'picture-tag',
    category: 'frontend',
    title: 'HTML5 <picture> Tag Dynamic Rewriting',
    badge: 'Front-End',
    badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    hook: 'the_content / wp_get_attachment_image',
    description: 'Transparently transforms standard <img> elements into modern <picture> tags with <source type="image/webp"> and legacy <img> fallback.',
    benefit: '100% backward compatible: WebP is served to all modern browsers, while legacy clients still load the original image without breakages.',
  },
  {
    id: 'htaccess-rewrite',
    category: 'server',
    title: 'Direct Apache .htaccess Mod_Rewrite Engine',
    badge: 'Server Fast-Path',
    badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    hook: 'mod_rewrite (0ms PHP)',
    description: 'Bypasses PHP and MySQL entirely. Apache inspects the browser Accept: image/webp header and serves the .webp variant directly as static content.',
    benefit: 'Maximum throughput: 0ms execution time, zero PHP process RAM usage, and instant static file delivery.',
  },
  {
    id: 'nginx-config',
    category: 'server',
    title: 'High-Performance Nginx Reverse Proxy Config',
    badge: 'Enterprise Nginx',
    badgeColor: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400 border-sky-200 dark:border-sky-800',
    hook: 'map $http_accept $webp_suffix',
    description: 'Includes a production-ready Nginx configuration block that maps HTTP Accept headers to .webp file paths for VPS and high-concurrency clusters.',
    benefit: 'Handles millions of monthly requests smoothly on lightweight Nginx, LEMP, Docker, and Kubernetes environments.',
  },
  {
    id: 'safe-originals',
    category: 'safety',
    title: '100% Lossless Safety & Original Preservation',
    badge: 'Zero Risk',
    badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    hook: 'Non-Destructive Storage',
    description: 'Original JPG and PNG files are strictly preserved in their pristine, uncompressed state inside the uploads folder. Nothing is deleted or modified.',
    benefit: 'Complete peace of mind: if you ever disable the plugin, your site seamlessly reverts to originals with zero broken URLs.',
  },
  {
    id: 'quality-slider',
    category: 'engine',
    title: 'Adjustable Compression Quality (1–100%)',
    badge: 'Fine Control',
    badgeColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    hook: 'OptiWebP Settings Page',
    description: 'Configurable compression quality slider with a recommended 82% sweet spot, balancing substantial byte reduction with pristine visual clarity.',
    benefit: 'Full control over the balance between speed benchmarks and photo portfolio sharpness.',
  },
  {
    id: 'dual-engine',
    category: 'engine',
    title: 'Dual Engine Auto-Detect (GD & Imagick)',
    badge: 'Auto Detection',
    badgeColor: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400 border-teal-200 dark:border-teal-800',
    hook: 'extension_loaded() Detection',
    description: 'Automatically detects whether your host runs ImageMagick (Imagick) or GD Library with WebP delegates, using the best available hardware encoder.',
    benefit: 'Works out-of-the-box on 99.9% of WordPress web hosting environments (cPanel, Cloudways, Kinsta, WP Engine, VPS).',
  },
  {
    id: 'exif-stripping',
    category: 'safety',
    title: 'EXIF & GPS Geolocation Privacy Stripping',
    badge: 'Privacy Shield',
    badgeColor: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    hook: 'EXIF Metadata Sanitizer',
    description: 'Strips sensitive camera metadata, camera model identifiers, embedded thumbnail duplicates, and GPS location coordinates from photos.',
    benefit: 'Ensures GDPR compliance, guards customer privacy, and strips useless kilobyte bloat from every image.',
  },
  {
    id: 'core-web-vitals',
    category: 'frontend',
    title: 'Core Web Vitals & Native Lazy Loading',
    badge: 'SEO & Speed',
    badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    hook: 'wp_get_attachment_image_attributes',
    description: 'Automatically attaches loading="lazy" and decoding="async" to front-end image markup, reducing main-thread blocking and improving LCP.',
    benefit: 'Significantly improves Google Lighthouse Performance scores (98+/100) and passes Core Web Vitals audits.',
  },
  {
    id: 'bulk-optimizer',
    category: 'engine',
    title: 'Media Library Bulk Image Optimizer',
    badge: 'Batch Engine',
    badgeColor: 'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400 border-violet-200 dark:border-violet-800',
    hook: 'AJAX Batch Processor',
    description: 'Scan your existing WordPress Media Library with one click and batch-generate WebP companions for all previously uploaded images.',
    benefit: 'Instantly modernizes years of legacy JPEG and PNG images without requiring tedious manual re-uploads.',
  },
  {
    id: 'vary-headers',
    category: 'server',
    title: 'Browser Vary: Accept Header Enforcement',
    badge: 'HTTP Caching',
    badgeColor: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
    hook: 'send_headers action',
    description: 'Emits Vary: Accept HTTP response headers to ensure downstream proxy caches and browsers distinguish WebP from legacy image responses.',
    benefit: 'Guarantees reliable caching without serving unsupported formats to legacy browser edge cases.',
  },
  {
    id: 'cdn-cache-sync',
    category: 'server',
    title: 'CDN & Cache Plugin Compatibility',
    badge: 'CDN Ready',
    badgeColor: 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    hook: 'WP Rocket / LiteSpeed Hooks',
    description: 'Fully compatible with Cloudflare, QUIC.cloud, Fastly, AWS CloudFront, LiteSpeed Cache, WP Rocket, and W3 Total Cache.',
    benefit: 'Seamless compatibility with page caches; automatic cache purging when WebP variants are generated.',
  },
  {
    id: 'zero-cloud-fees',
    category: 'safety',
    title: '100% Free & Open-Source (Zero Cloud Fees)',
    badge: 'GPLv2 / MIT',
    badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    hook: 'Self-Hosted Local Engine',
    description: 'No monthly credit caps, no third-party API subscriptions, no external tracking, and zero downtime risk from remote cloud APIs.',
    benefit: 'Converts unlimited images forever for $0. No surprise bills or image throttling.',
  },
];

export const WordPressPluginSection: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [pluginWebpEnabled, setPluginWebpEnabled] = useState(true);
  const [inspectorTab, setInspectorTab] = useState<'preview' | 'network' | 'dom' | 'library'>('preview');
  const [featureCategory, setFeatureCategory] = useState<'all' | 'engine' | 'frontend' | 'server' | 'safety'>('all');
  const [activeConfigTab, setActiveConfigTab] = useState<'htaccess' | 'nginx' | 'functions'>('htaccess');
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [loadKey, setLoadKey] = useState(0);

  // Simulated WordPress Admin Settings State
  const [adminQuality, setAdminQuality] = useState(82);
  const [adminThumbs, setAdminThumbs] = useState(true);
  const [adminStripExif, setAdminStripExif] = useState(true);
  const [adminLazyAsync, setAdminLazyAsync] = useState(true);
  const [adminDeliveryMode, setAdminDeliveryMode] = useState<'picture' | 'rewrite'>('picture');
  const [isSimulatingBulk, setIsSimulatingBulk] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);

  const htaccessSnippet = `# OptiWebP: Direct Apache Mod_Rewrite Engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  # Check if browser supports WebP
  RewriteCond %{HTTP_ACCEPT} image/webp
  # Check if WebP companion file exists on disk
  RewriteCond %{DOCUMENT_ROOT}/$1.webp -f
  # Serve WebP file directly with correct content-type
  RewriteRule (.+)\\.(jpe?g|png)$ $1.webp [T=image/webp,E=accept:1,L]
</IfModule>

<IfModule mod_headers.c>
  Header append Vary Accept env=REDIRECT_accept
</IfModule>`;

  const nginxSnippet = `# OptiWebP: Nginx High-Concurrency FastCGI & Proxy Rules
# Place inside http {} block:
map $http_accept $webp_suffix {
    default   "";
    "~*image/webp" ".webp";
}

# Place inside server {} block:
location ~* ^(/wp-content/uploads/.+)\\.(png|jpe?g)$ {
    add_header Vary Accept;
    add_header Cache-Control "public, max-age=31536000, immutable";
    try_files $1$webp_suffix $uri =404;
}`;

  const phpSnippet = `// OptiWebP: Core Performance Booster for functions.php
add_filter('wp_get_attachment_image_attributes', function($attr) {
    $attr['decoding'] = 'async';
    if (!isset($attr['loading'])) {
        $attr['loading'] = 'lazy';
    }
    return $attr;
});

// Cache-Control & WebP Content Negotiation Header
add_action('send_headers', function() {
    header('Vary: Accept');
});`;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadWordPressPluginZip();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleSimulateReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      setLoadKey((prev) => prev + 1);
      setIsReloading(false);
    }, 450);
  };

  const handleRunBulkSimulation = () => {
    if (isSimulatingBulk) return;
    setIsSimulatingBulk(true);
    setBulkProgress(0);

    const interval = setInterval(() => {
      setBulkProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulatingBulk(false);
          return 100;
        }
        return prev + 25;
      });
    }, 350);
  };

  const filteredFeatures = featureCategory === 'all'
    ? PLUGIN_FEATURES
    : PLUGIN_FEATURES.filter((f) => f.category === featureCategory);

  const sampleMedia = [
    {
      name: 'Optiweb_Penthouse.jpg',
      orig: '313 KB',
      webp: '123 KB',
      saved: '60.7%',
      format: 'JPEG → WEBP',
      ready: true,
    },
    {
      name: 'hero-banner.jpg',
      orig: '1.8 MB',
      webp: '280 KB',
      saved: '84.4%',
      format: 'JPEG → WEBP',
      ready: true,
    },
    {
      name: 'product-display.png',
      orig: '940 KB',
      webp: '165 KB',
      saved: '82.4%',
      format: 'PNG → WEBP',
      ready: true,
    },
    {
      name: 'logo-transparent.png',
      orig: '340 KB',
      webp: '48 KB',
      saved: '85.8%',
      format: 'PNG → WEBP (VP8L)',
      ready: true,
    },
  ];

  return (
    <section id="wordpress-plugin" className="w-full my-8 scroll-mt-20">
      <div className="bg-white dark:bg-[#11141b] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-10 shadow-xs transition-colors space-y-12">
        {/* Header & Download Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-neutral-100 dark:border-neutral-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80">
                <ShinyText speed={5} className="text-emerald-700 dark:text-emerald-400">
                  Every WordPress Feature Built-In · v2.4.0
                </ShinyText>
              </span>
              <span className="text-xs text-neutral-400">·</span>
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                WordPress 5.8 – 6.7+ Tested · PHP 7.4 – 8.3+
              </span>
              <span className="text-xs text-neutral-400">·</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                100% Free Forever
              </span>
            </div>

            <h2 className="typespace-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white">
              Every WordPress Feature Built-In · Live WebP Engine
            </h2>

            <p className="typespace-subhead text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
              Instantly converts uploads into next-generation WebP format, rewrites frontend markup into lightweight HTML5 <code className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-800 dark:text-neutral-200">&lt;picture&gt;</code> tags, and cuts page load times by up to 4× with zero cloud subscriptions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-xs hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.985] transition-all duration-200 cursor-pointer disabled:opacity-50 select-none"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
              <span>{isDownloading ? 'Packaging Plugin ZIP...' : 'Download Plugin (.zip)'}</span>
            </button>
          </div>
        </div>

        {/* Section 1: Live Interactive Plugin Simulation & Verification Lab */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-500" />
                <span>Live Website Verification Lab</span>
              </h3>
              <p className="typespace-subhead text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Toggle the master WebP switch below to experience real-time frontend image delivery, payload reduction, and network metrics.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-7 rounded-2xl bg-neutral-50 dark:bg-[#141822] border border-neutral-200/80 dark:border-neutral-800 space-y-6">
            {/* Master WebP Toggle Control Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c0e12] border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                    pluginWebpEnabled
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                  }`}
                >
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                      Serve Website Images as WebP
                    </h4>
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-semibold ${
                        pluginWebpEnabled
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                      }`}
                    >
                      {pluginWebpEnabled ? 'WEBP ACTIVE (HIGH-SPEED)' : 'WEBP PAUSED (LEGACY JPEG)'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 mt-1 leading-normal">
                    {pluginWebpEnabled
                      ? 'Active: The website is serving modern lightweight .webp images directly to visitors, accelerating page load speeds.'
                      : 'Paused: Serving original uncompressed JPEG images (higher network bandwidth and slower load times).'}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setPluginWebpEnabled(!pluginWebpEnabled)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    pluginWebpEnabled
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <span className="text-xs font-bold">
                    {pluginWebpEnabled ? 'WebP Enabled' : 'WebP Disabled'}
                  </span>
                  {pluginWebpEnabled ? (
                    <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-neutral-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Interactive Inspection Tabs */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-1.5 p-1 bg-neutral-200/70 dark:bg-neutral-800/80 rounded-xl text-xs font-medium">
                  <button
                    onClick={() => setInspectorTab('preview')}
                    className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      inspectorTab === 'preview'
                        ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Website Simulation</span>
                  </button>
                  <button
                    onClick={() => setInspectorTab('network')}
                    className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      inspectorTab === 'network'
                        ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Wifi className="w-3.5 h-3.5" />
                    <span>Network Waterfall & Headers</span>
                  </button>
                  <button
                    onClick={() => setInspectorTab('dom')}
                    className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      inspectorTab === 'dom'
                        ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>HTML & DOM Markup</span>
                  </button>
                  <button
                    onClick={() => setInspectorTab('library')}
                    className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      inspectorTab === 'library'
                        ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Media Library Stats</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateReload}
                  disabled={isReloading}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  title="Test how fast the website loads with the current WebP setting"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin' : ''}`} />
                  <span>Test Page Reload</span>
                </button>
              </div>

              {/* TAB 1: LIVE WEBSITE SIMULATION */}
              {inspectorTab === 'preview' && (
                <div className="space-y-4">
                  {/* Browser Frame */}
                  <div className="rounded-2xl border border-neutral-300 dark:border-neutral-700 overflow-hidden bg-white dark:bg-[#0c0e12] shadow-md">
                    {/* Browser Address Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-100 dark:bg-[#161a24] border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 w-full max-w-md justify-center">
                        <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>https://my-wordpress-site.com/luxury-penthouse</span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <span className="text-neutral-400">Load Time:</span>
                        <span className={`font-bold ${pluginWebpEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}`}>
                          {pluginWebpEnabled ? '38ms' : '142ms'}
                        </span>
                      </div>
                    </div>

                    {/* Website Content */}
                    <div className="p-6 sm:p-8 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1.5 font-mono">
                          <span>Architecture & Interiors</span>
                          <span>·</span>
                          <span>Published October 2026</span>
                        </div>
                        <h3 className="typespace-heading text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                          Modern Ocean Penthouse: Architectural Light & Form
                        </h3>
                      </div>

                      {/* Featured Image with Live Format Badges */}
                      <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                        <img
                          key={`demo-img-${pluginWebpEnabled}-${loadKey}`}
                          src={pluginWebpEnabled ? '/Optiweb.webp' : '/Optiweb.jpg'}
                          alt="Modern coastal penthouse living room"
                          className="w-full h-[320px] sm:h-[420px] object-cover transition-all"
                        />

                        {/* Floating Verification HUD Overlay */}
                        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 pointer-events-none">
                          <div
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold backdrop-blur-md shadow-md flex items-center gap-2 ${
                              pluginWebpEnabled
                                ? 'bg-emerald-950/85 text-emerald-300 border border-emerald-500/50'
                                : 'bg-neutral-950/85 text-amber-300 border border-amber-500/50'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full animate-pulse ${
                                pluginWebpEnabled ? 'bg-emerald-400' : 'bg-amber-400'
                              }`}
                            />
                            <span>
                              {pluginWebpEnabled
                                ? 'Delivering: Optiweb.webp (123 KB)'
                                : 'Delivering: Optiweb.jpg (313 KB)'}
                            </span>
                          </div>

                          <div className="px-2.5 py-1.5 rounded-lg text-xs font-mono bg-neutral-950/80 text-white backdrop-blur-md shadow-xs border border-neutral-700/60">
                            {pluginWebpEnabled ? '60.7% Bandwidth Saved' : '0% Saved (Original File)'}
                          </div>
                        </div>

                        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg text-xs font-mono bg-black/75 text-white backdrop-blur-md">
                          {pluginWebpEnabled ? (
                            <span className="flex items-center gap-1.5 text-emerald-300">
                              <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>3.7× Faster HTTP Transfer</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-amber-300">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>Uncompressed Payload</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Speed Benchmark Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                          <div className="text-xs text-neutral-500">Image Transfer Payload</div>
                          <div className="text-lg font-bold font-mono text-neutral-900 dark:text-white mt-1">
                            {pluginWebpEnabled ? '123 KB' : '313 KB'}
                          </div>
                          <div className={`text-xs font-mono mt-1 ${pluginWebpEnabled ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-neutral-400'}`}>
                            {pluginWebpEnabled ? '-190 KB (-60.7%)' : 'Full JPEG Weight'}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                          <div className="text-xs text-neutral-500">Network Latency (4G / 5G)</div>
                          <div className="text-lg font-bold font-mono text-neutral-900 dark:text-white mt-1">
                            {pluginWebpEnabled ? '38 ms' : '142 ms'}
                          </div>
                          <div className={`text-xs font-mono mt-1 ${pluginWebpEnabled ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-neutral-400'}`}>
                            {pluginWebpEnabled ? 'Instant LCP Render' : 'Noticeable Load Delay'}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                          <div className="text-xs text-neutral-500">Google Lighthouse Score</div>
                          <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                            {pluginWebpEnabled ? '99 / 100' : '78 / 100'}
                          </div>
                          <div className="text-xs font-mono text-neutral-500 mt-1">
                            {pluginWebpEnabled ? 'Passed Core Web Vitals' : 'Flagged: "Serve images in next-gen formats"'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: NETWORK WATERFALL & HEADERS */}
              {inspectorTab === 'network' && (
                <div className="p-6 rounded-2xl bg-neutral-900 text-neutral-200 font-mono text-xs space-y-5 overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-neutral-400 text-xs">
                    <span>HTTP Network Transaction Inspector</span>
                    <span>Browser: Chrome 134 / WebP Supported</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-emerald-400">Request URL:</span>{' '}
                      <span className="text-neutral-100">
                        https://my-wordpress-site.com/wp-content/uploads/
                        {pluginWebpEnabled ? 'Optiweb.webp' : 'Optiweb.jpg'}
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-400">Request Method:</span> GET · <span className="text-emerald-400">Status Code:</span>{' '}
                      <span className="text-emerald-300">200 OK (from disk cache)</span>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 space-y-1.5">
                      <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                        Response Headers
                      </div>
                      <div>
                        <span className="text-neutral-400">Content-Type:</span>{' '}
                        <span className={`font-bold ${pluginWebpEnabled ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {pluginWebpEnabled ? 'image/webp' : 'image/jpeg'}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400">Content-Length:</span>{' '}
                        <span>{pluginWebpEnabled ? '125,952 bytes (123 KB)' : '320,512 bytes (313 KB)'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400">Vary:</span> <span>Accept, Accept-Encoding</span>
                      </div>
                      <div>
                        <span className="text-neutral-400">Cache-Control:</span> <span>public, max-age=31536000, immutable</span>
                      </div>
                      <div>
                        <span className="text-neutral-400">X-OptiWebP-Optimization:</span>{' '}
                        <span className={pluginWebpEnabled ? 'text-emerald-400 font-bold' : 'text-neutral-500'}>
                          {pluginWebpEnabled ? 'ACTIVE (VP8 Stream Engine)' : 'BYPASS (Original Fallback)'}
                        </span>
                      </div>
                    </div>

                    {/* Waterfall timeline */}
                    <div className="pt-4 border-t border-neutral-800 space-y-2.5">
                      <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        Resource Waterfall Timeline
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-28 text-neutral-400 text-xs">DNS + Connect:</span>
                        <div className="h-2 bg-neutral-700 rounded w-8" />
                        <span className="text-xs text-neutral-400">8ms</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-28 text-neutral-400 text-xs">TTFB:</span>
                        <div className="h-2 bg-neutral-600 rounded w-12" />
                        <span className="text-xs text-neutral-400">14ms</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-28 text-neutral-400 text-xs">Download:</span>
                        <div
                          className={`h-2 rounded transition-all duration-300 ${
                            pluginWebpEnabled ? 'w-16 bg-emerald-500' : 'w-48 bg-amber-500'
                          }`}
                        />
                        <span className={`text-xs font-bold ${pluginWebpEnabled ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {pluginWebpEnabled ? '16ms (Instant)' : '120ms (Waiting for transfer)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DOM / HTML MARKUP INSPECTOR */}
              {inspectorTab === 'dom' && (
                <div className="p-6 rounded-2xl bg-neutral-900 text-neutral-200 font-mono text-xs space-y-5 overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-neutral-400 text-xs">
                    <span>WordPress Generated Front-End HTML Markup</span>
                    <span className="text-emerald-400">Filter: the_content / wp_get_attachment_image</span>
                  </div>

                  {pluginWebpEnabled ? (
                    <pre className="text-emerald-300 leading-relaxed overflow-x-auto text-xs">
{`<!-- OptiWebP: Native Picture Tag with WebP Source & Legacy Fallback -->
<picture class="wp-block-image size-full">
  <source srcset="https://my-site.com/wp-content/uploads/Optiweb.webp" type="image/webp">
  <img 
    src="https://my-site.com/wp-content/uploads/Optiweb.jpg" 
    alt="Modern Ocean Penthouse" 
    width="1600" 
    height="1067" 
    loading="lazy" 
    decoding="async" 
    fetchpriority="high"
    class="wp-image-482"
  >
</picture>`}
                    </pre>
                  ) : (
                    <pre className="text-amber-300 leading-relaxed overflow-x-auto text-xs">
{`<!-- WebP Delivery Disabled: Standard Uncompressed Image Tag -->
<figure class="wp-block-image size-full">
  <img 
    src="https://my-site.com/wp-content/uploads/Optiweb.jpg" 
    alt="Modern Ocean Penthouse" 
    width="1600" 
    height="1067" 
    class="wp-image-482"
  >
</figure>`}
                    </pre>
                  )}

                  <div className="p-4 rounded-xl bg-neutral-800 text-xs text-neutral-300 space-y-1.5 leading-relaxed">
                    <div className="font-bold text-white">How this works on WordPress:</div>
                    <p>
                      When WebP is enabled, the plugin automatically wraps image elements inside high-efficiency HTML5 <code className="text-emerald-400">&lt;picture&gt;</code> elements. Browsers that support WebP (99.2% of web traffic worldwide) instantly load the lightweight WebP format. Older browsers seamlessly fall back to the original file with zero broken links.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: MEDIA LIBRARY TABLE */}
              {inspectorTab === 'library' && (
                <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0e12]">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 text-xs font-semibold bg-neutral-50 dark:bg-neutral-800/40">
                        <th className="py-3 px-4">Filename</th>
                        <th className="py-3 px-3">Original Size</th>
                        <th className="py-3 px-3">WebP Size</th>
                        <th className="py-3 px-3">Savings</th>
                        <th className="py-3 px-4 text-right">Website Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                      {sampleMedia.map((item, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/30">
                          <td className="py-3 px-4 font-medium text-neutral-900 dark:text-white">
                            {item.name}
                          </td>
                          <td className="py-3 px-3 font-mono text-neutral-500">{item.orig}</td>
                          <td className="py-3 px-3 font-mono font-medium text-neutral-800 dark:text-neutral-200">
                            {pluginWebpEnabled ? item.webp : '—'}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {pluginWebpEnabled ? `-${item.saved}` : '0%'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {pluginWebpEnabled ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                Serving WebP
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
                                Serving Original
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Interactive Simulated WordPress Admin Settings Screen */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-emerald-500" />
                <span>WordPress Admin Settings Dashboard (Live Preview)</span>
              </h3>
              <p className="typespace-subhead text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                This is the exact settings interface installed into your WordPress admin menu under <strong className="text-neutral-800 dark:text-neutral-200">Settings → OptiWebP</strong>. Try tweaking the controls:
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-300 dark:border-neutral-700 overflow-hidden bg-white dark:bg-[#0c0e12] shadow-sm">
            {/* WP Admin Top Bar Mock */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#1d2327] text-white text-xs">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[11px]">W</span>
                <span className="font-semibold">My WordPress Site</span>
                <span className="text-neutral-400">›</span>
                <span className="text-neutral-300">Settings</span>
                <span className="text-neutral-400">›</span>
                <span className="text-emerald-400 font-semibold">OptiWebP Image Optimizer</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">Version 2.4.0</span>
            </div>

            {/* WP Admin Settings Form */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Core Controls */}
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block mb-1">
                      WebP Delivery Engine
                    </label>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                      Choose how your WordPress frontend replaces standard images with WebP.
                    </p>

                    <div className="space-y-2">
                      <label className="flex items-start gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryMode"
                          checked={adminDeliveryMode === 'picture'}
                          onChange={() => setAdminDeliveryMode('picture')}
                          className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <div className="text-xs font-bold text-neutral-900 dark:text-white">
                            HTML5 &lt;picture&gt; Tag Rewriting (Recommended)
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            Replaces &lt;img&gt; with &lt;picture&gt; and &lt;source&gt;. Works seamlessly across all CDNs and server types.
                          </div>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryMode"
                          checked={adminDeliveryMode === 'rewrite'}
                          onChange={() => setAdminDeliveryMode('rewrite')}
                          className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <div className="text-xs font-bold text-neutral-900 dark:text-white">
                            Direct Server Rewrite (.htaccess / Nginx)
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            Rewrites image URLs transparently on the web server level. 0ms PHP execution overhead.
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Quality Slider */}
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-900 dark:text-white">
                        Compression Quality Factor
                      </label>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {adminQuality}% (Recommended: 82%)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={adminQuality}
                      onChange={(e) => setAdminQuality(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                      <span>50% (Max Compression)</span>
                      <span>82% (Sweet Spot)</span>
                      <span>100% (Lossless)</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Toggles & Bulk Optimizer */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider block mb-2">
                      Optimization Options
                    </label>

                    <div className="space-y-2.5">
                      <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer">
                        <div>
                          <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                            Convert All Theme Thumbnail Sizes
                          </div>
                          <div className="text-[11px] text-neutral-500">
                            Generates WebP variants for all registered WordPress responsive image crops.
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={adminThumbs}
                          onChange={(e) => setAdminThumbs(e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer">
                        <div>
                          <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                            Strip EXIF & GPS Metadata
                          </div>
                          <div className="text-[11px] text-neutral-500">
                            Removes camera geolocation data to protect privacy and shave extra KB.
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={adminStripExif}
                          onChange={(e) => setAdminStripExif(e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer">
                        <div>
                          <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                            Enforce Native Lazy-Loading & Async Decoding
                          </div>
                          <div className="text-[11px] text-neutral-500">
                            Adds loading="lazy" & decoding="async" to eliminate layout shifts and pass LCP.
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={adminLazyAsync}
                          onChange={(e) => setAdminLazyAsync(e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Bulk Optimizer Interactive Simulation */}
                  <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FolderArchive className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold">Existing Media Library Bulk Optimizer</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {isSimulatingBulk ? `${bulkProgress}%` : 'Ready'}
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-300 leading-normal">
                      Scan all previously uploaded media attachments and generate WebP companions in batch mode without re-uploading.
                    </p>

                    {isSimulatingBulk && (
                      <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${bulkProgress}%` }}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-mono text-neutral-400">
                        {isSimulatingBulk ? `Optimizing image ${bulkProgress / 25} of 4...` : '4 images detected in media library'}
                      </span>
                      <button
                        type="button"
                        onClick={handleRunBulkSimulation}
                        disabled={isSimulatingBulk}
                        className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isSimulatingBulk ? 'Processing...' : 'Run Bulk Optimize'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Comprehensive Plugin Feature Matrix (All 14 Features Showcase) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                  Complete Feature Suite
                </span>
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  · 14 Built-in Capabilities
                </span>
              </div>
              <h3 className="typespace-heading text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                Every WordPress Feature Built-In
              </h3>
              <p className="typespace-subhead text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl">
                Unlike freemium plugins that lock essential thumbnail support or bulk optimization behind paywalls, OptiWebP includes all 14 features completely free.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl text-xs font-medium self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setFeatureCategory('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  featureCategory === 'all'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                All (14)
              </button>
              <button
                type="button"
                onClick={() => setFeatureCategory('engine')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  featureCategory === 'engine'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Engine & Compression
              </button>
              <button
                type="button"
                onClick={() => setFeatureCategory('frontend')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  featureCategory === 'frontend'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Frontend & SEO
              </button>
              <button
                type="button"
                onClick={() => setFeatureCategory('server')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  featureCategory === 'server'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Server & CDN
              </button>
              <button
                type="button"
                onClick={() => setFeatureCategory('safety')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  featureCategory === 'safety'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Safety & Privacy
              </button>
            </div>
          </div>

          {/* Feature Grid with comfortable readable typography */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeatures.map((feat) => (
              <div
                key={feat.id}
                className="p-5 rounded-2xl bg-neutral-50/70 dark:bg-[#141822]/70 border border-neutral-200/90 dark:border-neutral-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-200 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md border ${feat.badgeColor}`}>
                      {feat.badge}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-200/60 dark:bg-neutral-800 px-2 py-0.5 rounded">
                      {feat.hook}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight pt-1">
                    {feat.title}
                  </h4>

                  <p className="typespace-subhead text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/80">
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{feat.benefit}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Server Acceleration & Code Snippets (.htaccess, Nginx, functions.php) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-500" />
                <span>Zero-Overhead Server Delivery Snippets</span>
              </h3>
              <p className="typespace-subhead text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                For maximum speed, OptiWebP provides static rewrite rules for Apache and Nginx to deliver WebP files without waking up PHP.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleCopyCode(
                activeConfigTab === 'htaccess'
                  ? htaccessSnippet
                  : activeConfigTab === 'nginx'
                  ? nginxSnippet
                  : phpSnippet
              )}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
            >
              {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet ? 'Copied to Clipboard!' : 'Copy Active Snippet'}</span>
            </button>
          </div>

          <div className="rounded-2xl border border-neutral-300 dark:border-neutral-700 overflow-hidden bg-neutral-900 text-neutral-200 font-mono text-xs shadow-sm">
            {/* Tab Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-950 border-b border-neutral-800">
              <button
                type="button"
                onClick={() => setActiveConfigTab('htaccess')}
                className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  activeConfigTab === 'htaccess'
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Apache (.htaccess)
              </button>
              <button
                type="button"
                onClick={() => setActiveConfigTab('nginx')}
                className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  activeConfigTab === 'nginx'
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Nginx (nginx.conf)
              </button>
              <button
                type="button"
                onClick={() => setActiveConfigTab('functions')}
                className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  activeConfigTab === 'functions'
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Theme functions.php
              </button>
            </div>

            {/* Code Content */}
            <div className="p-5 overflow-x-auto">
              <pre className="text-emerald-300 leading-relaxed text-xs">
                {activeConfigTab === 'htaccess' && htaccessSnippet}
                {activeConfigTab === 'nginx' && nginxSnippet}
                {activeConfigTab === 'functions' && phpSnippet}
              </pre>
            </div>
          </div>
        </div>

        {/* Section 5: Why OptiWebP Outperforms Paid Plugins */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 border border-emerald-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <span>Why OptiWebP is Better Than Subscription Plugins</span>
              </h4>
              <p className="typespace-subhead text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-2xl">
                Compare OptiWebP to competitors like TinyPNG, Smush Pro, and ShortPixel:
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
            >
              Get OptiWebP Free (.zip)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c0e12] border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white">
                <Coins className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>$0 Forever vs $9–$39/mo</span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Never hit monthly compression quotas or buy credit packs for multi-size thumbnails.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c0e12] border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% On-Server Privacy</span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Your high-res media is never uploaded to remote third-party servers. 100% GDPR compliant.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c0e12] border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white">
                <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Dual Browser & Server Mode</span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Use the web converter for instant client-side drops, or use the WordPress plugin for automated site-wide delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
