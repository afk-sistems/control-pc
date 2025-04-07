import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload';
import validChannels from './valid-channels';

// Custom APIs for renderer
const api = {
  "send": (channel:string, args:any) =>{
    if(validChannels.send.includes(channel)){
      ipcRenderer.send(channel, args);
    }
  },
  "receive" : (channel:string, listener:Function) => {
    if(validChannels.receive.includes(channel)){
      ipcRenderer.on(channel, (_event, ...args) => listener(...args))
    }
  },
  "invoke": (channel:string, args:any) => {
    if(validChannels.invoke.includes(channel)){
      return ipcRenderer.invoke(channel, args);
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
