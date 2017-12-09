import findQuery from '../queries/find';
import findOne from './findOne';

const removeOne = (db, query, model, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const found = await findOne(db, query, model, options);
      const results = await collection.removeOne(findQuery(query));
      if (!results.result.ok) {
        throw new Error('Could not remove one document');
      }
      resolve(found);
    } catch (error) {
      reject(error);
    }
  });

export default removeOne;
