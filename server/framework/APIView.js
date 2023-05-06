
import { Router, Controller } from "./index.js";

class APIView extends Router{
    constructor(model, controller=null){
        if(controller === null){
            controller = new Controller(model);
        }
        super( controller )
    }
} 

export default APIView;