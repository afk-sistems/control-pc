import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ComputerService } from 'src/services/computer/computer.service';

@Controller('computer')
export class ComputerController {

    constructor(
        private readonly _computerService: ComputerService
    ){}

    @Get('/:id/:pcId')
    getInformation(@Param('id', ParseIntPipe) id:number, @Param('pcId') pcId:string){

        return this._computerService.findByIDAndPC(id, pcId);

    }


}
