const Sequelize = require('sequelize');
const sql = require('../util/database');

const OrderItem = sql.define('orderItem',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
    
});
module.exports = OrderItem;