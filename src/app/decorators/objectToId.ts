import { Types } from 'mongoose';

const objectIdToString = (value: any) =>
  value instanceof Types.ObjectId ? value.toString() : value;

export const transformObjectId = (obj: any) => {
  if (Array.isArray(obj.value)) {
    return obj.value.map(objectIdToString);
  } else {
    return objectIdToString(obj.value);
  }
};


