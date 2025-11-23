import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  MotionInsight,
  MotionDecoderState,
  DecoderStep,
  ToolIdentification,
  MotionDescription,
  PatternAnalysis,
  MotionSearchFilters,
  ContextExample,
} from '../types/motion';

interface MotionStore extends MotionDecoderState {
  // Character selection
  selectCharacter: (char: string, pinyin: string) => void;
  clearCharacter: () => void;

  // Step navigation
  setStep: (step: DecoderStep) => void;
  nextStep: () => void;
  previousStep: () => void;

  // Building the insight
  updateRadicals: (radicals: string[], meanings: { [key: string]: string }) => void;
  updateTool: (tool: ToolIdentification | undefined) => void;
  updateMotion: (motion: MotionDescription, physicalAction: string) => void;
  updatePattern: (pattern: PatternAnalysis) => void;
  updateTranslations: (translations: { standard: string; structural: string; motion: string }) => void;
  addContextExample: (example: ContextExample) => void;
  updateCoherenceScore: (score: number) => void;
  addInsightNote: (note: string) => void;
  addHypothesis: (hypothesis: string) => void;
  updateConfidence: (confidence: number) => void;
  linkRelatedCharacter: (char: string) => void;

  // Save and load
  saveInsight: () => void;
  loadInsight: (char: string) => void;
  deleteInsight: (char: string) => void;
  getAllInsights: () => MotionInsight[];

  // Comparison mode
  toggleComparisonMode: () => void;
  addToComparison: (char: string) => void;
  removeFromComparison: (char: string) => void;
  clearComparison: () => void;

  // Search and filter
  searchInsights: (filters: MotionSearchFilters) => MotionInsight[];

  // Reset
  resetDecoder: () => void;
}

const stepOrder: DecoderStep[] = [
  'select',
  'radicals',
  'tool',
  'motion',
  'pattern',
  'context',
  'insights',
  'review',
];

