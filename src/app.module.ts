import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UtilsService } from './utils/utils.service';
import { WeatherService } from './weather/weather.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [UtilsService, WeatherService],
})
export class AppModule {}
