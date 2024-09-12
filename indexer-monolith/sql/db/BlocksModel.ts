import { Sequelize, Model, DataTypes } from "sequelize";
const connection = new Sequelize({
  dialect: "mysql",
  host: "database-1.co9muppsw2mx.us-east-1.rds.amazonaws.com",
  port: 3306,
  username: "admin",
  password: "",
  database: "Test",
});

export class Blocks extends Model {
  
  async syncTable() {
    // This is to create and apply changes
    // Not ideal, should use a migration tool to manage this but ok for a poc timebeing :).
    await Blocks.sync({ alter: true });
  }
}

Blocks.init(
  {
    // Model attributes are defined here
    blockNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    // Other model options go here
    sequelize: connection, // We need to pass the connection instance
    modelName: "Blocks", // We need to choose the model name
    schema: "Test",
  }
);
