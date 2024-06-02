import { TSemester } from '../Semester/semester.interface';
import { User } from './user.model';

const lastUserId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //203001   0001
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (semester: TSemester) => {
  //year code 0000
  const { year, code } = semester;
  const currentId = (await lastUserId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${year}${code}${incrementId}`;
  return incrementId;
};
