import {ObjectID} from 'mongodb';
import findMany from './findMany';

const findByIds = (db, ids, model, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const results = await findMany(db,
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

export default findByIds;
