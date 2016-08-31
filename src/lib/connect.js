import mongodb, {Db, MongoClient} from 'mongodb';
import insert from './insert';
import find from './find';
import findOne from './findOne';

const maevaConnectMongoDB = (url) => (conn) => new Promise(
  async (resolve, reject) => {
    try {
      conn.db = await MongoClient.connect(url);
      conn.operations = {
        insert: (inserter) => insert(conn, inserter),
        find: (finder, options) => find(conn, finder, options),
        findOne: (finder, options) => findOne(conn, finder, options),
      };
      conn.disconnectDriver = () => new Promise(async (resolve) => {
        await conn.db.close();
        resolve();
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  }
);

export default maevaConnectMongoDB;
