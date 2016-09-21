import {Model} from 'maeva';
import {ObjectId} from 'mongodb';

export default function insert(conn, inserter) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = conn.db.collection(inserter.collection);
      let result;
      if (Array.isArray(inserter.documents)) {
        result = await collection.insertMany(
          inserter.documents.map(doc => {
            const _doc = {};
            for (const field in doc) {
              if (doc[field] instanceof Model && doc[field]._id) {
                _doc[field] = ObjectId(doc[field]._id);
              } else {
                _doc[field] = doc[field];
              }
            }
            return _doc;
          })
        );
      } else {
        const doc = inserter.documents;
        const _doc = {};
        for (const field in doc) {
          if (doc[field] instanceof Model && doc[field]._id) {
            _doc[field] = ObjectId(doc[field]._id);
          } else {
            _doc[field] = doc[field];
          }
        }
        result = await collection.insertOne(_doc);
      }
      if (!result.result.ok) {
        reject(new Error('Could not insert'));
      } else {
        if (Array.isArray(inserter.documents)) {
          resolve(result.ops);
        } else {
          resolve(result.ops[0]);
        }
      }
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
