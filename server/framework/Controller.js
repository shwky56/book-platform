import status from "./status.js";




class IndexController {
    constructor(Model) {
        this.Model = Model;
    }

    async index(req, res) {
        try {
            const all = await this.Model.all();
            res.status(status.HTTP_200_OK).json(all);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ error: "Server error" });
        }
    }
}


class ShowController {
    constructor(Model) {
        this.Model = Model;
    }

    

    async show(req, res) {
        try {
            const obj = await this.Model.get(req.params.id);
            if (!obj) {
                res.status(status.HTTP_404_NOT_FOUND).json({ error: `${this.Model.constructor.name} not found` });
            } else {
                res.status(status.HTTP_200_OK).json(obj);
            }
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ error: "Server error" });
        }
    }
}


class Controller extends IndexController{
    constructor(Model) {
        super(Model)
        this.Model = Model;
    }

    

    async show(req, res) {
        try {
            const obj = await this.Model.get(req.params.id);
            if (!obj) {
                res.status(status.HTTP_404_NOT_FOUND).json({ error: `${this.Model.constructor.name} not found` });
            } else {
                res.status(status.HTTP_200_OK).json(obj);
            }
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ error: "Server error" });
        }
    }

    async search(req, res) {
        try {
            const searchQuery = await req.query;
            const keys = Object.keys(searchQuery)
            const search = await this.Model.search(keys[0], searchQuery[keys[0]]);
            if(!search[0]){
                res.status(status.HTTP_404_NOT_FOUND).json({ massage: `${keys[0]} = ${searchQuery[keys[0]]} not found`});
            }
            else{
                res.status(status.HTTP_200_OK).json(search)
            }
        } catch (err) {
            res.send(err.message)
        }
    }

    async store(req, res) {
        try {
            const data = req.body;
            const objId = await this.Model.create(data);
            res.status(201).json({ id: objId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            await this.Model.update(req.params.id, data);
            res.status(200).json({ message: `${this.Model.constructor.name} updated` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    }

    async destroy(req, res) {
        try {
            await this.Model.delete(req.params.id);
            res.status(200).json({ message: `${this.Model.constructor.name} deleted` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    }
}

export default Controller;
