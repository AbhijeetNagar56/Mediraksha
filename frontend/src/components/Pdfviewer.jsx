// components/PdfViewer.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = ({ fileUrl }) => {
  const canvasRef = useRef();
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(1.2); // Default zoom

  useEffect(() => {
    const loadPDF = async () => {
      const loadingTask = pdfjsLib.getDocument(fileUrl);
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
    };

    if (fileUrl) {
      loadPDF();
    }
  }, [fileUrl]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc) return;
      const page = await pdfDoc.getPage(pageNum);

      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext);
    };

    renderPage();
  }, [pdfDoc, pageNum, scale]);

  const nextPage = () => {
    if (pdfDoc && pageNum < pdfDoc.numPages) setPageNum(pageNum + 1);
  };

  const prevPage = () => {
    if (pdfDoc && pageNum > 1) setPageNum(pageNum - 1);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-4">
        <button className="btn btn-sm" onClick={prevPage} disabled={pageNum <= 1}>
          Prev
        </button>
        <button className="btn btn-sm" onClick={nextPage} disabled={pdfDoc && pageNum >= pdfDoc.numPages}>
          Next
        </button>
        <button className="btn btn-sm" onClick={() => setScale(scale + 0.2)}>Zoom In</button>
        <button className="btn btn-sm" onClick={() => setScale(scale - 0.2)}>Zoom Out</button>
        <span>
          Page {pageNum} of {pdfDoc?.numPages || '--'}
        </span>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PdfViewer;
