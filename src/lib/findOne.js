import findQuery from '../queries/find';

const findOne = (db, query, model) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = await collection.findOne(findQuery(query));
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default findOne;
