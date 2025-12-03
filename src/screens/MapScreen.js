import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getAirports } from '../services/aviationApi';

export default function MapScreen() {
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAirports();
    }, []);

    const fetchAirports = async () => {
        try {
            const data = await getAirports();
            if (data && data.data) {
                setAirports(data.data);
            } else {

                console.log("Usando dados de fallback para demonstração.");
                setAirports([
                    { airport_name: "Guarulhos", latitude: -23.4356, longitude: -46.4731, id: 1 },
                    { airport_name: "Congonhas", latitude: -23.6261, longitude: -46.6564, id: 2 },
                    { airport_name: "Galeão", latitude: -22.8089, longitude: -43.2436, id: 3 },
                    { airport_name: "Santos Dumont", latitude: -22.9105, longitude: -43.1631, id: 4 },
                ]);
                Alert.alert("Aviso", "Não foi possível carregar dados da API (provavelmente chave inválida). Mostrando dados de exemplo.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Falha ao carregar aeroportos.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Carregando aeroportos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -23.5505,
                    longitude: -46.6333,
                    latitudeDelta: 5,
                    longitudeDelta: 5,
                }}
            >
                {airports.map((airport, index) => (
                    // Verifica se tem lat/long válidos
                    (airport.latitude && airport.longitude) ? (
                        <Marker
                            key={airport.id || index}
                            coordinate={{
                                latitude: parseFloat(airport.latitude),
                                longitude: parseFloat(airport.longitude),
                            }}
                            title={airport.airport_name}
                            description={airport.iata_code || "Aeroporto"}
                        />
                    ) : null
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
