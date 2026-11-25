import test from 'node:test';
import assert from 'node:assert/strict';
import { Exercise } from '../types/exercise';
import {
  buildQuestionBankAuditReport,
} from './contentValidationService';
import {
  buildRandomPracticeExercise,
  collectObjectiveQuestionPool,
  recordRecentQuestionIds,
} from './randomPracticeService';
import {
  calculateExerciseResult,
  evaluateObjectiveQuestion,
  isQuestionAnswered,
  validateExerciseDatabase,
} from './scoringService';

function makeSampleExercises(): Exercise[] {
  const lesenQuestions = Array.from({ length: 15 }, (_, idx) => ({
    id: `sample-l-q${idx + 1}`,
    type: 'multiple-choice' as const,
    question: `Lesefrage ${idx + 1}: Wann öffnet die Bibliothek am Samstag?`,
    options: ['Um 09:00 Uhr', 'Um 14:00 Uhr', 'Sie bleibt geschlossen'],
    correctAnswer: 'Um 09:00 Uhr',
    explanationDe: 'Im Text steht, dass die Bibliothek samstags um 9 Uhr öffnet.',
    explanationId: 'Dalam teks tertulis perpustakaan buka pukul 09.00 pada hari Sabtu.',
    points: 10,
    difficulty: (idx % 3 === 0 ? 'Leicht' : idx % 3 === 1 ? 'Mittel' : 'Anspruchsvoll') as
      | 'Leicht'
      | 'Mittel'
      | 'Anspruchsvoll',
  }));

  const grammatikQuestions = [
    {
      id: 'sample-g-q1',
      type: 'multiple-select' as const,
      question: 'Welche Sätze stehen im Dativ Plural richtig?',
      options: [
        'Ich helfe den Kindern.',
        'Wir fahren mit den Freunden.',
        'Er gibt die Kinder ein Buch.',
        'Sie spricht mit den Lehrer.',
      ],
      correctAnswers: ['Ich helfe den Kindern.', 'Wir fahren mit den Freunden.'],
      explanationDe: 'Im Dativ Plural enden Artikel und Nomen meist auf -n.',
      explanationId: 'Pada Dativ jamak, artikel menjadi den dan nomina umumnya mendapat akhiran -n.',
      points: 10,
      difficulty: 'Mittel' as const,
    },
    {
      id: 'sample-g-q2',
      type: 'sentence-order' as const,
      question: 'Ordne die Wörter zu einem korrekten Nebensatz.',
      orderingTokens: ['weil', 'morgen', 'ich', 'arbeite'],
      correctAnswer: 'weil ich morgen arbeite',
      explanationDe: 'Nach „weil“ steht das konjugierte Verb am Ende des Nebensatzes.',
      explanationId: 'Setelah konjungsi "weil", kata kerja terkonjugasi diletakkan di akhir anak kalimat.',
      points: 10,
      difficulty: 'Mittel' as const,
    },
  ];

  const hoerenPending: Exercise = {
    id: 'sample-h-pending',
    level: 'A1',
    skill: 'hoeren',
    topic: 'Alltag',
    title: 'Telefonat am Morgen',
    subtitle: 'Wartet auf Audio',
    difficulty: 'Leicht',
    durationMinutes: 5,
    formatLabel: 'Hören · Dialog',
    instructions: 'Höre zu.',
    audioStatus: 'pending',
    transcript: 'Hallo Anna, treffen wir uns um zehn Uhr am Bahnhof?',
    questions: [
      {
        id: 'sample-h-q1',
        type: 'true-false',
        question: 'Die Personen treffen sich um zehn Uhr.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Richtig',
        explanationDe: 'Im Dialog wird zehn Uhr vereinbart.',
        explanationId: 'Di dialog mereka sepakat bertemu pukul sepuluh.',
        points: 10,
        difficulty: 'Leicht',
      },
    ],
  };

  return [
    {
      id: 'sample-l-1',
      level: 'A1',
      skill: 'lesen',
      topic: 'Alltag',
      title: 'Öffnungszeiten der Bibliothek',
      subtitle: 'Leseverstehen',
      difficulty: 'Mittel',
      durationMinutes: 8,
      formatLabel: 'Lesen',
      instructions: 'Lies den Text.',
      passageTitle: 'Stadtbibliothek',
      passageType: 'Hinweisschild',
      passage: 'Unsere Stadtbibliothek öffnet montags bis samstags um 09:00 Uhr.',
      questions: lesenQuestions,
    },
    {
      id: 'sample-g-1',
      level: 'A2',
      skill: 'grammatik',
      topic: 'Termine',
      title: 'Dativ & Nebensätze',
      subtitle: 'Grammatiktraining',
      difficulty: 'Mittel',
      durationMinutes: 6,
      formatLabel: 'Grammatik',
      instructions: 'Löse die Aufgaben.',
      questions: grammatikQuestions,
    },
    hoerenPending,
  ];
}

