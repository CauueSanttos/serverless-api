import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';
import 'dotenv/config'


let server: any;

async function bootstrap(): Promise<Handler | void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.enableCors();

  if (process.env.NODE_ENV === 'dev') {
  } else {
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();

    return serverlessExpress({ app: expressApp });
  }
}

const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());

  return server(event, context, callback);
};

export { handler };

if (process.env.NODE_ENV === 'dev') {
  bootstrap();
}
