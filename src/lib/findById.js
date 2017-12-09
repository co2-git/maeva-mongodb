import {ObjectID} from 'mongodb';
import findOne from './findOne';

const findById = (db, id, model, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const results = await findOne(db,
        [{field: '_id', operator: 'is', value: new ObjectID(id)}],
         model,
         options,
       );
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default findById;
