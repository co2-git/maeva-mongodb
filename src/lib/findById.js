import findOne from './findOne';

const findById = (db, id, model, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const results = await findOne(db,
        [{field: '_id', operator: 'is', value: id, type: 'link'}],
         model,
         options,
       );
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default findById;
