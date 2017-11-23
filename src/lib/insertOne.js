// @flow
import first from 'lodash/first';

const insertOne: MaevaConnectorAction = (db, candidate, model) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = await collection.insertOne(candidate);
      resolve(first(results.ops));
    } catch (error) {
      reject(error);
    }
  });

export default insertOne;
