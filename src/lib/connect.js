import {MongoClient, ObjectID} from 'mongodb';
import EventEmitter from 'events';
import URL from 'url';

import count from './count';
import findMany from './findMany';
import findOne from './findOne';
import findById from './findById';
import insertOne from './insertOne';
import insertMany from './insertMany';
import updateById from './updateById';
import removeMany from './removeMany';

const maevaConnectMongoDB = (url) => {
  if (url) {
    const {protocol} = URL.parse(url);
    if (protocol !== 'mongodb:') {
      throw new Error(`Expected mongodb: protocol, got ${protocol} in ${url}`);
    }
  }
  let db;
  const emitter = new EventEmitter();
  const connect = async () => {
    try {
      db = await MongoClient.connect(url);
      emitter.emit('connected');
    } catch (error) {
      emitter.emit('error', error);
    }
  };
  const disconnect = async () => {
    try {
      await db.close();
      emitter.emit('disconnected');
    } catch (error) {
      emitter.emit('error', error);
    }
  };
  return {
    name: 'mongodb',
    actions: {
      connect,
      disconnect,
      count: (query, model) => count(db, query, model),
      findMany: (query, model) => findMany(db, query, model),
      findOne: (query, model) => findOne(db, query, model),
      findById: (id, model) => findById(db, id, model),
      insertOne: (candidate, model, options) =>
        insertOne(db, candidate, model, options),
      insertMany: (candidate, model, options) =>
        insertMany(db, candidate, model, options),
      updateById: (id, updater, model, options) =>
        updateById(db, id, updater, model, options),
      removeMany: (query, model) => removeMany(db, query, model)
    },
    emitter,
    id: {
      name: '_id',
      type: {
        name: 'mongodbObjectID',
        convert: (value) => {
          try {
            if (value && typeof value === 'object' && value._id) {
              return new ObjectID(value._id);
            }
            return new ObjectID(value);
          } catch (error) {
            return value;
          }
        },
        validate: (value) => {
          if (!value instanceof ObjectID) {
            throw new Error('id must be an object id');
          }
        }
      }
    },
  };
};

export default maevaConnectMongoDB;
