const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (msg) => ipcRenderer.send('set-message', msg),
    handleMessage: (callback) => ipcRenderer.on('message', callback)
})
