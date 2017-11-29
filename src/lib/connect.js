// @flow
import {MongoClient, ObjectID} from 'mongodb';
import EventEmitter from 'events';
import URL from 'url';

import findMany from './findMany';
import findOne from './findOne';
import insertOne from './insertOne';

const maevaConnectMongoDB = (url: ?string): MaevaConnector => {
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
    actions: {
      connect,
      disconnect,
      findMany: (query, model) => findMany(db, query, model),
      findOne: (query, model) => findOne(db, query, model),
      insertOne: (candidate, model, options) =>
        insertOne(db, candidate, model, options),
    },
    emitter,
    id: {
      name: '_id',
      type: {
        convert: (value) => {
          try {
            return new ObjectID(value);
          } catch (error) {
            return value;
          }
        },
        validate: (value) => {
          return value instanceof ObjectID;
        }
      }
    },
    name: 'mongodb',
  };
};

export default maevaConnectMongoDB;
