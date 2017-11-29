// @flow

const findMany = (db, query, model, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = await collection.find(query).toArray();
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default findMany;
