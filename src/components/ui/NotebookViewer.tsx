import React, { useEffect, useRef } from 'react';
import notebookjs from 'notebookjs';

interface NotebookViewerProps {
  nbJSON: any;
}

export default function NotebookViewer({ nbJSON }: NotebookViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Parse the notebook JSON
    const parsed = notebookjs.parse(nbJSON);

    // Render notebook to HTML
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(parsed.render());

    // Any scripts inside the notebook HTML will execute
    // notebookjs automatically includes inline JS for Plotly/other outputs
  }, [nbJSON]);

  return <div ref={containerRef} />;
}

