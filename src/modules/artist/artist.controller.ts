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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FindArtistsQueryDto } from './dto/find-artists-query.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() dto: CreateArtistDto) {
    return await this.artistService.create(dto);
  }

  @Get()
  async findAll(@Query() query: FindArtistsQueryDto) {
    return await this.artistService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.artistService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    return await this.artistService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.artistService.delete(id);
  }
}
