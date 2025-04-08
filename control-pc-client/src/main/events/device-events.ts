import { ipcMain } from "electron";
import {getDeviceInformation} from '../services/device-service';
import { SocketClient } from "../socket-client/socket-client";

ipcMain.handle('device:info', (_event) => {
    
    return getDeviceInformation();
})

ipcMain.on('socket:request', (_event) => {

    const socketClient = new SocketClient();
    socketClient.connectToServer();

})