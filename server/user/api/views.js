import User from '../models.js';
import { APIView } from '../../framework/index.js';


class UserAPIView extends APIView {
    constructor(){
        super(User)
    }
    getRouter() {
        return super.getRouter();
    }
}

export default new UserAPIView();