import mongodb, {Db, MongoClient, ObjectID} from 'mongodb';
import insert from './insert';
import find from './find';
import findOne from './findOne';
import update from './update';

const maevaConnectMongoDB = (url) => (conn) => new Promise(
  async (resolve, reject) => {
    try {
      conn.db = await MongoClient.connect(url);
      conn.operations = {
        insert: (inserter) => insert(conn, inserter),
        find: (finder, options) => find(conn, finder, options),
        findOne: (finder, options) => findOne(conn, finder, options),
        update: (updater) => findOne(conn, updater),
      };
      conn.disconnectDriver = () => new Promise(async (resolve) => {
        await conn.db.close();
        resolve();
      });
      conn.id = {
        name: '_id',
        type: ObjectID,
      };
      resolve();
    } catch (error) {
      reject(error);
    }
  }
);

export default maevaConnectMongoDB;
