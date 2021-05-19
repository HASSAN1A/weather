import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';

describe('Utils', () => {
  let utilsService: UtilsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [UtilsService],
    }).compile();

    utilsService = app.get<UtilsService>(UtilsService);
  });

  describe('Date', () => {
    it('dateIsValid', () => {
      expect(utilsService.dateIsValid('2021-11-02')).toBe(true);
      expect(utilsService.dateIsValid('01-2020-12')).toBe(false);
      expect(utilsService.dateIsValid('2021.11.02')).toBe(false);
      expect(utilsService.dateIsValid('xxxxxxxxxx')).toBe(false);
    });

    it('convertDateToRoman', () => {
      expect(utilsService.convertDateToRoman(new Date('2020-05-10'))).toBe(
        'MMXX.V.X',
      );
    });
  });

  describe('Number', () => {
    it('convertNumberToRoman', () => {
      expect(utilsService.convertNumberToRoman(1515)).toStrictEqual('MDXV');
    });
  });
});
