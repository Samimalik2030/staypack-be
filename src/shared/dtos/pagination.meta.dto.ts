import { ApiProperty } from '@nestjs/swagger';
import { PaginationQuery } from '../classes/pagination.query.class';

export class PaginationMeta {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  pages: number;

  @ApiProperty()
  records: number;

  constructor(count: number, { page, limit }: PaginationQuery) {
    return {
      page,
      limit,
      pages: Math.ceil(count / limit),
      records: count,
    };
  }
}
