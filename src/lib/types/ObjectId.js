import {ObjectId} from 'mongodb';

export default class _ObjectId extends ObjectId {
  static validate(value) {
    return value instanceof ObjectId;
  }
  static convert (value) {
    return new ObjectId(value);
  }
}
