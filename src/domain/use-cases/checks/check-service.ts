interface CheckServiceUseCase {
    execute(url:string):Promise<boolean>
}

type SuccessCallback = () => void; // en caso de exito
type ErrorCallback = (error:string) => void; // en caso  de fracaso


export class CheckService implements CheckServiceUseCase{ // caso de uso = codigo especializado en una tarea

    constructor( //Inyec. Depen. agregarle dependencias a nuestra clase para que el CheckService funcione como espero
                
        private readonly successCallback:SuccessCallback, //readonly para no cambiarlo
        private readonly errorCallback:ErrorCallback

    ){}

    async execute(url:string):Promise<boolean> {

        try {
            const req=await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }


            this.successCallback();
            return true;

        } catch (error) {
            console.log(`${error}`)


            this.errorCallback(`${error}`);
            return false;
        }
        
        

            
    }
}