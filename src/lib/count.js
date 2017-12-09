import findQuery from '../queries/find';

export default function count(db, query, model, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const results = collection.count(findQuery(query));
      resolve(results);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
