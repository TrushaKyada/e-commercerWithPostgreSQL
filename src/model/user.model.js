module.exports = (sequelize,Sequelize) => {
    const user = sequelize.define("user",{
        fullname:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false
        },
        mobile:{
            type:Sequelize.STRING,
            allowNull:false
        },
        address:{
            type:Sequelize.STRING,
            allowNull:false
        },
        token:{
            type:Sequelize.STRING,
            allowNull:true
        }
    });
    return user;
}