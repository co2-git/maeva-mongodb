import findQuery from '../queries/find';
import updateQuery from '../queries/update';
import findMany from './findMany';

const updateMany = (db, query, updater, model, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = await collection.updateMany(
        findQuery(query),
        updateQuery(updater),
      );
      if (!results.result.ok) {
        throw new Error('Could not update many documents');
      }
      resolve(await findMany(db, query, model, options));
    } catch (error) {
      reject(error);
    }
  });

export default updateMany;
