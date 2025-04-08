/// <reference types="vite/client" />
import { IDeviceInformation } from "../interfaces/device-info.interface";
import { Component } from "../strategy/component-stategy-interface";
import template from "../views/device.html?raw";
import templateDeviceTable from '../components/device-table-info.html?raw';
import { stat } from "fs";

export class DeviceComponent implements Component{

    private deviceInfoTableBody!:HTMLElement;

    getTemplate(): string {
        return template;
    }
    insertController(): void {

        this.loadDeviceInfo();
        this.connectToServer();
    }

    async loadDeviceInfo():Promise<void>{

        
        const info:IDeviceInformation = await window.api.invoke('device:info', null);

        this.deviceInfoTableBody = document.getElementById('device-info-table')!;

        this.deviceInfoTableBody.innerHTML = templateDeviceTable
            .replace('{osType}', info.osType)
            .replace('{osPlatform}', info.osPlatform)
            .replace('{osArch}', info.osArch)
            .replace('{osRelease}', info.osRelease)
            .replace('{cpuNumbers}', info.cpuNumbers + "")
            .replace('{cpuDetail}', info.cpuDetail + "")
            .replace('{totalMemory}', info.totalMemory + " GB" )
            .replace('{hostname}', info.hostname)
            .replace('{username}', info.username + "")
        

    }

    connectToServer():void{
        
        const statusBox = document.getElementById('status-box')!;
        const statusMessage = document.getElementById('status-message')!;

        const classList = this.getStyleByServerResponse("LOADING");

        statusBox.classList.add(...classList);
        statusMessage.innerText = "Cargando...";

        window.api.send('socket:request', null);

        window.api.receive('socket:response', (data:{status: "CONNECTED" | "DISCONNECTED" | "LOADING", message:string}) => {

            switch(data.status) {
                case "CONNECTED":
                    statusBox.classList.remove(...this.getStyleByServerResponse("LOADING"));
                    statusBox.classList.remove(...this.getStyleByServerResponse("DISCONNECTED"));
                    statusBox.classList.add(...this.getStyleByServerResponse("CONNECTED"));
                    statusMessage.innerText = 'Conectado';
                    break;
                case "DISCONNECTED":
                    statusBox.classList.remove(...this.getStyleByServerResponse("LOADING"));
                    statusBox.classList.remove(...this.getStyleByServerResponse("CONNECTED"));
                    statusBox.classList.add(...this.getStyleByServerResponse("DISCONNECTED"));
                    statusMessage.innerText = 'Desconectado';
                    break;
                case "LOADING":
                    statusBox.classList.remove(...this.getStyleByServerResponse("CONNECTED"));
                    statusBox.classList.remove(...this.getStyleByServerResponse("DISCONNECTED"));
                    statusBox.classList.add(...this.getStyleByServerResponse("LOADING"));
                    statusMessage.innerText = 'Cargando...';
                    break;
            }
        });

    }

    getStyleByServerResponse(status: "CONNECTED" | "DISCONNECTED" | "LOADING"): string[] {

        const styles = {
            "CONNECTED": ["from-green-500","to-green-600", "border-green-700"],
            "DISCONNECTED": ["from-red-600","to-red-700", "border-red-800"],
            "LOADING": ["from-orange-500","to-orange-600", "border-orange-700"],
        }

        return styles[status];
    }

    cleanEvents(): void {
        throw new Error("Method not implemented.");
    }

}