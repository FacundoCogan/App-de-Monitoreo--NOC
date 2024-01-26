import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url:string):Promise<boolean>
}

type SuccessCallback = (() => void) | undefined; // en caso de exito
type ErrorCallback = ((error:string) => void) | undefined; // en caso  de fracaso


export class CheckService implements CheckServiceUseCase{ // caso de uso = codigo especializado en una tarea

    constructor(
         //Inyec. Depen. agregarle dependencias a nuestra clase para que el CheckService funcione como espero
        private readonly logRepository: LogRepository,
        private readonly successCallback:SuccessCallback, //readonly para no cambiarlo
        private readonly errorCallback:ErrorCallback

    ){}

    async execute(url:string):Promise<boolean> {

        try {
            const req=await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }

            const log=new LogEntity({level:LogSeverityLevel.low,
                message: `Service ${url} working`,
                origin:'check-service.ts'
            });

            this.logRepository.saveLog(log)
            if(this.successCallback)
                this.successCallback();

            return true;
        } catch (error) {

            const errorMessage = `${url} is not ok. ${error}`;
            const log=new LogEntity({level:LogSeverityLevel.high,
                message: errorMessage,
                origin:'check-service.ts'
            });
            this.logRepository.saveLog(log);

            if(this.errorCallback)
                this.errorCallback(errorMessage);
            
            return false;
        }
        
        

            
    }
}