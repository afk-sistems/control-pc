import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      send: (channel:string, args:any) => void;
      receive: (channel:string, listener:Function) => void;
      invoke: (channel:string, args:any) => any;
    }
  }
}
