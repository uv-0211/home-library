import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isValidUUID } from 'src/utils/validateUUID';
import { PrismaService } from 'src/prisma/prisma.service';
import { Artist, Prisma } from '@prisma/client';
import { PaginatedResult, getSkipTake } from 'src/utils/pagination';
import { FindArtistsQueryDto } from './dto/find-artists-query.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ArtistCreateInput) {
    return await this.prisma.artist.create({ data });
  }

  async findAll(query: FindArtistsQueryDto): Promise<PaginatedResult<Artist>> {
    const { page, limit, search, sortBy, sortOrder } = query;

    const where: Prisma.ArtistWhereInput = search
      ? { name: { contains: search, mode: 'insensitive' } }
      : {};

    const [items, total] = await Promise.all([
      this.prisma.artist.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        ...getSkipTake(page, limit),
      }),
      this.prisma.artist.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist with this id not found');
    }

    return artist;
  }

  async update(id: string, data: Prisma.ArtistUpdateInput) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist with this id not found');
    }

    return await this.prisma.artist.update({ where: { id }, data });
  }

  async delete(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist with this id not found');
    }

    return await this.prisma.artist.delete({ where: { id } });
  }
}
