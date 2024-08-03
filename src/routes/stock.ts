import { Router } from 'express';
import axios from 'axios';
import { Stock } from '../models/Stocks';

const router = Router();

router.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const stocks = await Stock.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  res.json(stocks);
});

router.post('/update', async (req, res) => {
  const symbols = ['GOOG', 'BTC']; // Add more as needed
  const promises = symbols.map(async (symbol) => {
    // Fetch data from an API
    const response = await axios.get(`API_URL_FOR_${symbol}`);
    const price = response.data.price; // Adjust based on API response structure

    // Save to MongoDB
    const stock = new Stock({ symbol, price });
    await stock.save();
  });

  await Promise.all(promises);
  res.json({ message: 'Stocks updated' });
});

export default router;
