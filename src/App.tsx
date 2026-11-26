/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { OnboardingModal, OnboardingResult } from './components/onboarding/OnboardingModal';
import { LernenView } from './components/views/LernenView';
import { StartseiteView } from './components/views/StartseiteView';

const ExerciseRunner = React.lazy(() =>
  import('./components/engine/ExerciseRunner').then((m) => ({ default: m.ExerciseRunner })),
);
const ExamResult = React.lazy(() =>
  import('./components/exam/ExamResult').then((m) => ({ default: m.ExamResult })),
);
const ExamRunner = React.lazy(() =>
  import('./components/exam/ExamRunner').then((m) => ({ default: m.ExamRunner })),
);
const EinstellungenView = React.lazy(() =>
  import('./components/views/EinstellungenView').then((m) => ({ default: m.EinstellungenView })),
);
const ErsteSchritteView = React.lazy(() =>
  import('./components/views/ErsteSchritteView').then((m) => ({ default: m.ErsteSchritteView })),
);
const FehleranalyseView = React.lazy(() =>
  import('./components/views/FehleranalyseView').then((m) => ({ default: m.FehleranalyseView })),
);
const FortschrittView = React.lazy(() =>
  import('./components/views/FortschrittView').then((m) => ({ default: m.FortschrittView })),
);
const GrammatikView = React.lazy(() =>
  import('./components/views/GrammatikView').then((m) => ({ default: m.GrammatikView })),
);
const PruefungView = React.lazy(() =>
  import('./components/views/PruefungView').then((m) => ({ default: m.PruefungView })),
);
const SammlungView = React.lazy(() =>
  import('./components/views/SammlungView').then((m) => ({ default: m.SammlungView })),
);
const SkillOverviewView = React.lazy(() =>
  import('./components/views/SkillOverviewView').then((m) => ({ default: m.SkillOverviewView })),
);
const SucheView = React.lazy(() =>
  import('./components/views/SucheView').then((m) => ({ default: m.SucheView })),
);
const UeberView = React.lazy(() =>
  import('./components/views/UeberView').then((m) => ({ default: m.UeberView })),
);
const WortschatzView = React.lazy(() =>
  import('./components/views/WortschatzView').then((m) => ({ default: m.WortschatzView })),
);
import { CEFR_LEVELS, SKILL_META } from './data/curriculum';
import { getExamConfiguration, getExamConfigurationById } from './data/exams';
import { ALL_EXERCISES, getExerciseById } from './data/exercises';
import {
  clearBookmarks,
  createEmptyBookmarks,
  getTotalBookmarkCount,
  loadBookmarks,
  saveBookmarks,
  toggleCategoryBookmark,
} from './services/bookmarkService';
import {
  createExamSession,
  recordExamAttemptIntoUserProgress,
} from './services/examProgressService';
import { evaluateExamSubmission } from './services/examScoringService';
import {
  clearActiveExamSession,
  deleteExamAttemptRecord,
  loadActiveExamSession,
  loadExamHistory,
  saveActiveExamSession,
  saveExamHistory,
  upsertExamAttemptRecord,
} from './services/examStorageService';
import {
  clearMistakeNotebook,
  deleteMistakeRecord,
  loadMistakeNotebook,
  recordObjectiveMistakesFromEvaluation,
  saveMistakeNotebook,
  toggleMistakeCorrected,
} from './services/mistakeNotebookService';
import {
  clearPracticeHistory,
  loadPracticeHistory,
  recordWritingSpeakingAttempt,
  savePracticeHistory,
} from './services/practiceHistoryService';
import {
  loadRecentQuestionIds,
  recordRecentQuestionIds,
  saveRecentQuestionIds,
} from './services/randomPracticeService';
import { generateLearningRecommendations } from './services/recommendationService';
import { ExerciseEvaluationResult, QuestionAnswerValue } from './services/scoringService';
import {
  clearFlashcardSchedule,
  getDueFlashcardCount,
  loadFlashcardSchedule,
  recordFlashcardReview,
  saveFlashcardSchedule,
} from './services/spacedRepetitionService';
import {
  ActiveExamSession,
  ExamAttemptRecord,
  ExamLevel,
  ExamMode,
  ExamModuleKey,
  ExamProvider,
} from './types/exam';
import { Exercise } from './types/exercise';
import {
  CEFRLevel,
  ExamBoard,
  NavPage,
  SkillType,
  UserProgressState,
  UserSettings,
} from './types/learning';
import {
  BookmarkCategory,
  BookmarkCollection,
  FlashcardRating,
  FlashcardReviewRecord,
  LearningRecommendation,
  MistakeRecord,
  WritingSpeakingHistoryEntry,
} from './types/phase4';
import { UILanguage } from './types/progress';
import {
  BRAND_NAME,
  getNeutralExamLevelLabel,
  getNeutralExamTitle,
  sanitizeExamBrandingText,
} from './utils/brandLabels';
import {
  calculateOverallProgressPercent,
  createEmptyProgress,
  loadProgress,
  loadSettings,
  recordCompletedExerciseResult,
  saveProgress,
  saveSettings,
  toggleGrammarCompletion,
  toggleVocabBookmark,
} from './utils/progress';

