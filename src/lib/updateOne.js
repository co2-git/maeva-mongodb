import findQuery from '../queries/find';
import updateQuery from '../queries/update';
import findOne from './findOne';

const updateOne = (db, query, updater, model, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = await collection.updateOne(
        findQuery(query),
        updateQuery(updater),
      );
      if (!results.result.ok) {
        throw new Error('Could not update many documents');
      }
      resolve(await findOne(db, query, model, options));
    } catch (error) {
      reject(error);
    }
  });

export default updateOne;
