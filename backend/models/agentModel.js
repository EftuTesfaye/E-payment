module.exports=(sequelize,DataTypes)=>{
    const Agents = sequelize.define("Agents",{
        agentBIN:{
            type: DataTypes.STRING,
            allowNUll:false,
            //primarykey: true,
            //unique:true,
        },

        agentName:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        agentEmail:{
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
               validate: {
               isEmail: true,
             },
            },
    
        servicesOffered:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        phoneNumber:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        agentAuthorizationLetter: {
            type: DataTypes.STRING,
            allowNull: false
        }


    })
    return Agents;
}

