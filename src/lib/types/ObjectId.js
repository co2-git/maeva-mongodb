import {ObjectId} from 'mongodb';

export default class _ObjectId extends ObjectId {
  static validate(value) {
    return value instanceof ObjectId;
  }
  static convert(value) {
    return new ObjectId(value);
  }
  static set(value: any): any {
    const converted = this.convert(value);
    if (this.validate(converted)) {
      return converted;
    }
    throw new Error('Can not set value to MongoDB object id');
  }
}
