module.exports= (sequelize,Sequelize) => {
    const order = sequelize.define("order",{
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
        status:{
            type:Sequelize.INTEGER,
            allowNull:false,
            defaultValue:1
            //1:viewed
            //2:Inprocess
            //3:delivered
            //4:paid
            //5:returned
            //6:closed
        },
    
    },{
        timeStamp:true
    });
    return order;
}