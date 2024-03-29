import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SearchUserDto } from './dto/search-user.dto';
import { ChangeRatingDto } from './dto/change-rating.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Get('search')
  search(@Query() dto: SearchUserDto) {
    return this.userService.search(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@Request() req, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/rating')
  changeRating(@Request() req, @Body() dto: ChangeRatingDto) {
    return this.userService.changeRating(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  remove(@Request() req) {
    return this.userService.remove(req.user.id);
  }
}
