import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  invoiceId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  method: {
    type: DataTypes.ENUM('card', 'bank_transfer', 'crypto', 'paypal'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  transactionId: {
    type: DataTypes.STRING,
    unique: true
  },
  paymentDate: {
    type: DataTypes.DATE
  },
  fee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  metadata: {
    type: DataTypes.JSONB
  }
});

export default Payment;
