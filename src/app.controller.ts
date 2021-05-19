import { Controller, HttpException, Get, Param } from '@nestjs/common';
import { UtilsService } from './utils/utils.service';
import { WeatherService } from './weather/weather.service';
import { AppResponse } from './app.interface';

@Controller()
export class AppController {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly weatherService: WeatherService,
  ) {}

  @Get(':date')
  async getWeather(@Param() params): Promise<AppResponse> {
    if (!this.utilsService.dateIsValid(params.date)) {
      throw new HttpException('Invalid date format', 400);
    }

    const date = new Date(params.date);
    const romanFormatDate = this.utilsService.convertDateToRoman(date);
    const weather = await this.weatherService.getWeatherFromParis(date);

    return {
      min: null,
      max: null,
      ...weather,
      romanFormatDate,
    };
  }
}
