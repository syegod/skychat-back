import express from 'express';
import connectdb from './connectdb.js';
import cors from 'cors';
import { config } from 'dotenv';
import { UserController } from './controllers/index.js';
import checkAuth from './middlewares/checkAuth.js'
import { loginValidation, registerValidation } from './middlewares/validations.js';
config();

const app = express();

app.use(cors());
app.use(express.json());
connectdb();

app.post('/register', registerValidation, UserController.register);
app.post('/login', loginValidation, UserController.login);
app.get('/get-me', checkAuth, UserController.get_me);

app.delete('/users', UserController.reset_users);
app.get('/users', UserController.all_users);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Server is running on port: '+PORT)
});