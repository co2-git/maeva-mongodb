import findQuery from '../queries/find';
import findMany from './findMany';

const removeMany = (db, query, model, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const found = await findMany(db, query, model, options);
      const results = await collection.removeMany(findQuery(query));
      if (!results.result.ok) {
        throw new Error('Failed to remove many documents');
      }
      resolve(found);
    } catch (error) {
      reject(error);
    }
  });

export default removeMany;
