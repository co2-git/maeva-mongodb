import {MongoClient} from 'mongodb';
import count from './count';
import find from './find';
import findById from './findById';
import findOne from './findOne';
import insert from './insert';
import ObjectId from './types/ObjectId';
import remove from './remove';
import removeById from './removeById';
import update from './update';
import updateById from './updateById';
import updateOne from './updateOne';

const maevaConnectMongoDB = (url) => (conn) => new Promise(
  async (resolve, reject) => {
    try {
      conn.db = await MongoClient.connect(url);
      conn.operations = {
        insert: (inserter) => insert(conn, inserter),
        count: (finder, options) => count(conn, finder, options),
        find: (finder, options) => find(conn, finder, options),
        findOne: (finder, options) => findOne(conn, finder, options),
        findById: (finder, options) => findById(conn, finder, options),
        update: (updater) => update(conn, updater),
        updateOne: (updater) => updateOne(conn, updater),
        updateById: (updater) => updateById(conn, updater),
        remove: (remover) => remove(conn, remover),
        removeById: (remover) => removeById(conn, remover),
      };
      conn.disconnectDriver = ::conn.db.close;
      conn._id = {
        name: '_id',
        type: ObjectId,
      };
      conn.schema = {
        _id: ObjectId,
      };
      resolve();
    } catch (error) {
      reject(error);
    }
  }
);

export default maevaConnectMongoDB;