export default function App() {
  const [progress, setProgress] = useState<UserProgressState>(() => loadProgress());
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());

  const [activePage, setActivePage] = useState<NavPage>('startseite');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | null>(null);
  const [selectedExam, setSelectedExam] = useState<{
    board: ExamBoard;
    level: CEFRLevel;
  } | null>(null);

  const [skillLevelFilter, setSkillLevelFilter] = useState<CEFRLevel | 'Alle'>('Alle');
  const [grammarLevelFilter, setGrammarLevelFilter] = useState<CEFRLevel | 'Alle'>('Alle');
  const [vocabLevelFilter, setVocabLevelFilter] = useState<CEFRLevel | 'Alle'>('Alle');
  const [highlightedGrammarId, setHighlightedGrammarId] = useState<string | null>(null);
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [searchQueryNonce, setSearchQueryNonce] = useState(0);
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(
    () => !settings.onboardingCompleted,
  );

  // Phase 3 Examination Engine state
  const [unfinishedExamSession, setUnfinishedExamSession] = useState<ActiveExamSession | null>(
    () => loadActiveExamSession(),
  );
  const [runningExamSession, setRunningExamSession] = useState<ActiveExamSession | null>(() => {
    const saved = loadActiveExamSession();
    return saved && !saved.submitted ? saved : null;
  });
  const [examHistory, setExamHistory] = useState<ExamAttemptRecord[]>(() => loadExamHistory());
  const [activeExamResultAttempt, setActiveExamResultAttempt] =
    useState<ExamAttemptRecord | null>(null);

  // Phase 4 Learning Features state
  const [srsSchedule, setSrsSchedule] = useState<Record<string, FlashcardReviewRecord>>(() =>
    loadFlashcardSchedule(),
  );
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(() => loadMistakeNotebook());
  const [bookmarks, setBookmarks] = useState<BookmarkCollection>(() =>
    loadBookmarks(loadProgress().bookmarkedVocabIds),
  );
  const [practiceHistory, setPracticeHistory] = useState<WritingSpeakingHistoryEntry[]>(() =>
    loadPracticeHistory(),
  );
  const [recentQuestionIds, setRecentQuestionIds] = useState<string[]>(() =>
    loadRecentQuestionIds(),
  );

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveSettings(settings);
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings]);

  useEffect(() => {
    saveFlashcardSchedule(srsSchedule);
  }, [srsSchedule]);

  useEffect(() => {
    saveMistakeNotebook(mistakes);
  }, [mistakes]);

  useEffect(() => {
    saveBookmarks(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    savePracticeHistory(practiceHistory);
  }, [practiceHistory]);

  useEffect(() => {
    saveRecentQuestionIds(recentQuestionIds);
  }, [recentQuestionIds]);

  // Keep running exam session automatically persisted on every update
  useEffect(() => {
    if (runningExamSession && !runningExamSession.submitted) {
      saveActiveExamSession(runningExamSession);
      setUnfinishedExamSession(runningExamSession);
    }
  }, [runningExamSession]);

  const recommendations = useMemo(
    () =>
      generateLearningRecommendations({
        progress,
        mistakes,
        srsSchedule,
        examHistory,
      }),
    [progress, mistakes, srsSchedule, examHistory],
  );

  const openMistakesCount = useMemo(
    () => mistakes.filter((m) => !m.corrected).length,
    [mistakes],
  );
  const dueFlashcardsCount = useMemo(
    () => getDueFlashcardCount(srsSchedule),
    [srsSchedule],
  );
  const bookmarksCount = useMemo(() => getTotalBookmarkCount(bookmarks), [bookmarks]);
  const overallPercent = useMemo(() => calculateOverallProgressPercent(progress), [progress]);

  const handleGlobalSearchSubmit = (query: string) => {
    setActiveExercise(null);
    setRunningExamSession(null);
    setActiveExamResultAttempt(null);
    setSearchInitialQuery(query);
    setSearchQueryNonce((n) => n + 1);
    setActivePage('suche');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  const handleToggleUiLanguage = (lang: UILanguage) => {
    setSettings((prev) => ({
      ...prev,
      uiLanguage: lang,
    }));
  };

  const lastLessonBookmarkCategory: BookmarkCategory | null =
    progress.lastLesson.module === 'lesen' ||
    progress.lastLesson.module === 'hoeren' ||
    progress.lastLesson.module === 'schreiben' ||
    progress.lastLesson.module === 'sprechen'
      ? progress.lastLesson.module
      : null;
  const isLastLessonBookmarked = lastLessonBookmarkCategory
    ? bookmarks[lastLessonBookmarkCategory].includes(progress.lastLesson.id)
    : false;
  const handleToggleLastLessonBookmark = lastLessonBookmarkCategory
    ? () => handleToggleCategoryBookmark(lastLessonBookmarkCategory, progress.lastLesson.id)
    : undefined;

  const handleNavigate = (page: NavPage) => {
    setActiveExercise(null);
    setRunningExamSession(null);
    setActiveExamResultAttempt(null);
    setHighlightedGrammarId(null);
    setActivePage(page);
    if (page === 'lernen') {
      setSelectedLevel(null);
    }
    if (page === 'pruefung') {
      setSelectedExam(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLevelDetail = (level: CEFRLevel) => {
    setActiveExercise(null);
    setRunningExamSession(null);
    setActiveExamResultAttempt(null);
    setSelectedLevel(level);
    setActivePage('lernen-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExamDetail = (board: ExamBoard, level: CEFRLevel) => {
    setActiveExercise(null);
    setRunningExamSession(null);
    setActiveExamResultAttempt(null);
    setSelectedExam({ board, level });
    setActivePage('pruefung-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateWithLevelFilter = (page: NavPage, level: CEFRLevel) => {
    setActiveExercise(null);
    setRunningExamSession(null);
    setActiveExamResultAttempt(null);
    if (page === 'grammatik') {
      setGrammarLevelFilter(level);
    } else if (page === 'wortschatz') {
      setVocabLevelFilter(level);
    } else {
      setSkillLevelFilter(level);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGrammarTopic = (grammarId: string, level: CEFRLevel) => {
    setActiveExercise(null);
    setRunningExamSession(null);
    setActiveExamResultAttempt(null);
    setGrammarLevelFilter(level);
    setHighlightedGrammarId(grammarId);
    setActivePage('grammatik');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVocabLevel = (level: CEFRLevel) => {
    setActiveExercise(null);
    setRunningExamSession(null);
    setActiveExamResultAttempt(null);
    setVocabLevelFilter(level);
    setActivePage('wortschatz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRecommendation = (rec: LearningRecommendation) => {
    if (rec.targetPage === 'fehleranalyse') {
      handleNavigate('fehleranalyse');
      return;
    }
    if (rec.targetPage === 'grammatik' && rec.targetGrammarId && rec.targetLevel) {
      handleOpenGrammarTopic(rec.targetGrammarId, rec.targetLevel);
      return;
    }
    if (rec.targetExerciseId) {
      const targetEx = getExerciseById(rec.targetExerciseId);
      if (targetEx) {
        handleStartExercise(targetEx);
        return;
      }
    }
    if (rec.targetLevel) {
      handleNavigateWithLevelFilter(rec.targetPage, rec.targetLevel);
      return;
    }
    handleNavigate(rec.targetPage);
  };

  const handleStartExercise = (exercise: Exercise) => {
    setRunningExamSession(null);
    setActiveExamResultAttempt(null);
    setActiveExercise(exercise);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeLastLesson = () => {
    const match =
      ALL_EXERCISES.find((e) => e.id === progress.lastLesson.id) ??
      ALL_EXERCISES.find((e) => e.level === progress.currentLevel) ??
      ALL_EXERCISES[0];
    if (match) {
      handleStartExercise(match);
    }
  };

  const handleStartSampleExerciseForExam = (level: CEFRLevel, skill: SkillType) => {
    const match =
      ALL_EXERCISES.find((e) => e.level === level && e.skill === skill) ??
      ALL_EXERCISES.find((e) => e.skill === skill) ??
      ALL_EXERCISES[0];
    if (match) {
      handleStartExercise(match);
    }
  };

  const handleStartExamSimulation = (params: {
    provider: ExamProvider;
    level: ExamLevel;
    mode: ExamMode;
    moduleKey?: ExamModuleKey;
  }) => {
    const config = getExamConfiguration(params.provider, params.level);
    const nextSession = createExamSession({
      exam: config,
      mode: params.mode,
      selectedModuleKey: params.moduleKey,
    });
    setActiveExercise(null);
    setActiveExamResultAttempt(null);
    saveActiveExamSession(nextSession);
    setUnfinishedExamSession(nextSession);
    setRunningExamSession(nextSession);
    setActivePage('pruefung');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeUnfinishedExam = () => {
    const saved = loadActiveExamSession();
    if (!saved || saved.submitted) return;
    setActiveExercise(null);
    setActiveExamResultAttempt(null);
    setRunningExamSession(saved);
    setActivePage('pruefung');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiscardUnfinishedExam = () => {
    clearActiveExamSession();
    setUnfinishedExamSession(null);
    setRunningExamSession(null);
  };

  const handleSubmitExamSession = (
    lockedSession: ActiveExamSession,
    attempt: ExamAttemptRecord,
  ) => {
    clearActiveExamSession();
    setUnfinishedExamSession(null);
    setRunningExamSession(lockedSession);
    setActiveExamResultAttempt(attempt);
    const updatedHistory = upsertExamAttemptRecord(attempt);
    setExamHistory(updatedHistory);
    setProgress((prev) => recordExamAttemptIntoUserProgress(prev, attempt));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAttemptSelfRatings = (
    attemptId: string,
    questionId: string,
    nextRatings: Record<string, number>,
  ) => {
    const target = examHistory.find((a) => a.attemptId === attemptId);
    if (!target) return;
    const examConfig = getExamConfigurationById(target.examId);
    if (!examConfig) return;

    const updatedSelfRatings = {
      ...target.selfAssessmentRatings,
      [questionId]: nextRatings,
    };

    const reEvaluated = evaluateExamSubmission(
      examConfig,
      target.mode,
      target.answers,
      target.selectedModuleKey,
      updatedSelfRatings,
    );

    const updatedAttempt: ExamAttemptRecord = {
      ...target,
      selfAssessmentRatings: updatedSelfRatings,
      evaluation: reEvaluated,
    };

    const nextHistory = upsertExamAttemptRecord(updatedAttempt);
    setExamHistory(nextHistory);
    setActiveExamResultAttempt(updatedAttempt);
  };

  const handleDeleteExamAttempt = (attemptId: string) => {
    const nextHistory = deleteExamAttemptRecord(attemptId);
    setExamHistory(nextHistory);
    if (activeExamResultAttempt?.attemptId === attemptId) {
      setActiveExamResultAttempt(null);
    }
  };

  const handleCompleteExercise = (
    exercise: Exercise,
    evaluation: ExerciseEvaluationResult,
    details?: {
      answers: Record<string, QuestionAnswerValue>;
      selfChecks: Record<string, boolean[]>;
    },
  ) => {
    setProgress((prev) => recordCompletedExerciseResult(prev, exercise, evaluation));
    setMistakes((prev) => recordObjectiveMistakesFromEvaluation(prev, exercise, evaluation));
    setRecentQuestionIds((prev) =>
      recordRecentQuestionIds(
        prev,
        exercise.questions.map((q) => q.id),
      ),
    );

    if (
      details &&
      (exercise.skill === 'schreiben' || exercise.skill === 'sprechen')
    ) {
      setPracticeHistory((prev) =>
        recordWritingSpeakingAttempt(prev, {
          exercise,
          answers: details.answers,
          selfChecks: details.selfChecks,
        }),
      );
    }
  };

  const handleToggleGrammar = (id: string, title: string, level: CEFRLevel) => {
    setProgress((prev) => toggleGrammarCompletion(prev, id, title, level));
  };

  const handleToggleCategoryBookmark = (category: BookmarkCategory, itemId: string) => {
    setBookmarks((prev) => toggleCategoryBookmark(prev, category, itemId));
    if (category === 'vocab') {
      setProgress((prev) => toggleVocabBookmark(prev, itemId));
    }
  };

  const handleRateFlashcard = (vocabId: string, rating: FlashcardRating) => {
    setSrsSchedule((prev) => recordFlashcardReview(prev, vocabId, rating));
  };

  const handleToggleMistakeCorrected = (mistakeId: string) => {
    setMistakes((prev) => toggleMistakeCorrected(prev, mistakeId));
  };

  const handleDeleteMistake = (mistakeId: string) => {
    setMistakes((prev) => deleteMistakeRecord(prev, mistakeId));
  };

  const handleUpdateSettings = (next: UserSettings) => {
    setSettings(next);
    setProgress((prev) => ({
      ...prev,
      currentLevel: next.preferredLevel,
      dailyGoalMinutes: next.dailyTargetMinutes,
    }));
  };

  const handleChangeActiveLevel = (level: CEFRLevel) => {
    setSettings((prev) => ({
      ...prev,
      preferredLevel: level,
    }));
    setProgress((prev) => ({
      ...prev,
      currentLevel: level,
    }));
  };

  const handleResetProgress = () => {
    setProgress(createEmptyProgress(settings.preferredLevel, settings.dailyTargetMinutes));
    setSrsSchedule({});
    clearFlashcardSchedule();
    setMistakes([]);
    clearMistakeNotebook();
    setBookmarks(createEmptyBookmarks());
    clearBookmarks();
    setPracticeHistory([]);
    clearPracticeHistory();
    clearActiveExamSession();
    saveExamHistory([]);
    setUnfinishedExamSession(null);
    setRunningExamSession(null);
    setExamHistory([]);
    setActiveExamResultAttempt(null);
  };

  const handleCompleteOnboarding = (result: OnboardingResult) => {
    const nextSettings: UserSettings = {
      ...settings,
      onboardingCompleted: true,
      preferredLevel: result.preferredLevel,
      learningGoal: result.learningGoal,
      startingExperience: result.startingExperience,
    };
    setSettings(nextSettings);
    saveSettings(nextSettings);
    setProgress((prev) => ({
      ...prev,
      currentLevel: result.preferredLevel,
    }));
    setOnboardingOpen(false);

    if (result.directToA0) {
      setActivePage('a0');
    } else {
      setActivePage('lernen');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getHeaderMeta = (): { title: string; breadcrumb: string[] } => {
    if (runningExamSession) {
      const cfg = getExamConfigurationById(runningExamSession.examId);
      const neutralExamTitle = cfg
        ? getNeutralExamTitle(cfg.provider, cfg.level)
        : 'Simulasi Ujian';
      return {
        title: neutralExamTitle,
        breadcrumb: [BRAND_NAME, 'Simulasi Ujian', cfg ? getNeutralExamLevelLabel(cfg.level) : 'Simulasi'],
      };
    }

    if (activeExamResultAttempt) {
      return {
        title: `Hasil · ${sanitizeExamBrandingText(activeExamResultAttempt.officialName)}`,
        breadcrumb: [BRAND_NAME, 'Simulasi Ujian', 'Hasil'],
      };
    }

    if (activeExercise) {
      return {
        title: activeExercise.title,
        breadcrumb: [
          BRAND_NAME,
          activeExercise.level,
          activeExercise.topic,
        ],
      };
    }

    switch (activePage) {
      case 'startseite':
        return { title: 'Beranda', breadcrumb: [BRAND_NAME, 'Beranda'] };
      case 'a0':
        return {
          title: 'Mulai Dari Nol (A0)',
          breadcrumb: [BRAND_NAME, 'Zona Pemula', 'Erste Schritte'],
        };
      case 'lernen':
        return { title: 'Belajar', breadcrumb: [BRAND_NAME, 'Belajar'] };
      case 'lernen-detail': {
        const lvl = CEFR_LEVELS.find((l) => l.level === selectedLevel);
        return {
          title: lvl ? lvl.title : 'Tingkat Pembelajaran',
          breadcrumb: [BRAND_NAME, 'Belajar', lvl ? lvl.level : 'Detail'],
        };
      }
      case 'pruefung':
        return { title: 'Simulasi Ujian', breadcrumb: [BRAND_NAME, 'Simulasi Ujian'] };
      case 'pruefung-detail': {
        const examTitle = selectedExam
          ? getNeutralExamTitle(selectedExam.board, selectedExam.level)
          : 'Persiapan Ujian';
        return {
          title: examTitle,
          breadcrumb: [
            BRAND_NAME,
            'Simulasi Ujian',
            selectedExam ? getNeutralExamLevelLabel(selectedExam.level) : 'Persiapan Ujian',
          ],
        };
      }
      case 'lesen':
        return {
          title: 'Latihan Membaca',
          breadcrumb: [BRAND_NAME, 'Keterampilan', 'Latihan Membaca'],
        };
      case 'hoeren':
        return {
          title: 'Latihan Mendengarkan',
          breadcrumb: [BRAND_NAME, 'Keterampilan', 'Latihan Mendengarkan'],
        };
      case 'sprechen':
        return {
          title: 'Latihan Berbicara',
          breadcrumb: [BRAND_NAME, 'Keterampilan', 'Latihan Berbicara'],
        };
      case 'schreiben':
        return {
          title: 'Latihan Menulis',
          breadcrumb: [BRAND_NAME, 'Keterampilan', 'Latihan Menulis'],
        };
      case 'grammatik':
        return { title: 'Tata Bahasa', breadcrumb: [BRAND_NAME, 'Tata Bahasa'] };
      case 'wortschatz':
        return { title: 'Kosakata', breadcrumb: [BRAND_NAME, 'Kosakata'] };
      case 'fehleranalyse':
        return { title: 'Analisis Kesalahan', breadcrumb: [BRAND_NAME, 'Analisis Kesalahan'] };
      case 'sammlung':
        return { title: 'Koleksi Saya', breadcrumb: [BRAND_NAME, 'Koleksi Saya'] };
      case 'suche':
        return { title: 'Pencarian', breadcrumb: [BRAND_NAME, 'Pencarian'] };
      case 'fortschritt':
        return { title: 'Kemajuan', breadcrumb: [BRAND_NAME, 'Kemajuan'] };
      case 'einstellungen':
        return { title: 'Pengaturan', breadcrumb: [BRAND_NAME, 'Pengaturan'] };
      case 'ueber':
        return { title: 'Tentang Cerdeutsch', breadcrumb: [BRAND_NAME, 'Tentang'] };
    }
  };

  const headerMeta = getHeaderMeta();

  const runningExamConfig = runningExamSession
    ? getExamConfigurationById(runningExamSession.examId)
    : undefined;
  const resultExamConfig = activeExamResultAttempt
    ? getExamConfigurationById(activeExamResultAttempt.examId)
    : undefined;

  const activeExerciseBookmarkCategory: BookmarkCategory | null =
    activeExercise &&
    (activeExercise.skill === 'lesen' ||
      activeExercise.skill === 'hoeren' ||
      activeExercise.skill === 'schreiben' ||
      activeExercise.skill === 'sprechen')
      ? activeExercise.skill
      : null;

  return (
    <AppShell
      activePage={activePage}
      onNavigate={handleNavigate}
      breadcrumb={headerMeta.breadcrumb}
      pageTitle={headerMeta.title}
      currentLevel={progress.currentLevel}
      overallPercent={overallPercent}
      openMistakesCount={openMistakesCount}
      dueFlashcardsCount={dueFlashcardsCount}
      hasUnfinishedExam={Boolean(unfinishedExamSession && !unfinishedExamSession.submitted)}
      theme={settings.theme}
      onToggleTheme={handleToggleTheme}
      uiLanguage={settings.uiLanguage ?? 'id'}
      onToggleUiLanguage={handleToggleUiLanguage}
      onSearchSubmit={handleGlobalSearchSubmit}
      onQuickStartLesson={handleResumeLastLesson}
    >
      <div
        key={`${runningExamSession?.sessionId ?? ''}-${activeExamResultAttempt?.attemptId ?? ''}-${activeExercise?.id ?? ''}-${activePage}-${selectedLevel ?? ''}-${selectedExam?.board ?? ''}-${selectedExam?.level ?? ''}`}
        className="page-enter"
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh] p-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#B91C1C] border-t-transparent" />
                <p className="text-sm font-medium text-[#57524C] dark:text-[#C8C1B8]">
                  Memuat modul...
                </p>
              </div>
            </div>
          }
        >
        {runningExamSession && runningExamConfig ? (
          <ExamRunner
            exam={runningExamConfig}
            session={runningExamSession}
            submittedAttempt={activeExamResultAttempt}
            onUpdateSession={setRunningExamSession}
            onSubmitSession={handleSubmitExamSession}
            onUpdateAttemptSelfRatings={handleUpdateAttemptSelfRatings}
            onExitToOverview={() => {
              setRunningExamSession(null);
              setActiveExamResultAttempt(null);
              setActivePage('pruefung');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRetryExam={() =>
              handleStartExamSimulation({
                provider: runningExamSession.provider,
                level: runningExamSession.level,
                mode: runningExamSession.mode,
                moduleKey: runningExamSession.selectedModuleKey,
              })
            }
            soundEnabled={settings.soundEnabled}
          />
        ) : activeExamResultAttempt && resultExamConfig ? (
          <ExamResult
            exam={resultExamConfig}
            attempt={activeExamResultAttempt}
            onUpdateSelfRatings={(questionId, nextRatings) =>
              handleUpdateAttemptSelfRatings(
                activeExamResultAttempt.attemptId,
                questionId,
                nextRatings,
              )
            }
            onBackToOverview={() => {
              setActiveExamResultAttempt(null);
              setActivePage('pruefung');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRetryExam={() =>
              handleStartExamSimulation({
                provider: activeExamResultAttempt.provider,
                level: activeExamResultAttempt.level,
                mode: activeExamResultAttempt.mode,
                moduleKey: activeExamResultAttempt.selectedModuleKey,
              })
            }
          />
        ) : activeExercise ? (
          <ExerciseRunner
            exercise={activeExercise}
            soundEnabled={settings.soundEnabled}
            isBookmarked={
              activeExerciseBookmarkCategory
                ? bookmarks[activeExerciseBookmarkCategory].includes(activeExercise.id)
                : false
            }
            onToggleBookmark={
              activeExerciseBookmarkCategory
                ? () =>
                    handleToggleCategoryBookmark(
                      activeExerciseBookmarkCategory,
                      activeExercise.id,
                    )
                : undefined
            }
            bookmarkedQuestionIds={bookmarks.questions ?? []}
            onToggleQuestionBookmark={(qId) =>
              handleToggleCategoryBookmark('questions', qId)
            }
            onComplete={handleCompleteExercise}
            onBack={() => {
              setActiveExercise(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {activePage === 'startseite' && (
              <StartseiteView
                progress={progress}
                recommendations={recommendations}
                openMistakesCount={openMistakesCount}
                dueFlashcardsCount={dueFlashcardsCount}
                bookmarksCount={bookmarksCount}
                isLastLessonBookmarked={isLastLessonBookmarked}
                onToggleLastLessonBookmark={handleToggleLastLessonBookmark}
                onNavigate={handleNavigate}
                onSelectLevelDetail={handleSelectLevelDetail}
                onSelectExamDetail={handleSelectExamDetail}
                onResumeLastLesson={handleResumeLastLesson}
                onOpenRecommendation={handleOpenRecommendation}
                onChangeLevel={handleChangeActiveLevel}
                soundEnabled={settings.soundEnabled}
              />
            )}

            {activePage === 'a0' && (
              <ErsteSchritteView
                onNavigate={handleNavigate}
                uiLanguage={settings.uiLanguage}
                soundEnabled={settings.soundEnabled}
              />
            )}

            {(activePage === 'lernen' || activePage === 'lernen-detail') && (
              <LernenView
                progress={progress}
                selectedLevel={activePage === 'lernen-detail' ? selectedLevel : null}
                onSelectLevel={(lvl) => {
                  if (lvl) {
                    handleSelectLevelDetail(lvl);
                  } else {
                    handleNavigate('lernen');
                  }
                }}
                onNavigateWithLevelFilter={handleNavigateWithLevelFilter}
                onStartExercise={handleStartExercise}
                onNavigate={handleNavigate}
              />
            )}

            {(activePage === 'pruefung' || activePage === 'pruefung-detail') && (
              <PruefungView
                selectedExam={activePage === 'pruefung-detail' ? selectedExam : null}
                onSelectExam={(sel) => {
                  if (sel) {
                    handleSelectExamDetail(sel.board, sel.level);
                  } else {
                    handleNavigate('pruefung');
                  }
                }}
                onStartSampleExercise={handleStartSampleExerciseForExam}
                onStartExercise={handleStartExercise}
                unfinishedSession={unfinishedExamSession}
                examHistory={examHistory}
                onStartExamSimulation={handleStartExamSimulation}
                onResumeUnfinishedExam={handleResumeUnfinishedExam}
                onDiscardUnfinishedExam={handleDiscardUnfinishedExam}
                onViewAttempt={(attempt) => {
                  setActiveExamResultAttempt(attempt);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDeleteAttempt={handleDeleteExamAttempt}
              />
            )}

            {(activePage === 'lesen' ||
              activePage === 'hoeren' ||
              activePage === 'sprechen' ||
              activePage === 'schreiben') && (
              <SkillOverviewView
                skill={activePage}
                levelFilter={skillLevelFilter}
                onLevelFilterChange={setSkillLevelFilter}
                completedIds={progress.completedExerciseIds}
                exerciseScores={progress.exerciseScores}
                bookmarkedIds={bookmarks[activePage]}
                onToggleBookmark={(exId) => handleToggleCategoryBookmark(activePage, exId)}
                onStartExercise={handleStartExercise}
                mistakes={mistakes}
                bookmarks={bookmarks}
                recentQuestionIds={recentQuestionIds}
              />
            )}

            {activePage === 'grammatik' && (
              <GrammatikView
                levelFilter={grammarLevelFilter}
                onLevelFilterChange={setGrammarLevelFilter}
                completedGrammarIds={progress.completedGrammarIds}
                completedExerciseIds={progress.completedExerciseIds}
                exerciseScores={progress.exerciseScores}
                bookmarkedGrammarIds={bookmarks.grammar}
                highlightedGrammarId={highlightedGrammarId}
                onToggleGrammarBookmark={(id) => handleToggleCategoryBookmark('grammar', id)}
                onToggleGrammar={handleToggleGrammar}
                onStartExercise={handleStartExercise}
                mistakes={mistakes}
                bookmarks={bookmarks}
                recentQuestionIds={recentQuestionIds}
                soundEnabled={settings.soundEnabled}
              />
            )}

            {activePage === 'wortschatz' && (
              <WortschatzView
                levelFilter={vocabLevelFilter}
                onLevelFilterChange={setVocabLevelFilter}
                bookmarkedIds={bookmarks.vocab}
                completedExerciseIds={progress.completedExerciseIds}
                exerciseScores={progress.exerciseScores}
                srsSchedule={srsSchedule}
                onRateFlashcard={handleRateFlashcard}
                onToggleBookmark={(id) => handleToggleCategoryBookmark('vocab', id)}
                onStartExercise={handleStartExercise}
                soundEnabled={settings.soundEnabled}
                mistakes={mistakes}
                bookmarks={bookmarks}
                recentQuestionIds={recentQuestionIds}
              />
            )}

            {activePage === 'fehleranalyse' && (
              <FehleranalyseView
                mistakes={mistakes}
                onToggleCorrected={handleToggleMistakeCorrected}
                onDeleteMistake={handleDeleteMistake}
                onStartExercise={handleStartExercise}
                onNavigate={handleNavigate}
                recentQuestionIds={recentQuestionIds}
              />
            )}

            {activePage === 'sammlung' && (
              <SammlungView
                bookmarks={bookmarks}
                onRemoveBookmark={handleToggleCategoryBookmark}
                onStartExercise={handleStartExercise}
                onOpenGrammar={handleOpenGrammarTopic}
                onOpenVocab={handleOpenVocabLevel}
                onNavigate={handleNavigate}
                recentQuestionIds={recentQuestionIds}
              />
            )}

            {activePage === 'suche' && (
              <SucheView
                initialQuery={searchInitialQuery}
                queryNonce={searchQueryNonce}
                completedExerciseIds={progress.completedExerciseIds}
                completedGrammarIds={progress.completedGrammarIds}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleCategoryBookmark}
                onStartExercise={handleStartExercise}
                onOpenGrammar={handleOpenGrammarTopic}
                onOpenVocab={handleOpenVocabLevel}
              />
            )}

            {activePage === 'fortschritt' && (
              <FortschrittView
                progress={progress}
                mistakes={mistakes}
                srsSchedule={srsSchedule}
                practiceHistory={practiceHistory}
                examHistory={examHistory}
                recommendations={recommendations}
                onNavigate={handleNavigate}
                onStartExercise={handleStartExercise}
                onOpenRecommendation={handleOpenRecommendation}
              />
            )}

            {activePage === 'einstellungen' && (
              <EinstellungenView
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onResetProgress={handleResetProgress}
                onOpenOnboarding={() => setOnboardingOpen(true)}
              />
            )}

            {activePage === 'ueber' && <UeberView onNavigate={handleNavigate} />}
          </>
        )}
        </Suspense>
      </div>

      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onComplete={handleCompleteOnboarding}
      />
    </AppShell>
  );
}
