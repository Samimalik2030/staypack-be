import { PopulateOptions } from "mongoose";

export type MongoPopulateOptions = {
    populate?: PopulateOptions | (PopulateOptions | string)[];
  };
  
 