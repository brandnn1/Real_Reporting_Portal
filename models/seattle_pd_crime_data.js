/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Data =  sequelize.define('seattle_pd_crime_data', {
    id :{
      type:DataTypes.INTEGER(11),
      allowNull:false
    },
    RMS_CDW_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    General_Offense_Number: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Offense_Code: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Offense_Code_Extension: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Offense_Type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Summary_Offense_Code: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Summarized_Offense_Description: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Date_Reported: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Occurred_Date_or_Date_Range_Start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Occurred_Date_Range_End: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Hundred_Block_Location: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    District_Sector: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Zone_Beat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Date_Occurred: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Date_Occurred_End: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  }, {
    tableName: 'seattle_pd_crime_data',
    freezeTableName: true
      
  });
  return Data;
};
