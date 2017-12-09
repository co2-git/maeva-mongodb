import {ObjectID} from 'mongodb';
import findByIds from './findByIds';
import updateQuery from '../queries/update';

export default function updateByIds(db, ids, updater, model, options) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const result = await collection.updateMany(
        {_id: {$in: ids.map(id => new ObjectID(id))}},
        updateQuery(updater),
        options,
      );
      if (!result.result.ok || !result.result.nModified) {
        reject(new Error('Could not update'));
      } else {
        const found = await findByIds(db, ids, model, options);
        resolve(found);
      }
    } catch (error) {
      reject(error);
    }
  });
}
