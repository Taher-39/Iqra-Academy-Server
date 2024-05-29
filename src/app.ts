import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { routeNotFound } from './app/middleware/routeNotFound';
import { router } from './app/routes';
const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());

//routing
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('App Running.');
});

//global error handler routes
app.use(globalErrorHandler);
app.use(routeNotFound);

export default app;
