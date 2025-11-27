import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PageWrapper from './PageWrapper';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
export default function PDFViewer({ pdfUrl, activeHighlight, measureMode }) {
  const [numPages, setNumPages] = useState(null);

  return (
    <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
      {Array.from({ length: numPages }, (_, idx) => {
        const pageNum = idx + 1;
        const showHighlight = activeHighlight?.page === pageNum;
        return (
          <PageWrapper
            key={pageNum}
            pageNumber={pageNum}
            activeHighlight={showHighlight ? activeHighlight : null}
            measureMode={measureMode}
          />
        );
      })}
    </Document>
  );
}
