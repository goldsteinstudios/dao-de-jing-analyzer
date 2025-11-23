import type { Character, CharacterOccurrence } from './index';

// Tool Types
export type ToolCategory =
  | 'blade' // Cutting tools (knives, scythes, swords)
  | 'agriculture' // Farming tools (plows, hoes)
  | 'construction' // Building tools (hammers, axes)
  | 'writing' // Writing implements
  | 'weaving' // Textile tools
  | 'container' // Vessels, baskets
  | 'weapon' // Military tools
  | 'body' // Body parts as tools (hand, foot, mouth)
  | 'natural' // Natural phenomena as tools (water, fire)
  | 'abstract'; // Abstract operators

export interface ToolIdentification {
  name: string; // e.g., "scythe", "plow", "hand"
  category: ToolCategory;
  description: string; // How the tool is used
  radicals: string[]; // Which radicals indicate this tool
  gripDescription?: string; // How you hold it
  confidence: number; // 0-1, how confident we are this is the right tool
}

// Geometric Patterns
export type GeometricPattern =
  | 'circle'
  | 'spiral'
  | 'arc'
  | 'line'
  | 'wave'
  | 'zigzag'
  | 'helix'
  | 'point'
  | 'radial'
  | 'grid'
  | 'fractal';

export interface PatternAnalysis {
  primaryPattern: GeometricPattern;
  secondaryPatterns: GeometricPattern[];
  mathematicalRelationships: MathematicalRelationship[];
  naturalExamples: string[]; // Where this pattern appears in nature
  description: string;
}

export interface MathematicalRelationship {
  type: 'phi' | 'pi' | 'e' | 'fibonacci' | 'ratio' | 'symmetry' | 'recursion';
  description: string;
  relevance: string; // Why this mathematical relationship matters for this motion
}

// Motion Description
export interface MotionDescription {
  action: string; // e.g., "swing in circular arc", "push forward"
  directionality: 'linear' | 'circular' | 'radial' | 'complex';
  force: 'sharp' | 'smooth' | 'rhythmic' | 'sustained' | 'sudden';
  spatialExtent: 'local' | 'expansive' | 'contained';
  temporalAspect: 'momentary' | 'repeated' | 'continuous' | 'cyclical';
  energyFlow: string; // Description of how energy moves through the motion
}

// Core Motion Insight
export interface MotionInsight {
  id: string;
  character: string;
  pinyin: string;

  // Radical breakdown
  radicals: string[];
  radicalMeanings: { [radical: string]: string };

  // Tool identification
  tool?: ToolIdentification;

  // Motion analysis
  motionDescription: MotionDescription;
  physicalAction: string; // User's description of the imagined motion

  // Geometric patterns
  patternAnalysis: PatternAnalysis;

  // Translation comparison
  translations: {
    standard: string; // Traditional translation
    structural: string; // Previous RSM structural reading
    motion: string; // New motion-based reading
  };

  // Context verification
  contextualFit: {
    occurrences: CharacterOccurrence[];
    examples: ContextExample[];
    coherenceScore: number; // 0-1, how well motion reading fits contexts
  };

  // Cross-references
  relatedCharacters: string[]; // Characters with similar motions/patterns
  operatorType?: 'O' | 'G' | 'P' | 'frame' | 'perception';

  // Metadata
  insights: string[]; // Free-form insights discovered
  hypotheses: string[]; // Testable hypotheses generated
  createdAt: number;
  updatedAt: number;
  confidence: number; // 0-1, overall confidence in this reading
}

export interface ContextExample {
  occurrence: CharacterOccurrence;
  contextText: string; // Surrounding characters
  standardReading: string; // Traditional interpretation of this passage
  motionReading: string; // Motion-based interpretation
  notes: string;
}

// Motion Decoder UI State
export interface MotionDecoderState {
  currentCharacter: string | null;
  currentInsight: MotionInsight | null;
  step: DecoderStep;
  insights: Map<string, MotionInsight>; // character -> insight
  comparisonMode: boolean; // Show side-by-side with other characters
  selectedForComparison: string[];
}

export type DecoderStep =
  | 'select' // Select character to analyze
  | 'radicals' // Break down radicals
  | 'tool' // Identify tool
  | 'motion' // Describe motion
  | 'pattern' // Identify geometric pattern
  | 'context' // Test against actual usage
  | 'insights' // Record insights and hypotheses
  | 'review'; // Review and save

// Search and filtering
export interface MotionSearchFilters {
  toolCategory?: ToolCategory[];
  geometricPattern?: GeometricPattern[];
  hasOperatorType?: boolean;
  minConfidence?: number;
  searchQuery?: string;
}

// Export
export interface MotionDecoderExport {
  insights: MotionInsight[];
  summary: {
    totalCharactersAnalyzed: number;
    toolCategories: { [key in ToolCategory]?: number };
    geometricPatterns: { [key in GeometricPattern]?: number };
    averageConfidence: number;
  };
  exportedAt: number;
  version: string;
}
