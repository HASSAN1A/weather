import { Injectable } from '@nestjs/common';
import { ROMAN_NUMBERS } from './date.constants';

@Injectable()
export class UtilsService {
  dateIsValid(date: string): boolean {
    // format: YYYY-mm-dd
    return date.match(/^\d{4}-\d{2}-\d{2}$/) != null;
  }

  convertDateToRoman(date: Date): string {
    return [
      this.convertNumberToRoman(date.getFullYear()),
      this.convertNumberToRoman(date.getMonth() + 1),
      this.convertNumberToRoman(date.getDate()),
    ].join('.');
  }

  convertNumberToRoman(number: number): string {
    let romanNumber = '';

    while (number > 0) {
      const list = Object.entries(ROMAN_NUMBERS).reverse();
      for (let index = 0; index < list.length; index++) {
        const value = parseInt(list[index][0]);
        const letter = list[index][1];

        const times = Math.floor(number / value);
        romanNumber += letter.repeat(times);
        number %= value;
      }
    }

    return romanNumber;
  }
}
