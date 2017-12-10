import first from 'lodash/first';
import insertQuery from '../queries/insert';

const insertOne = (db, document, model) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = await collection.insertOne(insertQuery(document));
      resolve(first(results.ops));
    } catch (error) {
      reject(error);
    }
  });

export default insertOne;
