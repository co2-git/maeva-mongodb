export default function update(conn, updater) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = conn.db.collection(updater.collection);
      const result = await collection.updateMany(
        updater.query,
        {$set: updater.modifier},
        updater.options,
      );
      if (!result.result.ok) {
        reject(new Error('Could not update'));
      } else {
        resolve(result);
      }
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
