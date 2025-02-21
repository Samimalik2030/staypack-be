import { PopulateOptions } from 'mongoose';
import { PaginationQuery } from 'src/shared/classes/pagination.query.class';

export type MongoPopulateOptions = {
  populate?: PopulateOptions | (PopulateOptions | string)[];
};

export type MongoQueryService<T> = MongoPopulateOptions & {
  pagination?: PaginationQuery;
  sort?: { [key in keyof T]?: 1 | -1 };
};