test('multiple-select and sentence-order scoring & validation work accurately', () => {
  const sample = makeSampleExercises();
  const gramQ1 = sample[1].questions[0];
  const gramQ2 = sample[1].questions[1];

  assert.equal(isQuestionAnswered(gramQ1, []), false);
  assert.equal(isQuestionAnswered(gramQ1, ['Ich helfe den Kindern.']), true);

  const msCorrect = evaluateObjectiveQuestion(gramQ1, [
    'Wir fahren mit den Freunden.',
    'Ich helfe den Kindern.',
  ]);
  assert.equal(msCorrect.isCorrect, true);
  assert.equal(msCorrect.earnedPoints, 10);

  const msWrong = evaluateObjectiveQuestion(gramQ1, ['Ich helfe den Kindern.']);
  assert.equal(msWrong.isCorrect, false);
  assert.equal(msWrong.earnedPoints, 0);

  const orderCorrect = evaluateObjectiveQuestion(gramQ2, 'weil ich morgen arbeite');
  assert.equal(orderCorrect.isCorrect, true);
  assert.equal(orderCorrect.earnedPoints, 10);

  const orderWrong = evaluateObjectiveQuestion(gramQ2, 'weil arbeite ich morgen');
  assert.equal(orderWrong.isCorrect, false);

  const res = calculateExerciseResult(sample[1], {
    'sample-g-q1': ['Ich helfe den Kindern.', 'Wir fahren mit den Freunden.'],
    'sample-g-q2': 'weil ich morgen arbeite',
  });
  assert.equal(res.percentage, 100);
  assert.equal(res.correctCount, 2);

  // Validation checks invalid multiple-select & sentence-order
  const invalidReport = validateExerciseDatabase([
    {
      ...sample[1],
      questions: [
        {
          id: 'bad-ms',
          type: 'multiple-select',
          question: 'Bad',
          options: ['A', 'B'],
          correctAnswers: ['Z'],
          explanationId: 'Penjelasan',
          points: 10,
        },
        {
          id: 'bad-so',
          type: 'sentence-order',
          question: 'Bad',
          orderingTokens: ['nur'],
          correctAnswer: '',
          explanationId: 'Penjelasan',
          points: 10,
        },
      ],
    },
  ]);
  assert.equal(invalidReport.valid, false);
  assert.ok(invalidReport.errors.some((e) => e.includes('multiple-select')));
  assert.ok(invalidReport.errors.some((e) => e.includes('sentence-order')));
});

test('randomPracticeService filters by difficulty, mistakes, bookmarks, avoids recent repetition, and excludes pending audio', () => {
  const exercises = makeSampleExercises();

  // Pending audio excluded by default
  const hoerenPool = collectObjectiveQuestionPool({
    exercises,
    mode: 'random',
    count: 10,
    level: 'Alle',
    skill: 'hoeren',
    topic: 'Alle',
    difficulty: 'Alle',
  });
  assert.equal(hoerenPool.length, 0);

  // Random 10 avoids recentQuestionIds first
  const recent = ['sample-l-q1', 'sample-l-q2', 'sample-l-q3', 'sample-l-q4', 'sample-l-q5'];
  const random10 = buildRandomPracticeExercise({
    exercises,
    mode: 'random',
    count: 10,
    level: 'A1',
    skill: 'lesen',
    topic: 'Alle',
    difficulty: 'Alle',
    recentQuestionIds: recent,
    seed: 42,
  });
  assert.ok(random10);
  assert.equal(random10.questions.length, 10);
  assert.ok(
    random10.questions.every((q) => !recent.includes(q.id)),
    'Unseen questions must be prioritized before recent questions',
  );
  assert.equal(random10.questions[0].sourceExerciseId, 'sample-l-1');
  assert.ok(random10.questions[0].passage);

  // Incorrect-only mode
  const incorrectOnly = buildRandomPracticeExercise({
    exercises,
    mode: 'incorrect',
    count: 20,
    level: 'Alle',
    skill: 'Alle',
    topic: 'Alle',
    difficulty: 'Alle',
    mistakes: [
      {
        id: 'm1',
        questionId: 'sample-g-q2',
        exerciseId: 'sample-g-1',
        level: 'A2',
        skill: 'grammatik',
        topic: 'Termine',
        originalQuestion: 'Ordne...',
        userAnswer: 'wrong',
        correctAnswer: 'weil ich morgen arbeite',
        explanationId: '...',
        recordedAt: new Date().toISOString(),
        corrected: false,
      },
    ],
  });
  assert.ok(incorrectOnly);
  assert.equal(incorrectOnly.questions.length, 1);
  assert.equal(incorrectOnly.questions[0].id, 'sample-g-q2');

  // Bookmarked-only mode
  const bookmarkedOnly = buildRandomPracticeExercise({
    exercises,
    mode: 'bookmarked',
    count: 20,
    level: 'Alle',
    skill: 'Alle',
    topic: 'Alle',
    difficulty: 'Alle',
    bookmarks: {
      lesen: [],
      hoeren: [],
      schreiben: [],
      sprechen: [],
      grammar: [],
      vocab: [],
      questions: ['sample-g-q1'],
    },
  });
  assert.ok(bookmarkedOnly);
  assert.equal(bookmarkedOnly.questions.length, 1);
  assert.equal(bookmarkedOnly.questions[0].id, 'sample-g-q1');

  // Record recent IDs deduplicates and caps
  const updatedRecent = recordRecentQuestionIds(['q2', 'q1'], ['q3', 'q1']);
  assert.deepEqual(updatedRecent, ['q3', 'q1', 'q2']);
});

test('buildQuestionBankAuditReport counts completed vs awaiting audio and catches near-duplicates', () => {
  const exercises = makeSampleExercises();
  // Add a near-duplicate question
  exercises[0].questions.push({
    ...exercises[0].questions[0],
    id: 'sample-l-q-dup',
  });

  const report = buildQuestionBankAuditReport(exercises);
  const a1Row = report.rowsByLevel.find((r) => r.level === 'A1')!;
  const a2Row = report.rowsByLevel.find((r) => r.level === 'A2')!;

  assert.equal(a1Row.lesen, 16);
  assert.equal(a1Row.hoerenWithAudio, 0);
  assert.equal(a1Row.hoerenAwaitingAudio, 1);
  assert.equal(a2Row.grammatik, 2);
  assert.equal(report.nearDuplicateCount, 1);
  assert.equal(report.missingAudioFilesCount, 1);
});
