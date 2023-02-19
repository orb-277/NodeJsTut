const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

module.exports = mongoose.model('Product',productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// const ObjectId = mongodb.ObjectId;
// class Product{
//     constructor(title,price,imageUrl,description,id,userId){
//         this.title = title;
//         this.price = price;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
        
//     }
//     save(){
//         const db = getDb();
//         let dbOp;
//         if(this._id){
//             dbOp = db.collection('products').updateOne({_id: this._id},{$set: this});


//         }
//         else{
//             dbOp = db.collection('products').insertOne(this);

//         }
//         return dbOp
//         .then(res => {
//             console.log(res);
//         })
//         .catch(err => {
//             console.log(err);
//         });
        

//     }
//     static fetchAll(){
//         const db = getDb();
//         return db.collection('products').find().toArray()
//         .then(products => {
//             console.log(products);
//             return products;
//         })
//         .catch(e =>{console.log(e)});
//     }
//     static findById(prodId){
//         const db = getDb();
//         return db.collection('products').findOne({_id:new ObjectId(prodId)})
//         .then(products => {
//             console.log(products);
//             return products;
//         })
//         .catch(e =>{console.log(e)});
//     }
//     static deleteById(prodId){
//         const db = getDb();
//         return db.collection('products').deleteOne({_id:new ObjectId(prodId)})
//         .then(products => {
//             console.log('deleted');
//         })
//         .catch(e =>{console.log(e)});
//     }
    
// }


// module.exports = Product;