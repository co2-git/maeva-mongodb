import {MongoClient, ObjectID} from 'mongodb';
import EventEmitter from 'events';
import URL from 'url';

import count from './count';
import findById from './findById';
import findByIds from './findByIds';
import findMany from './findMany';
import findOne from './findOne';
import insertMany from './insertMany';
import insertOne from './insertOne';
import removeById from './removeById';
import removeByIds from './removeByIds';
import removeMany from './removeMany';
import removeOne from './removeOne';
import updateById from './updateById';
import updateByIds from './updateByIds';
import updateMany from './updateMany';
import updateOne from './updateOne';

const convert = (value) => {
  try {
    if (value && typeof value === 'object' && value._id) {
      return new ObjectID(value._id);
    }
    return new ObjectID(value);
  } catch (error) {
    return value;
  }
};

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
      findById: (id, model) => findById(db, id, model),
      findByIds: (ids, model) => findByIds(db, ids, model),
      findMany: (query, model, options) => findMany(db, query, model, options),
      findOne: (query, model) => findOne(db, query, model),
      insertMany: (candidate, model, options) =>
        insertMany(db, candidate, model, options),
      insertOne: (candidate, model, options) =>
        insertOne(db, candidate, model, options),
      removeById: (id, model) => removeById(db, id, model),
      removeByIds: (ids, model) => removeByIds(db, ids, model),
      removeOne: (query, model, options) =>
        removeOne(db, query, model, options),
      removeMany: (query, model) => removeMany(db, query, model),
      updateById: (id, updater, model, options) =>
        updateById(db, id, updater, model, options),
      updateByIds: (ids, updater, model, options) =>
        updateByIds(db, ids, updater, model, options),
      updateMany: (query, updater, model, options) =>
        updateMany(db, query, updater, model, options),
      updateOne: (query, updater, model, options) =>
        updateOne(db, query, updater, model, options),
    },
    emitter,
    id: {
      name: '_id',
      type: {
        name: 'mongodbObjectID',
        convert,
        validate: (value) => {
          if (!value instanceof ObjectID) {
            throw new Error('id must be an object id');
          }
        },
      },
      isEqual: (idA, idB) => {
        const _idA = convert(idA);
        const _idB = convert(idB);
        return _idA.equals(_idB);
      },
    },
  };
};

export default maevaConnectMongoDB;
