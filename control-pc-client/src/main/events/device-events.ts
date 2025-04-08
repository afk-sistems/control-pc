import { ipcMain } from "electron";
import {getDeviceInformation} from '../services/device-service';
import { SocketClient } from "../socket-client/socket-client";
import { registerUser } from "../services/user-service";

ipcMain.handle('device:info', (_event) => {
    
    return getDeviceInformation();
})

ipcMain.handle('user:register', (_event, user:{email:string, password:string}) => {

    return registerUser(user);
    
})

ipcMain.on('socket:request', (_event) => {

    const socketClient = new SocketClient();
    socketClient.connectToServer();

})