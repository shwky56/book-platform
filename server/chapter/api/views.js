import Chapter from '../models.js';
import { APIView } from '../../framework/index.js';


class ChapterAPIView extends APIView {
    constructor(){
        super(Chapter)
    }
    getRouter() {
        return super.getRouter();
    }
}

export default new ChapterAPIView();