import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";


(async() => {
    await main(); //termina el main antes de hacer otros pasos
})();

async function main () {


    await MongoDatabase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     },
    // });

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'MEDIUM'
    //     }
    // });

    Server.start();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //Crear un coleccion = tables, documeno = registro
    // const newLog = await LogModel.create({
        //     message: 'Test message from Mongo',
        //     origin: 'App.ts',
        //     level: 'low'
        // });
        
        // await newLog.save();
        // console.log(newLog);
        
        // const logs = await LogModel.find();
        // console.log(logs);
        
        

}    