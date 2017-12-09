import {ObjectID} from 'mongodb';
import removeMany from './removeMany';

const removeByIds = (db, ids, model, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const results = await removeMany(db,
        [{
          field: '_id',
          operator: 'in',
          value: ids.map(id => new ObjectID(id))
        }],
         model,
         options,
       );
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default removeByIds;
