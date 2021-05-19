import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { format } from 'date-fns';
import {
  Weather,
  MetaWeatherAPIResponse,
} from './interfaces/weather.interface';

@Injectable()
export class WeatherService {
  private readonly woeidParis: number = 615702;

  async getWeatherFromParis(date: Date): Promise<Weather | null> {
    try {
      return await this.getWeather(date, this.woeidParis);
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  async getWeather(date: Date, woeid: number): Promise<Weather> {
    const formatedDate = format(date, 'yyyy/MM/dd');

    const data: MetaWeatherAPIResponse[] = await fetch(
      `https://www.metaweather.com/api/location/${woeid}/${formatedDate}`,
    ).then((r) => r.json());

    if (data.length === 0) {
      throw new Error('Empty response');
    }

    const min = Math.min(...data.map((weather) => weather.min_temp));
    const max = Math.max(...data.map((weather) => weather.max_temp));

    return { min, max };
  }
}
