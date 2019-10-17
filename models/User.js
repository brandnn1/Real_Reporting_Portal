
const bcrypt = require("bcrypt");



module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        isEmail: true
      },
      password: {
        type: DataTypes.STRING
      },
      
    },
    {
      freezeTableName: false,
      instanceMethods: {
          validPassword(password) {
            console.log('you dont know anything')
            return true;
              // return bcrypt.compare(password, this.password);
          }
      }
    });
    
    return User;
  }
