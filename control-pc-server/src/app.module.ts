import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventGateway } from './gateways/event/event.gateway';
import { SocketDbService } from './services/socket-db/socket-db.service';
import { SupabaseService } from './services/supabase/supabase.service';
import { ComputerService } from './services/computer/computer.service';
import { UserService } from './services/user/user.service';
import { ComputerController } from './controllers/computer.controller';

@Module({
  imports: [],
  controllers: [AppController, ComputerController],
  providers: [AppService, EventGateway, SocketDbService, SupabaseService, ComputerService, UserService],
})
export class AppModule {}
