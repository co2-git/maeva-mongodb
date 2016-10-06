import mongodb, {Db, MongoClient} from 'mongodb';
import ObjectId from './types/ObjectId';
import insert from './insert';
import find from './find';
import findOne from './findOne';
import findById from './findById';
import update from './update';
import updateOne from './updateOne';
import updateById from './updateById';
import remove from './remove';

const maevaConnectMongoDB = (url) => (conn) => new Promise(
  async (resolve, reject) => {
    try {
      conn.db = await MongoClient.connect(url);
      conn.operations = {
        insert: (inserter) => insert(conn, inserter),
        find: (finder, options) => find(conn, finder, options),
        findOne: (finder, options) => findOne(conn, finder, options),
        findById: (finder, options) => findById(conn, finder, options),
        update: (updater) => update(conn, updater),
        updateOne: (updater) => updateOne(conn, updater),
        updateById: (updater) => updateById(conn, updater),
        remove: (remover) => remove(conn, remover),
      };
      conn.disconnectDriver = () => new Promise(async (resolve) => {
        await conn.db.close();
        resolve();
      });
      conn.id = {
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
