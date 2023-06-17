import { Sequelize, Model, DataTypes, Op, Dialect } from "sequelize";
import { convertFromBase64toHex } from "../utils";
const connection = new Sequelize({
  dialect: process.env.DIALECT as Dialect,
  host: process.env.HOST,
  port: parseInt(process.env.PORT || "3306", 10),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  logging: false,
});

export class Transaction extends Model {
  async insertTx(txs: any[]) {
    // This is to create and apply changes
    // Not ideal, should use a migration tool to manage this but ok for a poc timebeing :).
    await Transaction.bulkCreate(txs);
  }

  async getTransactions(addresses: string[], limit: number, offset: number) {
    const response = await Transaction.findAll({
      where: {
        [Op.or]: {
          to: addresses,
          from: addresses,
        },
      },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });
    const results = response.map((x) => {
      return {
        to: convertFromBase64toHex(x.dataValues.to),
        from: convertFromBase64toHex(x.dataValues.from),
        txHash: convertFromBase64toHex(x.dataValues.txHash),
        blockHash: convertFromBase64toHex(x.dataValues.blockHash),
        blockNumber: x.dataValues.blockNumber,
        value: x.dataValues.value,
        gasPrice: x.dataValues.gasPrice,
        gasLimit: x.dataValues.gasLimit,
        data: convertFromBase64toHex(x.dataValues.data),
        nonce: x.dataValues.nonce,
        network: x.dataValues.network,
      };
    });
    return { results, limit, offset: limit + offset };
  }
}

Transaction.init(
  {
    // Model attributes are defined here
    txHash: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blockHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blockNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gasPrice: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gasLimit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nonce: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    network: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    sequelize: connection, // We need to pass the connection instance
    modelName: "Transaction", // We need to choose the model name
    schema: "Test",
    indexes: [
      {
        name: "tx_hash_idx",
        using: "BTREE",
        fields: ["txHash"],
      },
      {
        name: "from_idx",
        using: "BTREE",
        fields: ["from"],
      },
      {
        name: "to_idx",
        using: "BTREE",
        fields: ["to"],
      },
      {
        name: "to_net_idx",
        using: "BTREE",
        fields: ["to", "network"],
      },
      {
        name: "from_net_idx",
        using: "BTREE",
        fields: ["from", "network"],
      },
    ],
  }
);
