import {ObjectID} from 'mongodb';
import findById from './findById';
import updateQuery from '../queries/update';

export default function updateById(db, id, updater, model, options) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const query = updateQuery(updater);
      const result = await collection.updateOne(
        {_id: new ObjectID(id)},
        query,
        options,
      );
      if (!result.result.ok || !result.result.nModified) {
        reject(new Error([
          '@maeva/mongdob:',
          'Nothing to update model with! (',
          JSON.stringify({model: model.name, query, id}),
          ')'
        ].join(' ')));
      } else {
        const found = await findById(db, id, model, options);
        resolve(found);
      }
    } catch (error) {
      reject(error);
    }
  });
}
