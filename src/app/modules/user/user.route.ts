import { Router } from 'express';
import { craeteUserController } from './user.controller';

const router = Router();

router.post('/', craeteUserController);

export const UserRoute = router;
