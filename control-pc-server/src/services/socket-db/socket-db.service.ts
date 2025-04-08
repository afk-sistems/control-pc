import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketDbService {

    private idList:{[key:string]:string} = {};

    get(id:string):string {
        return this.idList[id];
    }

    set(id:string, value:string):void {
        this.idList[id] = value;
    }

    getBySocketID(socketID:string):string | undefined {

        return Object.keys(this.idList).find(key => this.idList[key] === socketID);

    }

    remove(id:string):void {
        delete this.idList[id];
    }

    clear():void {
        this.idList = {};
    }

    getAll():{[key:string]:string} {
        return this.idList;
    }

    getAllKeys():string[] {
        return Object.keys(this.idList);
    }

    getAllValues():string[] {
        return Object.values(this.idList);
    }

}
