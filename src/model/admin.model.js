module.exports = (sequelize,Sequelize) => {
    const admin = sequelize.define("admin",{
        name:{
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
        mobile_no:{
            type:Sequelize.STRING,
            allowNull:false
        },
        token:{
            type:Sequelize.STRING,
            allowNull:true
        }
    });
    return admin;
}