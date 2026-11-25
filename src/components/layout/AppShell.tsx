import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Award,
  BarChart3,
  Bell,
  Bookmark,
  BookMarked,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  Headphones,
  Info,
  Layers,
  LayoutDashboard,
  Menu,
  Mic,
  Moon,
  PenLine,
  Search,
  Settings,
  Sparkles,
  Sun,
  Target,
  X,
} from 'lucide-react';
import { CEFRLevel, NavPage, ThemeMode } from '../../types/learning';
import { UILanguage } from '../../types/progress';
import { BRAND_NAME, BRAND_TAGLINE } from '../../utils/brandLabels';
import { NAV_TRANSLATIONS, UI_TEXT } from '../../utils/translations';
import { CerdeutschBrandMark, GermanFlagMark } from '../ui/TouchFlowPrimitives';

export interface NavItemConfig {
  id: NavPage;
  icon: React.ComponentType<{ className?: string }>;
  section: 'primary' | 'secondary';
}

export const SIDEBAR_NAV_ITEMS: NavItemConfig[] = [
  { id: 'startseite', icon: LayoutDashboard, section: 'primary' },
  { id: 'a0', icon: Sparkles, section: 'primary' },
  { id: 'lernen', icon: GraduationCap, section: 'primary' },
  { id: 'pruefung', icon: Award, section: 'primary' },
  { id: 'lesen', icon: BookOpen, section: 'primary' },
  { id: 'hoeren', icon: Headphones, section: 'primary' },
  { id: 'sprechen', icon: Mic, section: 'primary' },
  { id: 'schreiben', icon: PenLine, section: 'primary' },
  { id: 'grammatik', icon: Layers, section: 'primary' },
  { id: 'wortschatz', icon: BookMarked, section: 'primary' },
  { id: 'fortschritt', icon: BarChart3, section: 'primary' },
  { id: 'einstellungen', icon: Settings, section: 'primary' },
  { id: 'fehleranalyse', icon: AlertCircle, section: 'secondary' },
  { id: 'sammlung', icon: Bookmark, section: 'secondary' },
  { id: 'suche', icon: Search, section: 'secondary' },
  { id: 'ueber', icon: Info, section: 'secondary' },
];

interface AppShellProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  breadcrumb: string[];
  pageTitle: string;
  currentLevel: CEFRLevel;
  overallPercent?: number;
  openMistakesCount?: number;
  dueFlashcardsCount?: number;
  hasUnfinishedExam?: boolean;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
  uiLanguage?: UILanguage;
  onToggleUiLanguage?: (lang: UILanguage) => void;
  onSearchSubmit?: (query: string) => void;
  onQuickStartLesson: () => void;
  children: React.ReactNode;
}

