import findQuery from '../queries/find';

const findMany = (db, query = {}, model, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection(model.name);
      const operation = collection.find(findQuery(query));
      if (options.range) {
        if (Array.isArray(options.range)) {
          operation
            .skip(options.range[0])
            .limit(options.range[1]);
        } else if (typeof options.range === 'number') {
          operation.limit(options.range);
        }
      }
      const results = await operation.toArray();
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default findMany;
