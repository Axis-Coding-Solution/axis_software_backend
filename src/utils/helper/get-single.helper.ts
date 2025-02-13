import { Model } from 'mongoose';
import { badRequestException } from '../custom-exception';
import { isValidMongoId } from '../is-valid-mongoId';

export const getSingleHelper = async (
  id: string,
  MODEL: string,
  modelName: Model<any>,
) => {
  if (!isValidMongoId(id)) {
    throw badRequestException('id is not valid');
  }

  const singleDocument = modelName.findById(id);
  if (!singleDocument) {
    throw badRequestException(`${MODEL} not found`);
  }

  return singleDocument;
};
