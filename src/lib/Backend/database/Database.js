const mongoose = require('mongoose');

class Database {
    constructor() {
        console.log('=> constructing new database connection');
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
            return true;
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            return false;
        }
    }

    async addData(data) {
        try {
            await data.save();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    async findData(model, query) {
        try {
            const result = await model.find(query);
            if (result.length == 0) return null;
            return result;
        } catch (error) {
            console.error('Error finding data in MongoDB:', error);
            return null;
        }
    }

}

let database = new Database();

module.exports = database;
