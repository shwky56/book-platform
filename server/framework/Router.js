import  express from "express";


class Router {
    constructor(Controller) {
        this.router = express.Router();
        this.Controller = Controller;

        this.setupRoutes();
    }

    setupRoutes() {
        // Define routes for controller
        this.router.get('', this.Controller.index.bind(this.Controller));
        this.router.get('/search', this.Controller.search.bind(this.Controller))
        this.router.get('/:id', this.Controller.show.bind(this.Controller));
        this.router.post('',  this.Controller.store.bind(this.Controller));
        this.router.put('/:id', this.Controller.update.bind(this.Controller));
        this.router.delete('/:id', this.Controller.destroy.bind(this.Controller));
    }

    getRouter() {
        return this.router;
    }
}

export default Router;
