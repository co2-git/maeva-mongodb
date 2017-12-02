import {ObjectID} from 'mongodb';
import findById from './findById';

export default function updateById(db, id, updater, model, options) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const result = await collection.updateOne(
        {_id: ObjectID(id)},
        {$set: updater},
        options,
      );
      if (!result.result.ok || !result.result.nModified) {
        reject(new Error('Could not update'));
      } else {
        const found = await findById(db, id, model, options);
        resolve(found);
      }
    } catch (error) {
      reject(error);
    }
  });
}
