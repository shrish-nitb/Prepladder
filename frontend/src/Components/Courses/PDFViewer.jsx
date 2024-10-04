import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from 'react-pdf';


// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

  const PDFViewer = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    // Function to handle when the document is successfully loaded
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
  
    return (
      <div className="pdf-viewer-container h-[1000px]">
        <div className="pdf-controls">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>
          <p>Page {pageNumber} of {numPages}</p>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
        <div className="pdf-document">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    );
  };
  
export default PDFViewer;