export function AppShell({
  activePage,
  onNavigate,
  breadcrumb,
  pageTitle,
  currentLevel,
  overallPercent = 0,
  openMistakesCount = 0,
  dueFlashcardsCount = 0,
  hasUnfinishedExam = false,
  theme = 'light',
  onToggleTheme,
  uiLanguage = 'id',
  onToggleUiLanguage,
  onSearchSubmit,
  onQuickStartLesson,
  children,
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [headerQuery, setHeaderQuery] = useState('');
  const notificationRef = useRef<HTMLDivElement>(null);

  const t = UI_TEXT[uiLanguage];
  const navTexts = NAV_TRANSLATIONS[uiLanguage];

  const primaryNav = SIDEBAR_NAV_ITEMS.filter((item) => item.section === 'primary');
  const secondaryNav = SIDEBAR_NAV_ITEMS.filter((item) => item.section === 'secondary');

  const notificationCount =
    (openMistakesCount > 0 ? 1 : 0) +
    (dueFlashcardsCount > 0 ? 1 : 0) +
    (hasUnfinishedExam ? 1 : 0);

  useEffect(() => {
    if (!notificationsOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNotificationsOpen(false);
    };
    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [notificationsOpen]);

  const isNavActive = (itemId: NavPage) => {
    if (itemId === 'lernen' && activePage === 'lernen-detail') return true;
    if (itemId === 'pruefung' && activePage === 'pruefung-detail') return true;
    return activePage === itemId;
  };

  const handleMobileNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleTopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(headerQuery.trim());
    } else {
      onNavigate('suche');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1917] dark:bg-[#141312] dark:text-[#F5F2EB] flex flex-col lg:flex-row">
      {/* Desktop Left Sidebar */}
      <aside
        aria-label="Hauptnavigation"
        className={`hidden lg:flex flex-col shrink-0 sticky top-0 h-screen bg-[#F6F2EA] dark:bg-[#1A1816] border-r border-[#E6E0D4] dark:border-[#2E2A25] transition-all duration-200 ${
          sidebarCollapsed ? 'w-[84px]' : 'w-[258px]'
        }`}
      >
        {/* Brand Block */}
        <div className="px-4 pt-3.5 pb-3 flex items-start justify-between gap-2 border-b border-[#EAE4D9] dark:border-[#2E2A25]">
          <button
            type="button"
            onClick={() => onNavigate('startseite')}
            aria-label="Beranda Cerdeutsch"
            className="flex flex-col items-start text-left rounded-xl px-1.5 py-0.5 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/20 overflow-hidden"
          >
            <div className="flex items-center gap-2.5">
              <CerdeutschBrandMark className="w-8 h-5" />
              {!sidebarCollapsed && (
                <span className="font-display text-[17px] font-bold tracking-tight text-[#1C1917] dark:text-[#F5F2EB] whitespace-nowrap">
                  {BRAND_NAME}
                </span>
              )}
            </div>
            {!sidebarCollapsed && (
              <span className="text-[11px] font-medium text-[#6B6560] dark:text-[#A8A095] mt-0.5 pl-0.5 leading-snug">
                {BRAND_TAGLINE}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            aria-label={sidebarCollapsed ? 'Perluas bilah samping' : 'Ciutkan bilah samping'}
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-[#6B6560] hover:bg-[#EAE3D5] hover:text-[#1C1917] dark:text-[#A8A095] dark:hover:bg-[#262320] dark:hover:text-[#F5F2EB] transition-colors cursor-pointer shrink-0"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(item.id);
            const navMeta = navTexts[item.id] || { primaryLabel: item.id };
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? 'page' : undefined}
                title={sidebarCollapsed ? `${navMeta.primaryLabel} ${navMeta.subLabel ? `(${navMeta.subLabel})` : ''}` : undefined}
                className={`w-full flex items-center gap-3 min-h-[42px] px-3.5 py-1.5 rounded-xl text-left transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/20 ${
                  active
                    ? 'bg-[#B91C1C] text-white shadow-[0_2px_6px_rgba(185,28,28,0.22)] dark:bg-[#DC2626]'
                    : 'text-[#3F3A35] hover:bg-[#ECE6DA] hover:text-[#1C1917] dark:text-[#D1CBC2] dark:hover:bg-[#262320] dark:hover:text-[#F5F2EB]'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    active ? 'text-white' : 'text-[#6B6560] dark:text-[#9E968C]'
                  }`}
                />
                {!sidebarCollapsed && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13.5px] font-semibold truncate leading-tight">
                      {navMeta.primaryLabel}
                    </span>
                    {uiLanguage === 'id' && navMeta.subLabel && (
                      <span className={`text-[11px] truncate leading-tight mt-0.5 ${active ? 'text-white/80' : 'text-[#877E73] dark:text-[#9E968C]'}`}>
                        {navMeta.subLabel}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-[#E6E0D4] dark:border-[#2E2A25] space-y-0.5">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const active = isNavActive(item.id);
              const navMeta = navTexts[item.id] || { primaryLabel: item.id };
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={active ? 'page' : undefined}
                  title={sidebarCollapsed ? `${navMeta.primaryLabel} ${navMeta.subLabel ? `(${navMeta.subLabel})` : ''}` : undefined}
                  className={`w-full flex items-center gap-3 min-h-[38px] px-3.5 py-1.5 rounded-xl text-left transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/20 ${
                    active
                      ? 'bg-[#B91C1C] text-white shadow-[0_2px_6px_rgba(185,28,28,0.22)] dark:bg-[#DC2626]'
                      : 'text-[#6B6560] hover:bg-[#ECE6DA] hover:text-[#1C1917] dark:text-[#A8A095] dark:hover:bg-[#262320] dark:hover:text-[#F5F2EB]'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon
                    className={`w-[16px] h-[16px] shrink-0 ${
                      active ? 'text-white' : 'text-[#7C756D] dark:text-[#9E968C]'
                    }`}
                  />
                  {!sidebarCollapsed && (
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-medium truncate leading-tight">
                        {navMeta.primaryLabel}
                      </span>
                      {uiLanguage === 'id' && navMeta.subLabel && (
                        <span className={`text-[10.5px] truncate leading-tight mt-0.5 ${active ? 'text-white/80' : 'text-[#877E73] dark:text-[#9E968C]'}`}>
                          {navMeta.subLabel}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Warm Ivory Goal Card */}
        {!sidebarCollapsed && (
          <div className="p-2.5 border-t border-[#EAE4D9] dark:border-[#2E2A25]">
            <button
              type="button"
              onClick={() => onNavigate('fortschritt')}
              className="w-full text-left rounded-2xl bg-[#FAF2DF] hover:bg-[#F6EBD0] dark:bg-[#252017] dark:hover:bg-[#2D271C] border border-[#EADBC0] dark:border-[#3A3122] p-3 transition-colors cursor-pointer space-y-2"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-white/85 dark:bg-[#332B1D] text-[#B91C1C] dark:text-[#F59E0B] flex items-center justify-center shrink-0 border border-[#EADBC0]/80 dark:border-[#473C29]">
                  <Target className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-[#6B6560] dark:text-[#B5AEA5]">
                    Target Anda:
                  </p>
                  <p className="text-[13px] font-bold text-[#1C1917] dark:text-[#F5F2EB] leading-snug">
                    Persiapan Ujian {currentLevel}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="w-full h-1.5 rounded-full bg-[#E8DEC8] dark:bg-[#3A3122] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#B91C1C] dark:bg-[#DC2626] transition-all duration-300"
                    style={{ width: `${Math.max(4, Math.min(100, overallPercent))}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
                  <span>Terus semangat!</span>
                  <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                    {overallPercent}%
                  </span>
                </div>
              </div>
            </button>
          </div>
        )}
      </aside>

      {/* Main Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Desktop Minimal Top Bar */}
        <header className="hidden lg:flex items-center justify-between gap-6 h-16 px-8 sticky top-0 z-20 bg-[#FAF8F4]/95 dark:bg-[#141312]/95 backdrop-blur-md border-b border-[#E6E0D4] dark:border-[#2E2A25]">
          <form onSubmit={handleTopSearchSubmit} className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-[#7C756D] dark:text-[#9E968C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <label htmlFor="topbar-search" className="sr-only">
              Cari pelajaran dan latihan
            </label>
            <input
              id="topbar-search"
              type="search"
              value={headerQuery}
              onChange={(e) => setHeaderQuery(e.target.value)}
              placeholder="Cari pelajaran, latihan, kosakata ..."
              className="w-full min-h-[42px] pl-10 pr-4 rounded-full border border-[#E6E0D4] dark:border-[#2E2A25] bg-[#F3EFE6]/70 dark:bg-[#1F1D1A] text-[14px] text-[#1C1917] dark:text-[#F5F2EB] placeholder:text-[#7C756D] dark:placeholder:text-[#8E867C] focus:bg-white dark:focus:bg-[#262320] focus:border-[#B91C1C] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/10 transition-colors"
            />
          </form>

          <div className="flex items-center gap-2.5 shrink-0">
            {activePage !== 'startseite' && (
              <nav
                aria-label="Brotkrümel"
                className="hidden xl:flex items-center gap-1.5 text-[12px] text-[#6B6560] dark:text-[#A8A095] mr-2 max-w-[300px] truncate"
              >
                {breadcrumb.slice(1).map((part, index) => (
                  <React.Fragment key={`${part}-${index}`}>
                    {index > 0 && <span aria-hidden="true">/</span>}
                    <span className="truncate font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                      {part}
                    </span>
                  </React.Fragment>
                ))}
              </nav>
            )}

            {/* Notifications Popover */}
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen((prev) => !prev)}
                aria-expanded={notificationsOpen}
                aria-label={`Pemberitahuan belajar (${notificationCount})`}
                className="relative min-w-[42px] min-h-[42px] flex items-center justify-center rounded-full border border-[#E6E0D4] dark:border-[#2E2A25] bg-white dark:bg-[#1F1D1A] text-[#4B453F] dark:text-[#D1CBC2] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer"
              >
                <Bell className="w-[18px] h-[18px]" />
                {notificationCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#B91C1C] ring-2 ring-white dark:ring-[#1F1D1A]"
                  />
                )}
              </button>

              {notificationsOpen && (
                <div
                  role="dialog"
                  aria-label="Pemberitahuan belajar"
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_12px_32px_rgba(28,25,23,0.12)] p-3 space-y-2 z-40"
                >
                  <div className="flex items-center justify-between px-1.5 py-1 border-b border-[#EFEAE0] dark:border-[#2E2A25]">
                    <span className="text-[13px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {t.notifications}
                    </span>
                    <span className="text-[11px] font-medium text-[#6B6560] dark:text-[#A8A095] tabular-nums">
                      {notificationCount} {uiLanguage === 'id' ? 'aktif' : 'aktiv'}
                    </span>
                  </div>

                  {notificationCount === 0 ? (
                    <p className="text-[13px] text-[#6B6560] dark:text-[#B5AEA5] px-2 py-3 text-center">
                      {t.noPendingTasks}
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {hasUnfinishedExam && (
                        <button
                          type="button"
                          onClick={() => {
                            setNotificationsOpen(false);
                            onNavigate('pruefung');
                          }}
                          className="w-full text-left p-2.5 rounded-xl bg-[#FDF2F2] hover:bg-[#FCE7E7] dark:bg-[#2C1A19] dark:hover:bg-[#38201E] transition-colors cursor-pointer flex items-start gap-2.5"
                        >
                          <Clock className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                              {t.resumeExam}
                            </p>
                            <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
                              {t.resumeExamSub}
                            </p>
                          </div>
                        </button>
                      )}
                      {openMistakesCount > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setNotificationsOpen(false);
                            onNavigate('fehleranalyse');
                          }}
                          className="w-full text-left p-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#F3EFE6] dark:bg-[#262320] dark:hover:bg-[#312D28] transition-colors cursor-pointer flex items-start gap-2.5"
                        >
                          <AlertCircle className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                              {t.reviewMistakes}
                            </p>
                            <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
                              {t.reviewMistakesSub(openMistakesCount)}
                            </p>
                          </div>
                        </button>
                      )}
                      {dueFlashcardsCount > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setNotificationsOpen(false);
                            onNavigate('wortschatz');
                          }}
                          className="w-full text-left p-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#F3EFE6] dark:bg-[#262320] dark:hover:bg-[#312D28] transition-colors cursor-pointer flex items-start gap-2.5"
                        >
                          <Layers className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                              {t.dueCards}
                            </p>
                            <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
                              {t.dueCardsSub(dueFlashcardsCount)}
                            </p>
                          </div>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Language Switcher Toggle (ID / DE) */}
            {onToggleUiLanguage && (
              <div
                role="group"
                aria-label={t.navLanguageToggle}
                className="flex items-center bg-[#EFEAE0] dark:bg-[#262320] p-1 rounded-full border border-[#E6E0D4] dark:border-[#3A352F]"
              >
                <button
                  type="button"
                  onClick={() => onToggleUiLanguage('id')}
                  aria-pressed={uiLanguage === 'id'}
                  title={t.navLanguageIdTooltip}
                  className={`min-h-[32px] px-2.5 rounded-full text-[12px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    uiLanguage === 'id'
                      ? 'bg-white dark:bg-[#1F1D1A] text-[#B91C1C] dark:text-[#FCA5A5] shadow-xs'
                      : 'text-[#6B6560] hover:text-[#1C1917] dark:text-[#A8A095] dark:hover:text-[#F5F2EB]'
                  }`}
                >
                  <span>🇮🇩 ID</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleUiLanguage('de')}
                  aria-pressed={uiLanguage === 'de'}
                  title={t.navLanguageDeTooltip}
                  className={`min-h-[32px] px-2.5 rounded-full text-[12px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    uiLanguage === 'de'
                      ? 'bg-white dark:bg-[#1F1D1A] text-[#B91C1C] dark:text-[#FCA5A5] shadow-xs'
                      : 'text-[#6B6560] hover:text-[#1C1917] dark:text-[#A8A095] dark:hover:text-[#F5F2EB]'
                  }`}
                >
                  <span>🇩🇪 DE</span>
                </button>
              </div>
            )}

            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={
                  theme === 'dark' ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'
                }
                className="min-w-[42px] min-h-[42px] flex items-center justify-center rounded-full border border-[#E6E0D4] dark:border-[#2E2A25] bg-white dark:bg-[#1F1D1A] text-[#4B453F] dark:text-[#D1CBC2] hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-[18px] h-[18px]" />
                ) : (
                  <Moon className="w-[18px] h-[18px]" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigate('lernen')}
              className="min-h-[42px] px-3.5 rounded-full border border-[#E6E0D4] dark:border-[#2E2A25] bg-white dark:bg-[#1F1D1A] text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] hover:border-[#B91C1C] inline-flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap tabular-nums"
            >
              <GermanFlagMark />
              <span>{t.levelTitle(currentLevel)}</span>
            </button>

            {activePage !== 'startseite' && (
              <button
                type="button"
                onClick={onQuickStartLesson}
                className="min-h-[42px] px-4 rounded-full bg-[#B91C1C] hover:bg-[#991B1B] text-white text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                {t.quickStart}
              </button>
            )}
          </div>
        </header>

        {/* Mobile Compact Top Header (52px) */}
        <header className="lg:hidden sticky top-0 z-30 h-[52px] px-3 flex items-center justify-between bg-[#FAF8F4]/95 dark:bg-[#141312]/95 backdrop-blur-md border-b border-[#E6E0D4] dark:border-[#2E2A25]">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka menu navigasi"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#1C1917] hover:bg-[#EFEAE0] dark:text-[#F5F2EB] dark:hover:bg-[#262320] cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 min-w-0 px-2">
            <CerdeutschBrandMark className="w-6 h-4" />
            <span className="font-display text-[15px] font-bold text-[#1C1917] dark:text-[#F5F2EB] truncate">
              {pageTitle}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleUiLanguage && (
              <div
                role="group"
                aria-label={t.navLanguageToggle}
                className="flex items-center bg-[#EFEAE0] dark:bg-[#262320] p-0.5 rounded-full border border-[#E6E0D4] dark:border-[#3A352F]"
              >
                <button
                  type="button"
                  onClick={() => onToggleUiLanguage('id')}
                  aria-pressed={uiLanguage === 'id'}
                  className={`min-h-[28px] px-2 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    uiLanguage === 'id'
                      ? 'bg-white dark:bg-[#1F1D1A] text-[#B91C1C] dark:text-[#FCA5A5] shadow-xs'
                      : 'text-[#6B6560] dark:text-[#A8A095]'
                  }`}
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => onToggleUiLanguage('de')}
                  aria-pressed={uiLanguage === 'de'}
                  className={`min-h-[28px] px-2 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    uiLanguage === 'de'
                      ? 'bg-white dark:bg-[#1F1D1A] text-[#B91C1C] dark:text-[#FCA5A5] shadow-xs'
                      : 'text-[#6B6560] dark:text-[#A8A095]'
                  }`}
                >
                  DE
                </button>
              </div>
            )}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={
                  theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'
                }
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-[#4B453F] dark:text-[#D1CBC2] hover:bg-[#EFEAE0] dark:hover:bg-[#262320] cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={() => onNavigate('lernen')}
              aria-label={`Ubah tingkat saat ini ${currentLevel}`}
              className="min-w-[42px] min-h-[40px] px-2.5 flex items-center justify-center rounded-xl text-[12px] font-bold text-[#B91C1C] bg-[#FDF2F2] border border-[#EED8D2] dark:bg-[#2C1A19] dark:text-[#FCA5A5] dark:border-[#4A2624] tabular-nums cursor-pointer"
            >
              {currentLevel}
            </button>
          </div>
        </header>

        {/* Main Scrollable Viewport */}
        <main className="flex-1 w-full max-w-[1220px] mx-auto px-[18px] sm:px-6 lg:px-8 py-6 pb-[88px] lg:pb-10">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (60px) */}
      <nav
        aria-label="Navigasi utama seluler"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 h-[60px] pb-safe bg-[#FAF8F4]/95 dark:bg-[#1A1816]/95 backdrop-blur-md border-t border-[#E6E0D4] dark:border-[#2E2A25] grid grid-cols-5 items-center px-1"
      >
        {[
          { id: 'startseite' as NavPage, icon: LayoutDashboard },
          { id: 'lernen' as NavPage, icon: GraduationCap },
          { id: 'pruefung' as NavPage, icon: Award },
          { id: 'fortschritt' as NavPage, icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = isNavActive(tab.id);
          const navMeta = navTexts[tab.id] || { primaryLabel: tab.id };
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 rounded-xl transition-colors cursor-pointer ${
                active
                  ? 'text-[#B91C1C] dark:text-[#EF4444]'
                  : 'text-[#6B6560] dark:text-[#A8A095]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-semibold leading-4 mt-0.5 whitespace-nowrap">
                {navMeta.primaryLabel}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-expanded={mobileMenuOpen}
          aria-label={uiLanguage === 'id' ? 'Tampilkan semua menu' : 'Alle Menüs anzeigen'}
          className="flex flex-col items-center justify-center min-h-[44px] py-1 rounded-xl text-[#6B6560] dark:text-[#A8A095] cursor-pointer"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[11px] font-semibold leading-4 mt-0.5 whitespace-nowrap">
            {uiLanguage === 'id' ? 'Lainnya' : 'Mehr'}
          </span>
        </button>
      </nav>

      {/* Mobile Full Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex items-end bg-[#1C1917]/45 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Semua menu navigasi"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false);
          }}
        >
          <div className="w-full max-h-[86vh] bg-[#FAF8F4] dark:bg-[#1A1816] rounded-t-3xl shadow-[0_12px_32px_rgba(28,25,23,0.2)] flex flex-col overflow-hidden border-t border-[#E6E0D4] dark:border-[#2E2A25]">
            <div className="flex justify-center pt-3 pb-1">
              <span
                className="w-10 h-1.5 rounded-full bg-[#D8D0C3] dark:bg-[#3A352F]"
                aria-hidden="true"
              />
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#E6E0D4] dark:border-[#2E2A25]">
              <div className="flex items-center gap-2.5">
                <CerdeutschBrandMark className="w-7 h-4" />
                <span className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  {BRAND_NAME}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Tutup menu"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#6B6560] hover:bg-[#EFEAE0] dark:text-[#B5AEA5] dark:hover:bg-[#262320] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4 pb-safe space-y-1">
              {SIDEBAR_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isNavActive(item.id);
                const navMeta = navTexts[item.id] || { primaryLabel: item.id };
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMobileNavClick(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`w-full flex items-center justify-between min-h-[48px] px-4 rounded-xl text-[15px] font-medium transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#B91C1C] text-white dark:bg-[#DC2626]'
                        : 'text-[#1C1917] hover:bg-[#EFEAE0] dark:text-[#F5F2EB] dark:hover:bg-[#262320]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{navMeta.primaryLabel}</span>
                    </div>
                    {uiLanguage === 'id' && navMeta.subLabel && (
                      <span className={`text-[12px] ${active ? 'text-white/80' : 'text-[#877E73] dark:text-[#9E968C]'}`}>
                        {navMeta.subLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
