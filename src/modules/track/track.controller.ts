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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FindTracksQueryDto } from './dto/find-tracks-query.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() dto: CreateTrackDto) {
    return await this.trackService.create(dto);
  }

  @Get()
  async findAll(@Query() query: FindTracksQueryDto) {
    return await this.trackService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.trackService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    return await this.trackService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.trackService.delete(id);
  }
}
