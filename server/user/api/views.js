import User from '../models.js';
import { APIView } from '../../framework/index.js';
import UserController from './controller.js';
import { ifMyPut  } from '../permissions.js';
class UserAPIView extends APIView {
    constructor(){
        super(User, UserController)
    }
    setupRoutes(){
        this.router.put('',  ifMyPut, this.Controller.update.bind(this.Controller));
        this.router.delete('',  ifMyPut, this.Controller.destroy.bind(this.Controller));

        return super.setupRoutes()
    }
    getRouter() {
        return super.getRouter();
    }
}

export default new UserAPIView();