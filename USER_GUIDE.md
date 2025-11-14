# Dao De Jing Pattern Analyzer - User Guide

## Overview

An interactive web-based tool for analyzing character patterns, radical topology, and structural operators in the Dao De Jing.

## Features Implemented

### ✅ Core Features (Day 1-2)

#### 1. Data Display
- **Character Grid**: Full 81-chapter display with scrollable grid
- **Row & Column Headers**: Chapter numbers (1-81) as columns, position numbers as rows
- **Responsive Layout**: Optimized for laptop screens
- **Smooth Performance**: Handles 9,000+ character cells efficiently

#### 2. Character Detail Panel
- **Click to Explore**: Click any character to view details
- **Character Information**:
  - Large display of the selected character
  - Pinyin romanization
  - Current location (Chapter X, Position Y)
  - All occurrences across the entire text
- **Navigation**: Click any occurrence to jump to that location in the grid
- **Keyboard Shortcut**: Press ESC to close the detail panel
- **Auto-scroll**: Grid automatically scrolls to show clicked occurrences

#### 3. Radical Highlighting System
- **8 Pre-configured Radicals**:
  - 辶 (Walking) - Red
  - 大 (Great) - Blue
  - 口 (Mouth) - Green
  - 女 (Woman) - Pink
  - 水/氵 (Water) - Cyan
  - 心/忄 (Heart) - Amber
  - 言/訁 (Speech) - Purple
  - 手/扌 (Hand) - Teal

- **Multi-Radical Selection**: Check multiple radicals simultaneously
- **Two Highlight Modes**:
  - **Union Mode**: Shows characters containing ANY selected radical
  - **Intersection Mode**: Shows only characters containing ALL selected radicals
- **Visual Feedback**: Highlighted cells show color-coded borders and backgrounds
- **Character Count**: See how many characters contain each radical

#### 4. Search Functionality
- **Character Search**: Find any Chinese character
- **Pinyin Search**: Search by romanization
- **Result List**: View all occurrences with chapter and position
- **Quick Navigation**: Click results to jump to location in grid
- **Auto-highlight**: Found characters temporarily highlight in yellow
- **Result Limit**: Shows first 50 results (with indication if more exist)

## How to Use

### Exploring Characters

1. **Browse the Grid**: Scroll through the 81 chapters to see all characters
2. **Click a Character**: Opens the detail panel on the right
3. **View Occurrences**: See everywhere this character appears
4. **Navigate**: Click any occurrence to jump to that location
5. **Close Panel**: Click the × button or press ESC

### Highlighting Radicals

1. **Open Radical Menu**: Click "Highlight Radicals" button
2. **Select Radicals**: Check one or more radicals to highlight
3. **Change Mode** (if multiple selected):
   - Union: Highlights characters with ANY selected radical
   - Intersection: Only highlights characters with ALL selected radicals
4. **Clear**: Click "Clear All" to remove all highlights

### Searching

1. **Enter Query**: Type a character or pinyin in the search box
2. **Submit**: Press Enter or click "Search" button
3. **Browse Results**: Scroll through the results list
4. **Navigate**: Click any result to jump to that location
5. **Clear Search**: Click "Clear" to close results

### Tips for Pattern Analysis

**Finding Characters with Specific Radicals:**
1. Select the radical (e.g., 辶 for motion-related characters)
2. Observe distribution across chapters
3. Click highlighted characters to see all occurrences
4. Note patterns: which chapters have high concentrations?

**Testing Hypotheses:**
1. Use Intersection Mode to find characters with multiple radicals
2. Example: Select 辶 (walking) + 心 (heart) to find movement + emotion
3. Search for specific characters to see their frequency
4. Use the detail panel to track where key characters cluster

**Comparing Chapters:**
1. Scroll to compare different chapters side-by-side
2. Use radical highlighting to see thematic patterns
3. Notice which chapters emphasize which radicals

## Technical Details

### Data Structure
- **163 columns**: 1 position column + 81 chapter pairs (character + pinyin)
- **128 data rows**: Each represents a position in the text
- **~9,000 characters**: Total character count across all chapters

### Character Sets Supported
- Traditional Chinese characters
- Pinyin romanization
- Empty cells for chapters with fewer characters

### Performance
- Virtualized scrolling for smooth navigation
- Instant highlighting (no lag)
- Fast search (< 100ms for full-text search)
- Responsive UI updates

## Keyboard Shortcuts

- **ESC**: Close character detail panel
- **Enter** (in search box): Submit search

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## Known Limitations

### Current Version (MVP)
- Radical detection is manual (limited to ~200 characters per radical)
- No hypothesis testing tool yet (coming in next update)
- No export functionality yet (planned)
- Search limited to exact character or pinyin matches
- No advanced pattern visualization yet

## Next Features (Planned)

1. **Hypothesis Testing Mode** (Day 4-5)
   - Create and test pattern hypotheses
   - Mark instances as supporting/contradicting
   - Calculate statistics
   - Export results

2. **Statistics & Analytics** (Day 5)
   - Character frequency analysis
   - Radical co-occurrence patterns
   - Chapter-by-chapter breakdowns

3. **Enhanced Visualization** (Day 6-7)
   - Heat maps
   - Pattern flow diagrams
   - Cluster analysis

4. **Export & Sharing** (Day 8)
   - PDF reports
   - CSV exports
   - Shareable URLs

## Troubleshooting

**Problem: Grid doesn't load**
- Check browser console for errors
- Ensure CSV file is in public/ folder
- Try refreshing the page

**Problem: Characters don't display correctly**
- Ensure your system has Chinese font support
- Try a different browser

**Problem: Highlighting doesn't work**
- Character may not be in the radical map
- This is expected for MVP - only ~200 characters per radical mapped

**Problem: Search finds no results**
- Try exact character or pinyin
- Check spelling of pinyin
- Character may not exist in the text

## Development

### Running Locally
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

## Credits

Built with:
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)
- PapaParse (CSV parsing)
- Vite (build tool)

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.
