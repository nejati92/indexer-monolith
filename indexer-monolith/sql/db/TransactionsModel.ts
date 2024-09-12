import { Sequelize, Model, DataTypes } from "sequelize";
const connection = new Sequelize({
  dialect: "mysql",
  host: "database-1.co9muppsw2mx.us-east-1.rds.amazonaws.com",
  port: 3306,
  username: "admin",
  password: "",
  database: "Test",
});

export class Transaction extends Model {
  async syncTable() {
    // This is to create and apply changes
    // Not ideal, should use a migration tool to manage this but ok for a poc timebeing :).
    await Transaction.sync({ alter: true });
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
      {
        name: "fb_idx",
        using: "BTREE",
        fields: ["blockNumber"],
      },
    ],
  }
);
