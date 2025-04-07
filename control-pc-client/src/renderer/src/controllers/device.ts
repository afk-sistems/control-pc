/// <reference types="vite/client" />
import { IDeviceInformation } from "../interfaces/device-info.interface";
import { Component } from "../strategy/component-stategy-interface";
import template from "../views/device.html?raw";
import templateDeviceTable from '../components/device-table-info.html?raw';

export class DeviceComponent implements Component{

    private deviceInfoTableBody!:HTMLElement;

    getTemplate(): string {
        return template;
    }
    insertController(): void {

        this.loadDeviceInfo();
        
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

    cleanEvents(): void {
        throw new Error("Method not implemented.");
    }

}