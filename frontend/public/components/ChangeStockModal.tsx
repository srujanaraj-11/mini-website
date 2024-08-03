import { useState } from 'react';
import { useAppDispatch } from '../store';
import { fetchStockData } from '../store/stockSlice';

const ChangeStockModal = () => {
  const [symbol, setSymbol] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(fetchStockData(symbol));
  };

  return (
    <div>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock or crypto symbol"
      />
      <button onClick={handleSubmit}>Fetch Data</button>
    </div>
  );
};

export default ChangeStockModal;
