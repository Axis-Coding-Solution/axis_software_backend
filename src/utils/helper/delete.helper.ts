import { Model } from 'mongoose';
import { badRequestException } from '../custom-exception';
import { isValidMongoId } from '../is-valid-mongoId';

export const deleteHelper = async (
  id: string,
  MODEL: string,
  modelName: Model<any>,
) => {
  console.log("🚀 ~ MODEL:", MODEL)
  if (!isValidMongoId(id)) {
    throw badRequestException('id is not valid');
  }

  const deleteDocument = modelName.findByIdAndDelete(id);
  if (!deleteDocument) {
    throw badRequestException(`${MODEL} not found`);
  }

  return deleteDocument;
};
