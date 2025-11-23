import React from 'react';
import { useMotionStore } from '../../store/useMotionStore';
import { CharacterSelector } from './CharacterSelector';
import { RadicalBreakdown } from './RadicalBreakdown';
import { ToolIdentifier } from './ToolIdentifier';
import { MotionImagination } from './MotionImagination';
import { PatternMatcher } from './PatternMatcher';
import { ContextTester } from './ContextTester';
import { InsightsRecorder } from './InsightsRecorder';
import { ReviewPanel } from './ReviewPanel';

export const MotionDecoder: React.FC = () => {
  const { step, currentCharacter, nextStep, previousStep, resetDecoder } = useMotionStore();

  const steps = [
    { id: 'select', label: 'Select Character', component: CharacterSelector },
    { id: 'radicals', label: 'Radicals', component: RadicalBreakdown },
    { id: 'tool', label: 'Tool', component: ToolIdentifier },
    { id: 'motion', label: 'Motion', component: MotionImagination },
    { id: 'pattern', label: 'Pattern', component: PatternMatcher },
    { id: 'context', label: 'Context', component: ContextTester },
    { id: 'insights', label: 'Insights', component: InsightsRecorder },
    { id: 'review', label: 'Review', component: ReviewPanel },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);
  const CurrentStepComponent = steps[currentStepIndex]?.component;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Character Motion Decoder</h1>
            <p className="text-sm text-gray-600 mt-1">
              Decode characters as geometric operations and physical motions
            </p>
          </div>
          {currentCharacter && (
            <button
              onClick={resetDecoder}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <React.Fragment key={s.id}>
              <div className="flex items-center">
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                    ${
                      index < currentStepIndex
                        ? 'bg-green-500 text-white'
                        : index === currentStepIndex
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }
                  `}
                >
                  {index < currentStepIndex ? '✓' : index + 1}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    index === currentStepIndex ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {CurrentStepComponent ? <CurrentStepComponent /> : <div>Loading...</div>}
        </div>
      </div>

      {/* Navigation Footer */}
      {step !== 'select' && (
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex justify-between">
            <button
              onClick={previousStep}
              disabled={currentStepIndex === 0}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStepIndex === steps.length - 1}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
