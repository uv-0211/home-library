import { IsIn, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export const ALBUM_SORT_FIELDS = ['name', 'year'] as const;
export type AlbumSortField = (typeof ALBUM_SORT_FIELDS)[number];

export class FindAlbumsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(ALBUM_SORT_FIELDS)
  sortBy: AlbumSortField = 'name';
}
