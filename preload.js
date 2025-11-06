const { contextBridge, ipcRenderer } = require("electron");

// Exponemos una API segura al contexto global (window)
contextBridge.exposeInMainWorld("electronAPI", {
  // Función para enviar un mensaje al proceso principal
  send: (channel, data) => {
    // Lista de canales seguros permitidos desde React
    let validSendChannels = ["toMain"];
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  // Función para recibir respuestas del proceso principal
  receive: (channel, func) => {
    let validReceiveChannels = ["fromMain"];
    if (validReceiveChannels.includes(channel)) {
      // Remover listener previo y adjuntar el nuevo (mejor práctica)
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});  //PARA CONECTAR CON LA API EXPRESS
