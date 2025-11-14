import { useState } from 'react';
import { useCharacterData } from './hooks/useCharacterData';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/Header';
import { CharacterGrid } from './components/CharacterGrid';
import { CharacterDetail } from './components/CharacterDetail';
import { Loading, ErrorDisplay } from './components/Loading';
import { AnalysisPanel } from './components/analysis/AnalysisPanel';

type ViewMode = 'grid' | 'analysis';

function App() {
  // Load data on mount
  useCharacterData();

  const { isLoading, error, data } = useAppStore();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <Header viewMode={viewMode} setViewMode={setViewMode} />
      <main className="flex-1 overflow-hidden">
        {viewMode === 'grid' ? <CharacterGrid /> : <AnalysisPanel />}
      </main>
      {viewMode === 'grid' && <CharacterDetail />}
    </div>
  );
}

export default App;
