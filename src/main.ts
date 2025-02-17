import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

async function start() {
    const port = process.env.port || 5000;
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Advanced back-end')
        .setDescription('Документація REST Api')
        .setVersion('1.0.0')
        .addTag('yurii')
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)
    // глобальний гвард
    // app.useGlobalGuards(JwtAuthGuard) 

    // глобальний пайп
    // app.useGlobalPipes(new Validation()) 


    await app.listen(port, () => {
        console.log('server works on '+port)
    })
}

start()