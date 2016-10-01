import FindStatement from './FindStatement';

export default function find(conn, finder) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = conn.db.collection(finder.collection);
      console.log(require('util').inspect({
        find: {
          raw: finder.query,
          statement: new FindStatement(finder.query),
        },
      }, { depth: null }));
      const query = collection.find(new FindStatement(finder.query));
      if (finder.options) {
        if (('limit' in finder.options)) {
          query.limit(finder.options.limit);
        }
        if (('skip' in finder.options)) {
          query.skip(finder.options.skip);
        }
        if (('sort' in finder.options)) {
          query.sort(finder.options.sort);
        }
      }
      const results = await query.toArray();
      if (finder.options.populate) {
        const populatable = finder.model.getPopulatableFields();
        console.log({populatable});
        const _results = Promise.all(
          results.map(result => Promise.all(
            populatable.map(model => model.findById(result[model.field]))
          ))
        );
        resolve(_results);
      } else {
        resolve(results);
      }
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
