import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@flight_search_history';
const FAVORITES_KEY = '@flight_search_favorites';

export const saveHistory = async (flight) => {
    try {
        const history = await getHistory();
        // Avoid duplicates
        const newHistory = [flight, ...history.filter(f => f.flightNumber !== flight.flightNumber)].slice(0, 10); // Keep last 10
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (e) {
        console.error('Error saving history', e);
    }
};

export const getHistory = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(HISTORY_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error reading history', e);
        return [];
    }
};

export const clearHistory = async () => {
    try {
        await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (e) {
        console.error('Error clearing history', e);
    }
};

export const toggleFavorite = async (flight) => {
    try {
        const favorites = await getFavorites();
        const isFavorite = favorites.some(f => f.flightNumber === flight.flightNumber);

        let newFavorites;
        if (isFavorite) {
            newFavorites = favorites.filter(f => f.flightNumber !== flight.flightNumber);
        } else {
            newFavorites = [...favorites, flight];
        }

        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        return !isFavorite;
    } catch (e) {
        console.error('Error toggling favorite', e);
        return false;
    }
};

export const getFavorites = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error reading favorites', e);
        return [];
    }
};

export const isFavorite = async (flightNumber) => {
    try {
        const favorites = await getFavorites();
        return favorites.some(f => f.flightNumber === flightNumber);
    } catch (e) {
        console.error('Error checking favorite', e);
        return false;
    }
}

export const clearFavorites = async () => {
    try {
        await AsyncStorage.removeItem(FAVORITES_KEY);
    } catch (e) {
        console.error('Error clearing favorites', e);
    }
};
