import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AddNewUserDTO } from '../../request/add-new-user.dto';


@Injectable()
export class UserService {

    constructor(
        private readonly _supabaseService:SupabaseService
    ){}

    async createAdminUser(data:AddNewUserDTO){

        const {email, password} = data;

        return await this._supabaseService.client.auth.signUp({
            email, password
        });
    }

}
