import { Types } from 'mongoose';

export interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName?: string;
  motherOccupation?: string;
  motherContactNo?: string;
}

export interface ILocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface IStudent {
  id: string;
  password: string;
  email: string;
  user: Types.ObjectId;
  name: IName;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  semester: Types.ObjectId;
  profileImg?: string;
  department: Types.ObjectId;
  isDeleted: boolean;
}
