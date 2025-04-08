import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ComputerService {

    constructor(

        private readonly _supabase:SupabaseService
    ){

    }

    async findByIDAndPC(id:number, pcId:string){

        const { data, error} = await this._supabase.client.from('tbl_devices')
        .select()
        .eq('id', id)
        .eq('device_id', pcId)
        .limit(1)
        .single();

        if(!data){
            throw new NotFoundException(`No se encontró el dispositivo con id ${id} y id de dispositivo '${pcId}'`);
        }


        return data;

    }

    async updateStatusByID(id:string, status: "ONLINE" | "OFFLINE"){

        const {error} = await this._supabase.client.from('tbl_devices')
        .update({status })
        .eq('id', parseInt(id));
        

    }

}
