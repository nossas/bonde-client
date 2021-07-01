const { Pool } = require("pg");
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL || "sqlite::memory:");
const pool = new Pool();

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
  },
  async getClient() {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error("A client has been checked out for more than 5 seconds!");
      console.error(
        `The last executed query on this client was: ${client.lastQuery}`
      );
    }, 5000);
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args;
      return query.apply(client, args);
    };
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout);
      // set the methods back to their old un-monkey-patched version
      client.query = query;
      client.release = release;
      return release.apply(client);
    };
    return client;
  },
  async check() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  },
  model() {
    class Community extends Model {}
    class Mobilization extends Model {}
    class Block extends Model {}
    class Widget extends Model {}
    class FormEntry extends Model {}
    class PressureByEmail extends Model {}
    class PressureByPhone extends Model {}
    class Donation extends Model {}
    class Activist extends Model {}

    Community.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        name: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      { underscored: true, sequelize, modelName: "community" }
    );

    Mobilization.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        customDomain: DataTypes.STRING,
        communityId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: "deleted_at",
      },
      { underscored: true, sequelize, modelName: "mobilization" }
    );

    Community.hasMany(Mobilization);
    Mobilization.belongsTo(Community);

    Block.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        mobilizationId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      { underscored: true, sequelize, modelName: "block" }
    );

    Mobilization.hasMany(Block);
    Block.belongsTo(Mobilization);

    Widget.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        blockId: DataTypes.STRING,
        kind: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      { underscored: true, sequelize, modelName: "widget" }
    );

    Block.hasMany(Widget);
    Widget.belongsTo(Block);

    FormEntry.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        widgetId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        fields: DataTypes.HSTORE,
        updatedAt: DataTypes.DATE,
      },
      { underscored: true, sequelize, modelName: "form_entry" }
    );

    Widget.hasMany(FormEntry);
    FormEntry.belongsTo(Widget);

    PressureByEmail.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        targets: DataTypes.JSONB,
        widgetId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      { underscored: true, sequelize, modelName: "activist_pressure" }
    );

    Widget.hasMany(PressureByEmail);
    PressureByEmail.belongsTo(Widget);

    PressureByPhone.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        widgetId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      { underscored: true, sequelize, modelName: "twilio_call" }
    );

    Widget.hasMany(PressureByPhone);
    PressureByPhone.belongsTo(Widget);

    Donation.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        widgetId: DataTypes.STRING,
        paymentMethod: DataTypes.STRING,
        amount: DataTypes.NUMBER,
        email: DataTypes.STRING,
        customer: DataTypes.HSTORE,
        transactionStatus: DataTypes.STRING,
        subscription: DataTypes.BOOLEAN,
        checkout_data: DataTypes.JSONB,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      { underscored: true, sequelize, modelName: "donation" }
    );

    Widget.hasMany(Donation);
    Donation.belongsTo(Widget);

    Activist.init(
      {
        id: { type: DataTypes.UUID, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        whatsapp: DataTypes.STRING,
        document_number: DataTypes.INTEGER,
        document_type: DataTypes.STRING,
        city: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        state: DataTypes.STRING,
        tags: DataTypes.TEXT,
        community_id: DataTypes.INTEGER,
        events_data_form_entries: DataTypes.JSONB,
        events_data_donations: DataTypes.JSONB,
        events_data_pressure: DataTypes.JSONB,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      { underscored: true, sequelize, modelName: "activist" }
    );

    return {
      Community,
      Mobilization,
      Block,
      Widget,
      FormEntry,
      PressureByEmail,
      PressureByPhone,
      Donation,
      Activist,
    };
  },
};
