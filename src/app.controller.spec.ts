import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { UtilsService } from './utils/utils.service';
import { WeatherService } from './weather/weather.service';
import { HttpException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let weatherService: WeatherService;
  let utilsService: UtilsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [UtilsService, WeatherService],
    }).compile();

    appController = app.get<AppController>(AppController);
    weatherService = app.get<WeatherService>(WeatherService);
    utilsService = app.get<UtilsService>(UtilsService);
  });

  describe('root', () => {
    it('With valid date', async () => {
      jest
        .spyOn(weatherService, 'getWeatherFromParis')
        .mockImplementation(() => Promise.resolve({ min: 6.02, max: 24.02 }));

      jest.spyOn(utilsService, 'dateIsValid').mockImplementation(() => true);

      jest
        .spyOn(utilsService, 'convertDateToRoman')
        .mockImplementation(() => 'MMXX.V.I');

      expect(await appController.getWeather('2020-05-01')).toStrictEqual({
        min: 6.02,
        max: 24.02,
        romanFormatDate: 'MMXX.V.I',
      });
    });

    it('With invalid date', async () => {
      jest.spyOn(utilsService, 'dateIsValid').mockImplementation(() => false);

      expect(
        jest.spyOn(weatherService, 'getWeatherFromParis'),
      ).not.toHaveBeenCalled();
      expect(
        jest.spyOn(utilsService, 'convertDateToRoman'),
      ).not.toHaveBeenCalled();

      try {
        await appController.getWeather('invalid-date-format');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
