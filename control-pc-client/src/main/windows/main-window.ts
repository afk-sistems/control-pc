import { BrowserWindow, shell } from "electron";
import { join } from 'path';
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'

export default class MainWindow {

    private static window: Electron.BrowserWindow;
    private static instance: MainWindow;

    private constructor(){}

    static getInstance(){

        if(!MainWindow.instance){
            MainWindow.instance = new MainWindow();
        }

        return MainWindow.instance;

    }

    get window(): Electron.BrowserWindow {
      return MainWindow.window;
    }

    createWindow(): void {
        // Create the browser window.
        MainWindow.window = new BrowserWindow({
          width: 600,
          height: 800,
          show: false,
          autoHideMenuBar: true,
          resizable: false,
          ...(process.platform === 'linux' ? { icon } : {}),
          webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
          }
        })
      
        MainWindow.window.on('ready-to-show', () => {
          MainWindow.window.show()
        })
      
        MainWindow.window.webContents.setWindowOpenHandler((details) => {
          shell.openExternal(details.url)
          return { action: 'deny' }
        })
      
        // HMR for renderer base on electron-vite cli.
        // Load the remote URL for development or the local html file for production.
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
          MainWindow.window.loadURL(process.env['ELECTRON_RENDERER_URL'])
        } else {
          MainWindow.window.loadFile(join(__dirname, '../../renderer/index.html'))
        }
      }

}