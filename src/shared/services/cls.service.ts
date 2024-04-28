import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import type { Prisma } from '@prisma/client';

@Injectable()
export class ClsService {
  public readonly prismaTransaction =
    new AsyncLocalStorage<Prisma.TransactionClient>();
}
