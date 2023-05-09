import Request from '../models.js';
import { APIView } from '../../framework/index.js';
import RequestController from './controller.js'
import { ifMyRequest } from '../permissions.js';

class RequestAPIView extends APIView {
    constructor(){
        super(Request, RequestController)
    }
    setupRoutes(){
        this.router.get('/filter',  this.Controller.filter.bind(this.Controller));
        this.router.post('',  ifMyRequest, this.Controller.store.bind(this.Controller));
        return super.setupRoutes()
    }
    getRouter() {
        return super.getRouter();
    }
}

export default new RequestAPIView();