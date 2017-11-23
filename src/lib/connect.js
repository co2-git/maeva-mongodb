// @flow
import {MongoClient} from 'mongodb';
import EventEmitter from 'events';
import URL from 'url';

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
      findOne: (query, model) => findOne(db, query, model),
      insertOne: (candidate, model, options) =>
        insertOne(db, candidate, model, options),
    },
    emitter,
    name: 'mongodb',
  };
};

export default maevaConnectMongoDB;
