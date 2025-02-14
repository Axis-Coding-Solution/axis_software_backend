import { Model } from 'mongoose';
import { badRequestException, notFoundException } from '../custom-exception';
import { isValidMongoId } from '../is-valid-mongoId';
/**
 * @param id id comes from frontend
 * @param MODEL model name to generate dynamic message
 * @param modelName model to query with
 * @returns deleted document
 */
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
