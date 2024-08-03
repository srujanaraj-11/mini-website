import express from 'express';
import mongoose from 'mongoose';
import stockRouter from './routes/stock';
import cron from 'node-cron';

const app = express();
const PORT = 3000;


// Add this before app.listen
cron.schedule('*/10 * * * * *', async () => {
  await axios.post('http://localhost:3000/api/stocks/update');
  console.log('Stock data updated');
});


mongoose.connect('mongodb://localhost:27017/stocks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api/stocks', stockRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
