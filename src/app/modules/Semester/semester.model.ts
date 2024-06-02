import { Schema, model } from 'mongoose';
import { TSemester } from './semester.interface';
import { Month, SemesterCode, SemesterName } from './semester.constant';

const semesterSchema = new Schema(
  {
    name: { type: String, enum: SemesterName, required: true },
    code: { type: String, enum: SemesterCode, required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Month, required: true },
    endMonth: { type: String, enum: Month, required: true },
  },
  {
    timestamps: true,
  },
);

semesterSchema.pre('save', async function (next) {
  const isSemesterExits = await SemesterModel.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExits) {
    throw new Error('Semester is already exits!');
  }

  next();
});

const SemesterModel = model<TSemester>('Semester', semesterSchema);

export { SemesterModel };
