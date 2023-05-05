module.exports = (sequelize,Sequelize) => {
    const addToCart = sequelize.define("addToCart",{
        user_ID:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{
                model:"users",
                key:"id"
            }
        },
        product_info:{
            type:Sequelize.JSON({
                product_ID:{
                    type:Sequelize.INTEGER,
                    allowNull : false,
                    references:{
                        model:"products",
                        key:"id"
                    }
                },
                qty:{
                    type:Sequelize.INTEGER,
                    allowNull:false,
                },
                price:{
                    type:Sequelize.INTEGER,
                    allowNull:false
                },
                total_price:{
                    type:Sequelize.INTEGER,
                    allowNull:false
                }
            }),
            allowNull:false
        }
        
    });
    return addToCart;
}