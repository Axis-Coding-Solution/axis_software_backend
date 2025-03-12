import { Model } from 'mongoose';
import { conflictException } from '../custom-exception';

export const existsHelper = async (
  firstField: String,
  secondField: string,
  modelName: Model<any>,
) => {
  const query = { [secondField]: firstField };
  const documentExists = await modelName.exists(query);
  if (documentExists) {
    throw conflictException(`${firstField} already exists`);
  }
  return;
};
