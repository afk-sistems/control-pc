import axios from "axios";
import { IResponse } from "../interfaces/reponse";

export const registerUser = async (formData:{email:string, password: string}):Promise<IResponse<any>>=> {

    const response:IResponse<any> = {data: undefined, error: undefined};

    console.log(formData);
    

    try{

        const res = await axios.post('http://localhost:3000/api/user/register', formData,{
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response.data = res.data;

    }catch(error){

        response.error = error;

    }finally{
        console.log(response);
        
    }

    return response;


}