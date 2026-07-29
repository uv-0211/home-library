import { IsIn, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export const ARTIST_SORT_FIELDS = ['name'] as const;
export type ArtistSortField = (typeof ARTIST_SORT_FIELDS)[number];

export class FindArtistsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(ARTIST_SORT_FIELDS)
  sortBy: ArtistSortField = 'name';
}
