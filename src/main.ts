import 'dotenv/config';
import express from 'express';
import authRoutes from './presentation/auth/authRoutes';
import userRoutes from './presentation/user/userRoutes';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
