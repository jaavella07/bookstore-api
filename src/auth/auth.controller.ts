import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  loginUser(@Body() loginAuthDto:LoginAuthDto ) {
    return this.authService.loginUser(loginAuthDto);
  }

}
