// import React from 'react'
// import { transformImage } from '../../libs/features';

// const RenderAttachment = (file, url) => {
//     switch (file) {
//         case 'video':
//             return <video src={url} preload='none' width={'200px'} controls />

//         case 'image':
//             return <img src={transformImage(url,200)} alt='attachment' width={'200px'} height={'200px'} style={{objectFit:'contain'}} />

//         case 'audio':
//             return <audio src={url} preload='none' controls />

//         default:
//             return <div>helo</div>
//     }
// }

// export default RenderAttachment

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { transformImage } from "../../libs/features";

// Setup pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RenderAttachment = (file, url) => {
  const cleanUrl = url.includes("/raw/")
    ? url.replace("/raw/", "/image/")
    : url;

  switch (file) {
    case "video":
      return <video src={url} preload="none" width="200px" controls />;

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="attachment"
          width="200px"
          height="200px"
          style={{ objectFit: "contain" }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    case "pdf":
      return (
        <div>
          <iframe
            src={url}
            width="100%"
            height="500px"
            style={{ border: "none" }}
          />
          <a href={url} download target="_blank" rel="noopener noreferrer">
            Download PDF here
          </a>
        </div>
      );

    case "doc":
    case "docx":
      const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        url
      )}`;
      return (
        <div>
          <iframe
            src={officeViewerUrl}
            width="100%"
            height="500px"
            style={{ border: "none" }}
          />
          <a href={url} download target="_blank" rel="noopener noreferrer">
            Download Word Document
          </a>
        </div>
      );

    default:
      return (
        <div>
          <p>Unknown File</p>
          <a href={url} download target="_blank" rel="noopener noreferrer">
            Download
          </a>
        </div>
      );
  }
};

export default RenderAttachment;
