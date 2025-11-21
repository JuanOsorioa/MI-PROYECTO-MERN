// frontend/src/api/transactionService.js

import apiClient from './apiClient'; // 🚨 Nuestro cliente Axios configurado

const TRANSACTION_URL = '/transactions';

/**
 * @desc Obtiene el balance personal del socio logueado.
 * @route GET /api/transactions/balance/me
 */
const getBalance = async () => {
    // Axios interceptor añade automáticamente el JWT al encabezado Authorization
    const response = await apiClient.get(`${TRANSACTION_URL}/balance/me`);
    return response.data; // Devuelve { balance: 12345 }
};

/**
 * @desc Obtiene el historial de transacciones del socio logueado.
 * @route GET /api/transactions
 */
const getTransactions = async () => {
    const response = await apiClient.get(TRANSACTION_URL);
    return response.data; // Devuelve un array de objetos Transaction
};


// Agrega una nueva transacción (Aporte o Retiro) - La usaremos más tarde
const createTransaction = async (transactionData) => {
    const response = await apiClient.post(TRANSACTION_URL, transactionData);
    return response.data; 
};


const transactionService = {
    getBalance,
    getTransactions,
    createTransaction,
};

export default transactionService;