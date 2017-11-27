// @flow

const findOne = (db, query, model, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = await collection.findOne(query);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default findOne;
