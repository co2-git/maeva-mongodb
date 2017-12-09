import {ObjectID} from 'mongodb';
import removeOne from './removeOne';

const removeById = (db, id, model, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const results = await removeOne(db,
        [{field: '_id', operator: 'is', value: new ObjectID(id)}],
         model,
         options,
       );
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default removeById;
