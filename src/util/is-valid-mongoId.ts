import { isValidObjectId } from 'mongoose';

export const isValidMongoId = (id: string) => {
  return isValidObjectId(id);
};
