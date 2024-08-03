import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { fetchStockData } from '../store/stockSlice';
import ChangeStockModal from '../components/ChangeStockModal';

const Home = () => {
  const dispatch = useAppDispatch();
  const stockData = useSelector((state: any) => state.stock.data);
  const [showModal, setShowModal] = useState(false);
  const [currentSymbol, setCurrentSymbol] = useState('GOOG');

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchStockData(currentSymbol));
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch, currentSymbol]);

  const handleSymbolChange = (newSymbol: string) => {
    setCurrentSymbol(newSymbol);
    setShowModal(false);
  };

  return (
    <div>
      <h1>Stock Data</h1>
      <button onClick={() => setShowModal(true)}>Change Stock/Crypto</button>
      {showModal && <ChangeStockModal onSymbolChange={handleSymbolChange} />}
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock: any) => (
            <tr key={stock._id}>
              <td>{stock.symbol}</td>
              <td>{stock.price}</td>
              <td>{new Date(stock.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
