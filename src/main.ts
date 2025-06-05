import 'dotenv/config';
import express from 'express';
import authRoutes from './presentation/auth/authRoutes';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
