const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (cb) =>{
    MongoClient.connect('mongodb+srv://uS4EW6eafU9wWumd:Mongo-pass@cluster0.iokx3p2.mongodb.net/?retryWrites=true&w=majority')
    .then(res => {
        console.log('Connected');
        _db = res.db();
        cb(res);
    })
    .catch(err => {
        console.log(err);
    });
}

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No db';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

