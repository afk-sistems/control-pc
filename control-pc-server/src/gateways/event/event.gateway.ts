import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ComputerService } from 'src/services/computer/computer.service';
import { SocketDbService } from 'src/services/socket-db/socket-db.service';

@WebSocketGateway(4321)
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect{

  constructor(
    private readonly _socketDbService: SocketDbService,
    private readonly _computerService: ComputerService,
  ){

  }

  @WebSocketServer()
  private readonly io:Server;

  @SubscribeMessage('shutdown:request')
  handleShutdown(@MessageBody() data:any) {

  }

  async handleConnection(client: any, ...args: any[]) {
    
    const pcId = client.handshake.query.pcId;

    await this._computerService.updateStatusByID(pcId, "ONLINE");
    this._socketDbService.set(pcId, client.id);
    
  }

  async handleDisconnect(client: any) {

    const pcId =  this._socketDbService.getBySocketID(client.id);
    await  this._computerService.updateStatusByID(pcId, "OFFLINE");
    
  }
}
