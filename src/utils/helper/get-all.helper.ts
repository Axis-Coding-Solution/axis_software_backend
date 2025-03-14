import { Model } from 'mongoose';
import { notFoundException } from '../custom-exception';
/**
 * To get all documents from db with pagination
 * @param {Number} page page no comes form query
 * @param {Number} limit limit no comes form query
 * @param {String} modelName model to query with
 * @param {String} search search come from user default will be null
 * @param {String} searchField field to search default will be null
 * @param {Array} populate populate array of objects containing path and select fields
 * @param {Object} filters fields to filter documents default will be empty object
 * @returns {Object} items, totalItems, totalPages, itemsPerPage, currentPage
 */
export const getAllHelper = async (
  page: string,
  limit: string,
  modelName: Model<any>,
  search: string = null,
  searchField: string = null,
  populate: Array<{ path: string; select?: string }> = [],
  filters: object = {},
) => {
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  if (search && searchField !== null) {
    filters[searchField] = { $regex: search, $options: 'i' };
  }

  let query = modelName.find(filters).sort('-createdAt').skip(skip).limit(limitNumber).lean();
  if (populate.length > 0) query = query.populate(populate);
  const [items, totalItems] = await Promise.all([
    query.exec(),
    modelName.countDocuments(filters).exec(),
  ]);
  if (items.length === 0) {
    throw notFoundException(`${modelName.modelName} not found`);
  }

  const totalPages = Math.ceil(totalItems / limitNumber);

  return {
    items,
    totalItems,
    totalPages,
    itemsPerPage: limitNumber,
    currentPage: pageNumber,
  };
};
