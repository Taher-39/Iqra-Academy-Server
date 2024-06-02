import {
  TMonth,
  TSemesterCode,
  TSemesterName,
  TSemesterNameAndCodeMapper,
} from './semester.interface';

export const Month: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const SemesterName: TSemesterName[] = ['Aautumn', 'Summer', 'Fall'];
export const SemesterCode: TSemesterCode[] = ['01', '02', '03'];

export const SemesterNameAndCodeMapper: TSemesterNameAndCodeMapper = {
  Aautumn: '01',
  Summer: '02',
  Fall: '03',
};
