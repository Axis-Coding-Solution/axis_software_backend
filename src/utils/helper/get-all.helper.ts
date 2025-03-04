import { Model } from 'mongoose';
import { notFoundException } from '../custom-exception';
/**
 * @param {Number} page page no comes form query
 * @param {Number} limit limit no comes form query
 * @param {String} modelName model to query with
 * @param {String} search search come from user
 * @param {String} searchField field to search
 * @param {String} populate fields to populate
 * @returns {Object} items, totalItems, totalPages, itemsPerPage, currentPage
 */
export const getPagination = async (
  page: string,
  limit: string,
  modelName: Model<any>,
  search: string = null,
  searchField: string = null,
  populate: string = '',
) => {
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  let filters = {};
  if (search && searchField !== null) {
    filters = {
      [searchField]: { $regex: search, $options: 'i' },
    };
  }

  const [items, totalItems] = await Promise.all([
    modelName
      .find(filters)
      .sort('-createdAt')
      .skip(skip)
      .limit(limitNumber)
      .populate(populate)
      .lean()
      .exec(),
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
