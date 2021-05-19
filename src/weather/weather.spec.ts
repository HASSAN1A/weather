jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let weatherService: WeatherService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [WeatherService],
    }).compile();

    weatherService = app.get<WeatherService>(WeatherService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getWeather', async () => {
    fetch.mockReturnValue(
      Promise.resolve(
        new Response(
          JSON.stringify([
            {
              id: 5209544189804544,
              weather_state_name: 'Light Rain',
              weather_state_abbr: 'lr',
              wind_direction_compass: 'ESE',
              created: '2020-05-10T18:36:07.257120Z',
              applicable_date: '2020-05-10',
              min_temp: 13.89,
              max_temp: 22.42,
              the_temp: 22.22,
              wind_speed: 3.2827598714732624,
              wind_direction: 111.35890529326237,
              air_pressure: 1004.5,
              humidity: 78,
              visibility: 7.28806271375169,
              predictability: 75,
            },
            {
              id: 4514619353726976,
              weather_state_name: 'Showers',
              weather_state_abbr: 's',
              wind_direction_compass: 'NNE',
              created: '2020-05-06T06:36:17.820229Z',
              applicable_date: '2020-05-10',
              min_temp: 8.41,
              max_temp: 19.62,
              the_temp: 19.28,
              wind_speed: 7.408341971966384,
              wind_direction: 16.72057676491569,
              air_pressure: 1010,
              humidity: 66,
              visibility: 11.094893322993716,
              predictability: 73,
            },
          ]),
          {
            status: 200,
          },
        ),
      ),
    );

    const result = await weatherService.getWeather(
      new Date('2020-05-01'),
      615702,
    );
    expect(result).toStrictEqual({
      max: 22.42,
      min: 8.41,
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.metaweather.com/api/location/615702/2020/05/01',
    );
  });

  it('getWeather with no result', async () => {
    fetch.mockReturnValue(
      Promise.resolve(new Response(JSON.stringify([]), { status: 200 })),
    );

    try {
      await weatherService.getWeather(new Date('2012-12-21'), 615702);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect(fetch).toHaveBeenCalledWith(
      'https://www.metaweather.com/api/location/615702/2012/12/21',
    );
  });
});
