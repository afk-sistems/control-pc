import { ipcMain } from "electron";
import {getDeviceInformation} from '../services/device-service';

ipcMain.handle('device:info', (_event) => {
    
    return getDeviceInformation();
})