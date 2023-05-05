module.exports = (sequelize,Sequelize) => {
    const product = sequelize.define("product",{
        name:{
            type:Sequelize.STRING
        },
        qty:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        price:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        image:{
            type:Sequelize.STRING,
            allowNull:false
        }
    });
    return product;
}