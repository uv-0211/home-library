import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Track } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidUUID } from 'src/utils/validateUUID';
import { PaginatedResult, getSkipTake } from 'src/utils/pagination';
import {
  TRACK_SORT_FIELDS,
  FindTracksQueryDto,
} from './dto/find-tracks-query.dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TrackCreateInput) {
    return await this.prisma.track.create({ data });
  }

  async findAll(query: FindTracksQueryDto): Promise<PaginatedResult<Track>> {
    const { page, limit, search, sortBy, sortOrder } = query;

    if (!TRACK_SORT_FIELDS.includes(sortBy)) {
      throw new BadRequestException('Invalid sortBy field');
    }

    const where: Prisma.TrackWhereInput = search
      ? { name: { contains: search, mode: 'insensitive' } }
      : {};

    const [items, total] = await Promise.all([
      this.prisma.track.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        ...getSkipTake(page, limit),
      }),
      this.prisma.track.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
    };
  }

  async findById(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track with this id not found');
    }

    return track;
  }

  async update(id: string, data: Prisma.TrackUpdateInput) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track with this id not found');
    }

    return await this.prisma.track.update({ where: { id }, data });
  }

  async delete(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track with this id not found');
    }

    return await this.prisma.track.delete({ where: { id } });
  }
}
