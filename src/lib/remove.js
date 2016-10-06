export default function remove(conn, remover) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = conn.db.collection(remover.collection);
      const result = await collection.removeMany(
        remover.get,
        remover.options,
      );
      if (!result.result.ok) {
        reject(new Error('Could not remove'));
      } else {
        resolve(result);
      }
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
