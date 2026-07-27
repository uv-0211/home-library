import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidUUID } from 'src/utils/validateUUID';
import { Album, Prisma } from '@prisma/client';
import { PaginatedResult, getSkipTake } from 'src/utils/pagination';
import { FindAlbumsQueryDto } from './dto/find-albums-query.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AlbumCreateInput) {
    return await this.prisma.album.create({ data });
  }

  async findAll(query: FindAlbumsQueryDto): Promise<PaginatedResult<Album>> {
    const { page, limit, search, sortBy, sortOrder } = query;

    const where: Prisma.AlbumWhereInput = search
      ? { name: { contains: search, mode: 'insensitive' } }
      : {};

    const [items, total] = await this.prisma.$transaction([
      this.prisma.album.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        ...getSkipTake(page, limit),
      }),
      this.prisma.album.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album with this id not found');
    }

    return album;
  }

  async update(id: string, data: Prisma.AlbumUpdateInput) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album with this id not found');
    }

    return await this.prisma.album.update({ where: { id }, data });
  }

  async delete(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album with this id not found');
    }

    return await this.prisma.album.delete({ where: { id } });
  }
}
