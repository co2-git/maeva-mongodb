import FindStatement from './FindStatement';

export default function find(conn, finder) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = conn.db.collection(finder.collection);
      const cursor = await collection.find(new FindStatement(finder.get));
      if (finder.options) {
        if (('limit' in finder.options)) {
          cursor.limit(finder.options.limit);
        }
        if (('skip' in finder.options)) {
          cursor.skip(finder.options.skip);
        }
        if (('sort' in finder.options)) {
          cursor.sort(finder.options.sort);
        }
      }
      const results = await cursor.toArray();
      if (finder.options && finder.options.populate) {
        const populatable = finder.model.getPopulatableFields();
        const _results = Promise.all(
          results.map(result => Promise.all(
            populatable.map(model => model.findById(result[model.field]))
          ))
        );
        resolve({results: _results});
      } else {
        console.log({results});
        resolve({results});
      }
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
