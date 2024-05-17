'use server';

const mongoose = require('mongoose');

async function connect() {
    if (mongoose.connection.readyState === 1) {
        console.log('Already connected to MongoDB');
        return true;
    }
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

async function addData(data) {
    try {
        await data.save();
        return true;
    }
    catch (error) {
        return false;
    }
}

async function findData(model, query, limit = null) {
    let queryData = model.find(query);
    if (limit) queryData = queryData.limit(limit);
    try {
        let result = await queryData;
        if (result.length == 0) return null;
        return result;
    }
    catch (error) {
        console.error('Error finding data in MongoDB:', error);
        return null;
    }
}

async function findAndUpdate(model, query, update) {
    try {
        const result = await model.findOneAndUpdate(query, update, { new: true });
        if (result == null) return null;
        return result;
    }
    catch (error) {
        console.error('Error finding and updating data in MongoDB:', error);
        return null;
    }
}

async function aggregateData(model, pipeline) {
    try {
        const result = await model.aggregate(pipeline);
        if (result.length === 0) return null;
        return result;
    } catch (error) {
        console.error('Error aggregating data in MongoDB:', error);
        return null;
    }
}


module.exports = { connect, addData, findData, findAndUpdate, aggregateData }
