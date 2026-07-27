import { IsIn, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

const TRACK_SORT_FIELDS = ['name', 'duration'] as const;
export type TrackSortField = (typeof TRACK_SORT_FIELDS)[number];

export class FindTracksQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(TRACK_SORT_FIELDS)
  sortBy: TrackSortField = 'name';
}
