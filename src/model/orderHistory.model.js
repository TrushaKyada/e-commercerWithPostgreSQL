module.exports = (sequelize,Sequelize) => {
    const orderHistory = sequelize.define("orderHistory",{
        order_ID:{
            type:Sequelize.INTEGER,
            allowNull : true,
            references:{
                model:"orders",
                key:"id"
            }
        },
        product_ID:{
            type:Sequelize.INTEGER,
            allowNull : true,
            references:{
                model:"products",
                key:"id"
            }
        },
        user_ID:{
            type:Sequelize.INTEGER,
            allowNull:true,
            references:{
                model:"users",
                key:"id"
            }
        },
        qty:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        price:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        total_price:{
            type:Sequelize.INTEGER,
            allowNull:true,
        },
        orderCreatedDate:{
            type:Sequelize.DATE,
            allowNull:true,
        }
    
    },{timeStamp:true});
    return orderHistory;
}