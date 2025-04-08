import { IsEmail, IsNotEmpty } from "class-validator";

export class AddNewUserDTO{

    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

}