import { Server } from "./presentation/server";


(async() => {
    await main(); //termina el main antes de hacer otros pasos
})();

function main () {
    Server.start();

}