export const useMotionStore = create<MotionStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentCharacter: null,
      currentInsight: null,
      step: 'select',
      insights: new Map(),
      comparisonMode: false,
      selectedForComparison: [],

      // Character selection
      selectCharacter: (char: string, pinyin: string) => {
        const existing = get().insights.get(char);
        if (existing) {
          set({
            currentCharacter: char,
            currentInsight: existing,
            step: 'review',
          });
        } else {
          const newInsight: MotionInsight = {
            id: `motion-${char}-${Date.now()}`,
            character: char,
            pinyin,
            radicals: [],
            radicalMeanings: {},
            motionDescription: {
              action: '',
              directionality: 'linear',
              force: 'smooth',
              spatialExtent: 'local',
              temporalAspect: 'momentary',
              energyFlow: '',
            },
            physicalAction: '',
            patternAnalysis: {
              primaryPattern: 'line',
              secondaryPatterns: [],
              mathematicalRelationships: [],
              naturalExamples: [],
              description: '',
            },
            translations: {
              standard: '',
              structural: '',
              motion: '',
            },
            contextualFit: {
              occurrences: [],
              examples: [],
              coherenceScore: 0,
            },
            relatedCharacters: [],
            insights: [],
            hypotheses: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
            confidence: 0,
          };
          set({
            currentCharacter: char,
            currentInsight: newInsight,
            step: 'radicals',
          });
        }
      },

      clearCharacter: () => {
        set({
          currentCharacter: null,
          currentInsight: null,
          step: 'select',
        });
      },

      // Step navigation
      setStep: (step: DecoderStep) => {
        set({ step });
      },

      nextStep: () => {
        const { step } = get();
        const currentIndex = stepOrder.indexOf(step);
        if (currentIndex < stepOrder.length - 1) {
          set({ step: stepOrder[currentIndex + 1] });
        }
      },

      previousStep: () => {
        const { step } = get();
        const currentIndex = stepOrder.indexOf(step);
        if (currentIndex > 0) {
          set({ step: stepOrder[currentIndex - 1] });
        }
      },

      // Building the insight
      updateRadicals: (radicals: string[], meanings: { [key: string]: string }) => {
        const { currentInsight } = get();
        if (currentInsight) {
          set({
            currentInsight: {
              ...currentInsight,
              radicals,
              radicalMeanings: meanings,
              updatedAt: Date.now(),
            },
          });
        }
      },

      updateTool: (tool: ToolIdentification | undefined) => {
        const { currentInsight } = get();
        if (currentInsight) {
          set({
            currentInsight: {
              ...currentInsight,
              tool,
              updatedAt: Date.now(),
            },
          });
        }
      },

      updateMotion: (motion: MotionDescription, physicalAction: string) => {
        const { currentInsight } = get();
        if (currentInsight) {
          set({
            currentInsight: {
              ...currentInsight,
              motionDescription: motion,
              physicalAction,
              updatedAt: Date.now(),
            },
          });
        }
      },

      updatePattern: (pattern: PatternAnalysis) => {
        const { currentInsight } = get();
        if (currentInsight) {
          set({
            currentInsight: {
              ...currentInsight,
              patternAnalysis: pattern,
              updatedAt: Date.now(),
            },
          });
        }
      },

      updateTranslations: (translations: { standard: string; structural: string; motion: string }) => {
        const { currentInsight } = get();
        if (currentInsight) {
          set({
            currentInsight: {
              ...currentInsight,
              translations,
              updatedAt: Date.now(),
            },
          });
        }
      },

      addContextExample: (example: ContextExample) => {
        const { currentInsight } = get();
        if (currentInsight) {
          set({
            currentInsight: {
              ...currentInsight,
              contextualFit: {
                ...currentInsight.contextualFit,
                examples: [...currentInsight.contextualFit.examples, example],
              },
              updatedAt: Date.now(),
            },
          });
        }
      },

      updateCoherenceScore: (score: number) => {
        const { currentInsight } = get();
        if (currentInsight) {
          set({
            currentInsight: {
              ...currentInsight,
              contextualFit: {
                ...currentInsight.contextualFit,
                coherenceScore: score,
              },
              updatedAt: Date.now(),
            },
          });
        }
      },

      addInsightNote: (note: string) => {
        const { currentInsight } = get();
        if (currentInsight) {
          set({
            currentInsight: {
              ...currentInsight,
              insights: [...currentInsight.insights, note],
              updatedAt: Date.now(),
            },
          });
        }
      },

      addHypothesis: (hypothesis: string) => {
        const { currentInsight } = get();
        if (currentInsight) {
          set({
            currentInsight: {
              ...currentInsight,
              hypotheses: [...currentInsight.hypotheses, hypothesis],
              updatedAt: Date.now(),
            },
          });
        }
      },

      updateConfidence: (confidence: number) => {
        const { currentInsight } = get();
        if (currentInsight) {
          set({
            currentInsight: {
              ...currentInsight,
              confidence,
              updatedAt: Date.now(),
            },
          });
        }
      },

      linkRelatedCharacter: (char: string) => {
        const { currentInsight } = get();
        if (currentInsight && !currentInsight.relatedCharacters.includes(char)) {
          set({
            currentInsight: {
              ...currentInsight,
              relatedCharacters: [...currentInsight.relatedCharacters, char],
              updatedAt: Date.now(),
            },
          });
        }
      },

      // Save and load
      saveInsight: () => {
        const { currentInsight, insights } = get();
        if (currentInsight) {
          const newInsights = new Map(insights);
          newInsights.set(currentInsight.character, currentInsight);
          set({ insights: newInsights });
        }
      },

      loadInsight: (char: string) => {
        const { insights } = get();
        const insight = insights.get(char);
        if (insight) {
          set({
            currentCharacter: char,
            currentInsight: insight,
            step: 'review',
          });
        }
      },

      deleteInsight: (char: string) => {
        const { insights } = get();
        const newInsights = new Map(insights);
        newInsights.delete(char);
        set({ insights: newInsights });
      },

      getAllInsights: () => {
        return Array.from(get().insights.values());
      },

      // Comparison mode
      toggleComparisonMode: () => {
        set((state) => ({ comparisonMode: !state.comparisonMode }));
      },

      addToComparison: (char: string) => {
        const { selectedForComparison } = get();
        if (!selectedForComparison.includes(char)) {
          set({ selectedForComparison: [...selectedForComparison, char] });
        }
      },

      removeFromComparison: (char: string) => {
        set((state) => ({
          selectedForComparison: state.selectedForComparison.filter((c) => c !== char),
        }));
      },

      clearComparison: () => {
        set({ selectedForComparison: [] });
      },

      // Search and filter
      searchInsights: (filters: MotionSearchFilters) => {
        const allInsights = Array.from(get().insights.values());

        return allInsights.filter((insight) => {
          // Tool category filter
          if (filters.toolCategory && filters.toolCategory.length > 0) {
            if (!insight.tool || !filters.toolCategory.includes(insight.tool.category)) {
              return false;
            }
          }

          // Geometric pattern filter
          if (filters.geometricPattern && filters.geometricPattern.length > 0) {
            const hasPattern =
              filters.geometricPattern.includes(insight.patternAnalysis.primaryPattern) ||
              insight.patternAnalysis.secondaryPatterns.some((p) =>
                filters.geometricPattern!.includes(p)
              );
            if (!hasPattern) return false;
          }

          // Operator type filter
          if (filters.hasOperatorType && !insight.operatorType) {
            return false;
          }

          // Confidence filter
          if (filters.minConfidence && insight.confidence < filters.minConfidence) {
            return false;
          }

          // Search query
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const searchable = [
              insight.character,
              insight.pinyin,
              insight.physicalAction,
              insight.translations.motion,
              ...insight.insights,
              ...insight.hypotheses,
            ]
              .join(' ')
              .toLowerCase();

            if (!searchable.includes(query)) {
              return false;
            }
          }

          return true;
        });
      },

      // Reset
      resetDecoder: () => {
        set({
          currentCharacter: null,
          currentInsight: null,
          step: 'select',
          comparisonMode: false,
          selectedForComparison: [],
        });
      },
    }),
    {
      name: 'motion-decoder-storage',
      partialize: (state) => ({
        insights: Array.from(state.insights.entries()),
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.insights)) {
          state.insights = new Map(state.insights as [string, MotionInsight][]);
        }
      },
    }
  )
);
