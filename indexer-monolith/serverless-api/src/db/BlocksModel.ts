import { Sequelize, Model, DataTypes, Dialect } from "sequelize";
const connection = new Sequelize({
  dialect: process.env.DIALECT as Dialect,
  host: process.env.HOST,
  port: parseInt(process.env.PORT || "3306", 10),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  logging: false,
});

export class Blocks extends Model {
  async createBlock(blockNumber: number, id = 0) {
    await Blocks.upsert({ id, blockNumber }, { fields: ["blockNumber"] });
  }

  async getBlockNumber() {
    const response = await Blocks.findByPk(0);
    return response?.dataValues.blockNumber;
  }
}

Blocks.init(
  {
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
    sequelize: connection,
    modelName: "Blocks",
    schema: "Test",
  }
);
