import { ApiProperty } from '@nestjs/swagger';
import { PaginationMeta } from '../dtos/pagination.meta.dto';

export class PaginationQuery {
  @ApiProperty({ example: 1 })
  page: number;
  @ApiProperty({ example: 10 })
  limit: number;

  constructor(data: { page: number; limit: number }) {
    Object.assign(this, data);
  }

  get skip() {
    return (this.page - 1) * this.limit;
  }

  dto<T>(data: [T[], number]) {
    return {
      data: data[0],
      pagination: new PaginationMeta(data[1], this),
    };
  }

  dtoWithFilteredRecords<T>(
    data: [
      {
        matched: T[];
        matchedCount: number;
        others: T[];
        othersCount: number;
      },
      number,
    ],
  ) {
    return {
      data: data[0],
      pagination: new PaginationMeta(data[1], this),
    };
  }
}
