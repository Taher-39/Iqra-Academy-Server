import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IName,
} from './student.interface';
import { Schema, model } from 'mongoose';

const nameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: [true, 'First Name Is Required'],
    maxlength: [15, 'First name max charecters 20.'],
    trim: true,
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name Is Required'],
    maxlength: [15, 'First name max charecters 20.'],
    trim: true,
  },
});

const guardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: [true, 'Father Name Is Required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation Is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact number Is Required'],
  },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String },
});

const studentSchema = new Schema<IStudent>(
  {
    id: { type: String, required: [true, 'ID Is Required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID Is Required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email Is Required'],
      unique: true,
      ref: 'User',
    },
    name: { type: nameSchema, required: [true, 'Name Is Required'] },
    gender: {
      type: String,
      enum: { values: ['male', 'female'], message: '{VALUE} is not valid' },
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date Of Birth Is Required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact Is Required'],
      unique: true,
      validate: {
        validator: (v: string): boolean => /\d{5}-\d{6}/.test(v),
        message:
          '{VALUE} is not a valid phone number!, user 00000-121512 format.',
      },
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Is Required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not valid',
      },
      required: [true, 'Blood Group Is Required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address Is Required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Parmanent Address Is Required'],
    },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);


//virtuals
// Define a virtual property for the full name
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + ' ' + this.name.lastName;
});

export const StudentModel = model<IStudent>('Student', studentSchema);
