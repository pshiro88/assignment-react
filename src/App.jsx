import { useState } from 'react';
import PDFViewer from './components/PDFViewer';
import AnalysisPane from './components/AnalysisPane';
import { highlights } from './highlightsMap';

export default function App() {
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [measureMode, setMeasureMode] = useState(false);

  const handleReferenceClick = (refId) => {
    const highlight = highlights[refId];
    if (!highlight) return;
    setActiveHighlight({ refId, ...highlight });
    const el = document.getElementById(`page-${highlight.page}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/5 overflow-auto border-r">
        <PDFViewer
          pdfUrl = "/assignment-react/maersk-q2-2025.pdf"
          activeHighlight={activeHighlight}
          measureMode={measureMode}
        />
      </div>

      <div className="w-2/5 overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Analysis</h1>
          {/* <button
            className={`text-sm px-3 py-1 rounded ${
              measureMode ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setMeasureMode(!measureMode)}
          >
            {measureMode ? 'Exit Measure Mode' : 'Measure Highlight'}
          </button> */}
        </div>
        <AnalysisPane onRefClick={handleReferenceClick} />
      </div>
    </div>
  );
}
