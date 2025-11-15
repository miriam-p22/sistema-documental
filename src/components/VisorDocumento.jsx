import React from 'react';
import '../styles/VisorDocumento.css';

const VisorDocumento = ({ documentUrl, documentTitle }) => {
  // Define el contenido que mostrará el iframe si no hay documento seleccionado
  const initialMessage = `
    <style>
        .initial-message { 
            font-family: Arial, sans-serif; 
            color: #6c757d; 
            padding: 20px; 
            text-align: center;
            margin-top: 50px;
        }
    </style>
    <p class='initial-message'>Selecciona un documento de la tabla para previsualizarlo aquí.</p>
  `;

  return (
    <div className="file-upload-area" id="fileArea">
      <iframe 
        id="fileViewer" 
        className="document-viewer" 
        src={documentUrl || undefined} // Usa la URL si existe
        srcDoc={documentUrl ? undefined : initialMessage} // Muestra el mensaje si no hay URL
        title={`Visor: ${documentTitle || 'No seleccionado'}`}
      ></iframe>
    </div>
  );
};

export default VisorDocumento;