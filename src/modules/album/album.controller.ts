import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FindAlbumsQueryDto } from './dto/find-albums-query.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() dto: CreateAlbumDto) {
    return await this.albumService.create(dto);
  }

  @Get()
  async findAll(@Query() query: FindAlbumsQueryDto) {
    return await this.albumService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.albumService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return await this.albumService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.albumService.delete(id);
  }
}
