const express = require('express')
const cors = require('cors')
const app = express()
const { connect } = require('./db')
const { getAll, getOne,editUser,createUser,deleteUser } = require('./controllers/users')

class App {
    constructor() {
        this.initApp()
        this.routes()
        this.initDatabase()
    }

    initApp() {
        app.use(cors())
        app.use(express.json());
    }

    routes() {
        // Routes
        app.get('/', getAll);
        app.get('/find',getOne);
        app.post('/',createUser);
        app.put('/',editUser);
        app.delete('/',deleteUser);
    }

    initDatabase() {
        connect('mongodb+srv://AdminEndava:Endava2021@endava.yyroa.mongodb.net/Endava?retryWrites=true&w=majority')
    }

    initServer(port) {
        app.listen(port, () => {
            console.log(`Server Listening on http://localhost:${port}`);
        });
    }
}

module.exports = App
