// src/components/PageWrapper.jsx
import { useRef, useEffect, useState } from 'react';
import { Page } from 'react-pdf';
export default function PageWrapper({ pageNumber, activeHighlight, measureMode }) {
  const containerRef = useRef();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [start, setStart] = useState(null);
  const [tempRect, setTempRect] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) setSize({ width: el.offsetWidth, height: el.offsetHeight });
    const handleResize = () => {
      if (el) setSize({ width: el.offsetWidth, height: el.offsetHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onMouseDown = (e) => {
    if (!measureMode) return;
    const bounds = containerRef.current.getBoundingClientRect();
    setStart({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  const onMouseMove = (e) => {
    if (!measureMode || !start) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    setTempRect({
      x: Math.min(start.x, x),
      y: Math.min(start.y, y),
      width: Math.abs(x - start.x),
      height: Math.abs(y - start.y),
    });
  };

  const onMouseUp = () => {
    if (!measureMode || !tempRect || !size.width || !size.height) return;

    const norm = {
      x: +(tempRect.x / size.width).toFixed(3),
      y: +(tempRect.y / size.height).toFixed(3),
      width: +(tempRect.width / size.width).toFixed(3),
      height: +(tempRect.height / size.height).toFixed(3),
    };

    console.log(
      `📌 Page ${pageNumber} highlight: [${norm.x}, ${norm.y}, ${norm.width}, ${norm.height}]`
    );

    // Reset
    setStart(null);
    setTempRect(null);
  };

  const renderHighlight = () => {
    if (!activeHighlight) return null;
    return activeHighlight.rects.map(([x, y, w, h], i) => (
      <div
        key={i}
        className="absolute bg-yellow-300/60 rounded"
        style={{
          left: `${x * size.width}px`,
          top: `${y * size.height}px`,
          width: `${w * size.width}px`,
          height: `${h * size.height}px`,
        }}
      />
    ));
  };

  return (
    <div
      id={`page-${pageNumber}`}
      className="relative my-4"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <Page pageNumber={pageNumber} width={size.width || 800} />
      {renderHighlight()}
      {tempRect && (
        <div
          className="absolute border-2 border-blue-500 border-dashed bg-blue-100/30"
          style={{
            left: tempRect.x,
            top: tempRect.y,
            width: tempRect.width,
            height: tempRect.height,
          }}
        />
      )}
    </div>
  );
}
