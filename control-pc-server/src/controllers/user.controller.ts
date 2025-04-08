import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { AddNewUserDTO } from '../request/add-new-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly _userService:UserService
    ){}

    @Post('/register')
    @UsePipes(
        new ValidationPipe({
            whitelist: true
        })
    )
    register(
        @Body() data:AddNewUserDTO
    ){
        return this._userService.createAdminUser(data);
    }


}
