import express from 'express';
import contractsRoutes from './routes/contracts';
import installmentsRoutes from './routes/installments';
import receiptsRoutes from './routes/receipts';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/contracts', contractsRoutes);
app.use('/installments', installmentsRoutes);
app.use('/receipts', receiptsRoutes);

app.listen(port, () => {
  console.log(`API Mock rodando em http://localhost:${port}`);
});
