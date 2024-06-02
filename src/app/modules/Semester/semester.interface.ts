export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TSemesterName = 'Aautumn' | 'Summer' | 'Fall';
export type TSemesterCode = '01' | '02' | '03';

export type TSemester = {
  name: TSemesterName;
  code: TSemesterCode;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
};

export type TSemesterNameAndCodeMapper = {
  [key: string]: string;
};
