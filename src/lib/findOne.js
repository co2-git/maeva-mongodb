// @flow
import Get from './Get';
import Projection from './Projection';

const findOne = (db, query, model, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = await collection.findOne(query);
      const response = {
        request: {findOne: query},
        response: results,
      };
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export default findOne;
