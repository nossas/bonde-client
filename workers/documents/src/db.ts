import { Sequelize, Model, DataTypes } from 'sequelize';

export const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite::memory:')

export const getActions = async(communityId:string, kind:string, modelAction:any, models: any) => {
    return await models.Community.findAndCountAll({
      include: {
        model: models.Mobilization,
        include: [{
          model: models.Block,
          include: [{
            model: models.Widget,
            where: {
              kind: kind
            },
            include: [{
                model: modelAction,
            }]
          }]
        }]
      },
      where: {
        id: communityId
      }
    });
}

export const check = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export const model = () => {

    class Community extends Model { }
    class Mobilization extends Model { }
    class Block extends Model { }
    class Widget extends Model { }
    class FormEntry extends Model { }
    class PressureByEmail extends Model { }
    class PressureByPhone extends Model { }
    class Donation extends Model { }
    class Activist extends Model { }
    class ActivistPressures extends Model { }

    Community.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        name: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, { underscored: true, sequelize, modelName: 'community' });

    Mobilization.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        customDomain: DataTypes.STRING,
        communityId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: 'deleted_at'
    }, { underscored: true, sequelize, modelName: 'mobilization' });

    Community.hasMany(Mobilization);
    Mobilization.belongsTo(Community);

    Block.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        mobilizationId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, { underscored: true, sequelize, modelName: 'block' });

    Mobilization.hasMany(Block);
    Block.belongsTo(Mobilization);

    Widget.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        blockId: DataTypes.STRING,
        kind: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, { underscored: true, sequelize, modelName: 'widget' });

    Block.hasMany(Widget);
    Widget.belongsTo(Block);

    FormEntry.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        activist_id : DataTypes.STRING,
        widgetId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        fields: DataTypes.HSTORE,
        updatedAt: DataTypes.DATE
     
    }, { underscored: true, sequelize, modelName: 'form_entry' });

    Widget.hasMany(FormEntry);
    FormEntry.belongsTo(Widget);

    PressureByEmail.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        targets: DataTypes.JSONB,
        widgetId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, { underscored: true, sequelize, modelName: 'activist_pressure' });

    Widget.hasMany(PressureByEmail);
    PressureByEmail.belongsTo(Widget);

    PressureByPhone.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        widgetId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, { underscored: true, sequelize, modelName: 'twilio_call' });

    Widget.hasMany(PressureByPhone);
    PressureByPhone.belongsTo(Widget);

    Donation.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        activist_id : DataTypes.STRING,
        widgetId: DataTypes.STRING,
        paymentMethod: DataTypes.STRING,
        amount: DataTypes.NUMBER,
        email: DataTypes.STRING,
        customer: DataTypes.HSTORE,
        transactionStatus: DataTypes.STRING,
        subscription: DataTypes.BOOLEAN,
        checkout_data: DataTypes.JSONB,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, { underscored: true, sequelize, modelName: 'donation' });

    Widget.hasMany(Donation);
    Donation.belongsTo(Widget);

    Activist.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        name : DataTypes.STRING,
        email: DataTypes.STRING,
        phone : DataTypes.STRING,
        document_number : DataTypes.STRING,
        document_type : DataTypes.STRING,
        city : DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, { underscored: true, sequelize, modelName: 'activist' });
    
    ActivistPressures.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        activist_id : DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, { underscored: true, sequelize, modelName: 'activist_pressures' });
    
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
        ActivistPressures
    };
};