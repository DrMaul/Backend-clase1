import { CustomRouter } from "./CustomRouter";

export class sessionsRouter extends CustomRouter{

    init(){

        this.post("/",passport.authenticate)
    }
}