import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.js';
import { connectDB } from './libs/database.js';
import config from './config.js';
import seedAdmin from './libs/seedAdmin.js';

const app = express();

app.use(cors('*'));
app.use(express.json()); // Req body parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);

app.listen(config.port, async () => {
    await connectDB();
    await seedAdmin();
    console.log(`Example app listening on port ${config.port}`)
})