import axios from "axios";
import { IResponse } from "../interfaces/reponse";

export const registerUser = async (data:{email:string, password: string}):Promise<IResponse<any>>=> {

    const response:IResponse<any> = {data: undefined, error: undefined};

    try{

        const res = await axios.post('http://localhost:3000/api/user/register', data);

        response.data = res.data;

    }catch(error){

        response.error = error;

    }

    return response;


}