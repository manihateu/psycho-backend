import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
    constructor () {
      super({
        datasources: {
          db: {
            url: "postgres://neondb_owner:jB1HFo9TyPVn@ep-proud-hall-a2dz761y-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
          }
        }
      })
    }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
