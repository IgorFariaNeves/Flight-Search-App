const API_KEY = '8c999b93995dfb7803123d74db16469d';
const BASE_URL = 'https://api.aviationstack.com/v1';

export const getAirports = async () => {
    try {
        console.log('Buscando aeroportos...');
        const response = await fetch(`${BASE_URL}/airports?access_key=${API_KEY}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Erro ao buscar aeroportos:", error);
        return null;
    }
};
