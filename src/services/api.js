

const API_KEY = '8c999b93995dfb7803123d74db16469d';
const BASE_URL = 'http://api.aviationstack.com/v1/flights';

/**
 
 * @param {string} flightNumber 
 * @returns {Promise<Object>} 
 */
export const fetchFlightDetails = async (flightNumber) => {
    try {
        const response = await fetch(`${BASE_URL}?access_key=${API_KEY}&flight_iata=${flightNumber}`);

        if (!response.ok) {
            throw new Error('Erro na comunicação com o servidor.');
        }

        const json = await response.json();

        if (json.error) {
            throw new Error(json.error.message || 'Erro na API de voos.');
        }

        if (!json.data || json.data.length === 0) {
            throw new Error('Voo não encontrado. Verifique o número e tente novamente.');
        }


        const flightData = json.data[0];
        console.log("Flight Data:", JSON.stringify(flightData, null, 2));
        console.log("Raw Status:", flightData.flight_status);

        return {
            flightNumber: flightData.flight.iata,
            origin: `${flightData.departure.airport} (${flightData.departure.iata})`,
            destination: `${flightData.arrival.airport} (${flightData.arrival.iata})`,
            departureTime: flightData.departure.scheduled,
            arrivalTime: flightData.arrival.scheduled,
            status: translateStatus(flightData.flight_status),
            gate: flightData.departure.gate || '-',
            terminal: flightData.departure.terminal || '-'
        };

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

const translateStatus = (status) => {
    const statusMap = {
        'scheduled': 'No Horário',
        'active': 'Em voo',
        'landed': 'Aterrissou',
        'cancelled': 'Cancelado',
        'incident': 'Incidente',
        'diverted': 'Desviado',
        'delayed': 'Atrasado'
    };
    return statusMap[status] || status;
};
