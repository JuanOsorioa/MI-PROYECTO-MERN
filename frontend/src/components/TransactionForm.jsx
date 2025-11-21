// frontend/src/components/TransactionForm.jsx

import { useState } from 'react';
import apiClient from '../api/apiClient';

// El componente recibe 'type' (Aporte o Retiro) y una función 'onSuccess'
const TransactionForm = ({ type, onSuccess }) => {
    const isAporte = type === 'Aporte';
    const formTitle = isAporte ? 'Registrar Aporte' : 'Registrar Retiro';
    const formColor = isAporte ? '#4CAF50' : '#f44336'; // Verde para Aporte, Rojo para Retiro

    // CORRECCIÓN CLAVE 1: Mapear el tipo de transacción al idioma del backend
    const apiType = type === 'Aporte' ? 'contribution' : 'withdrawal';

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);

        // Validaciones básicas
        if (parseFloat(amount) <= 0) {
            setError('El monto debe ser positivo.');
            setIsLoading(false);
            return;
        }

        try {
            // Petición POST a la ruta de transacciones
            const response = await apiClient.post(`/transactions`, {
                amount: parseFloat(amount),
                type: apiType, // Usamos el tipo en inglés (contribution o withdrawal)
                description,
            });

            // 1. Mostrar mensaje de éxito
            setSuccessMessage(`¡${type} registrado con éxito!`);
            
            // 2. Limpiar formulario
            setAmount('');
            setDescription('');
            
            // 3. Llamar a la función onSuccess para recargar los datos en el Dashboard
            if (onSuccess) {
                onSuccess(response.data);
            }

        } catch (err) {
            // Manejo de errores (ej. Retiro excede el balance)
            const errorMessage = err.response && err.response.data.message 
                ? err.response.data.message
                : `Error al registrar el ${type}.`;
            
            setError(errorMessage);

        } finally {
            setIsLoading(false);
            // Ocultar mensaje de éxito/error después de unos segundos
            setTimeout(() => {
                setSuccessMessage('');
                setError('');
            }, 5000);
        }
    };

    return (
        <div className="form-card" style={{ borderLeft: `5px solid ${formColor}` }}>
            <h3 style={{ color: formColor }}>{formTitle}</h3>

            {successMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Monto */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor={`amount-${type}`} style={{ display: 'block' }}>Monto (COP):</label>
                    <input
                        type="number"
                        id={`amount-${type}`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="1"
                        step="1"
                        disabled={isLoading}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* Descripción (Opcional) */}
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor={`description-${type}`} style={{ display: 'block' }}>Descripción (Opcional):</label>
                    <textarea
                        id={`description-${type}`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="2"
                        disabled={isLoading}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* Botón */}
                <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{ 
                        padding: '10px 15px', 
                        backgroundColor: isLoading ? '#ccc' : formColor, 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: isLoading ? 'not-allowed' : 'pointer' 
                    }}
                >
                    {isLoading ? 'Enviando...' : `Confirmar ${type}`}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;