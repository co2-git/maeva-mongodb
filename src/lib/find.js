export default function find(conn, finder) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = conn.db.collection(finder.collection);
      const query = collection.find(finder.query);
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
      resolve(results);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
