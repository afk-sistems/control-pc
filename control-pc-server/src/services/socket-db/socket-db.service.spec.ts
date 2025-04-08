import { Test, TestingModule } from '@nestjs/testing';
import { SocketDbService } from './socket-db.service';

describe('SocketDbService', () => {
  let service: SocketDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketDbService],
    }).compile();

    service = module.get<SocketDbService>(SocketDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
