import { Model } from 'mongoose';
import { badRequestException, notFoundException } from '../custom-exception';
import { isValidMongoId } from '../is-valid-mongoId';
/**
 * @param id id comes from frontend
 * @param MODEL model name to generate dynamic message
 * @param modelName model to query with
 * @returns single document from db
 */
export const getSingleHelper = async (
  id: string,
  MODEL: string,
  modelName: Model<any>,
) => {
  if (!isValidMongoId(id)) {
    throw badRequestException('id is not valid');
  }

  const singleDocument = await modelName.findById(id).lean();
  if (!singleDocument) {
    throw notFoundException(`${MODEL} not found`);
  }

  return singleDocument;
};
