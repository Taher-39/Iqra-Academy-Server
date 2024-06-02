import { Schema, model } from 'mongoose';
import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IName,
} from './student.interface';

const nameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: [true, 'First Name Is Required'],
    maxlength: [15, 'First name max characters 15.'],
    trim: true,
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name Is Required'],
    maxlength: [15, 'Last name max characters 15.'],
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
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    email: {
      type: String,
      required: [true, 'Email Is Required'],
      unique: true,
    },
    name: { type: nameSchema, required: [true, 'Name Is Required'] },
    gender: {
      type: String,
      enum: { values: ['male', 'female'], message: '{VALUE} is not valid' },
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date Of Birth Is Required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact Is Required'],
      unique: true,
      validate: {
        validator: (v: string): boolean => /\d{5}-\d{6}/.test(v),
        message:
          '{VALUE} is not a valid phone number!, use 00000-000000 format.',
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
      required: [true, 'Permanent Address Is Required'],
    },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'Semester',
    },
    profileImg: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

// Define a virtual property for the full name
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + ' ' + this.name.lastName;
});

export const StudentModel = model<IStudent>('Student', studentSchema);
