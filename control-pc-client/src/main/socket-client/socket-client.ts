import io, { Socket } from 'socket.io-client';
import MainWindow from '../windows/main-window';

export class SocketClient {

    private readonly socket_url = 'http://localhost:4321';
    private socket!:Socket;

    connectToServer(){

        if(this.socket) return;

        this.socket = io(this.socket_url, { query: {pcId: 3}});

        this.socket.on('connect', () => {
            this.sendStatusMessage("CONNECTED", "Conectado a servidor: " + this.socket_url);
        })

        this.socket.on('connect_error', (err) => {

            this.sendStatusMessage("DISCONNECTED", "Error de conexión: " + err.message);

        })

    }

    sendStatusMessage(status: "CONNECTED" | "DISCONNECTED" | "LOADING", message:string){
        MainWindow.getInstance().window.webContents.send('socket:response', {
            status: status,
            message: message
        })
    }


}