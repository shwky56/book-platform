import Request from '../models.js';
import { APIView } from '../../framework/index.js';


class RequestAPIView extends APIView {
    constructor(){
        super(Request)
    }
    getRouter() {
        return super.getRouter();
    }
}

export default new RequestAPIView();