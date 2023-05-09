import Search from "../models.js";

import { APIView } from '../../framework/index.js';
import SearchController from './controller.js'

class SearchAPIView extends APIView {
    constructor(){
        super(Search, SearchController)
    }
    setupRoutes(){
        this.router.get('/filter',  this.Controller.filter.bind(this.Controller));
        return super.setupRoutes()
    }
    getRouter() {
        return super.getRouter();
    }
}

export default new SearchAPIView();