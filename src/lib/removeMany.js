import first from 'lodash/first';
import findQuery from '../queries/find';

const removeMany = (db, query, model) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = await collection.removeMany(findQuery(query));
      resolve(first(results.ops));
    } catch (error) {
      reject(error);
    }
  });

export default removeMany;
