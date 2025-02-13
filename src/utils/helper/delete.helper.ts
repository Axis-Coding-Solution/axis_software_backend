import { Model } from 'mongoose';
import { badRequestException, notFoundException } from '../custom-exception';
import { isValidMongoId } from '../is-valid-mongoId';

export const deleteHelper = async (
  id: string,
  MODEL: string,
  modelName: Model<any>,
) => {
  if (!isValidMongoId(id)) {
    throw badRequestException('id is not valid');
  }

  const deleteDocument = await modelName.findByIdAndDelete(id);
  if (!deleteDocument) {
    throw notFoundException(`${MODEL} not found`);
  }

  return deleteDocument;
};
