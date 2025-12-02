
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { toggleFavorite, isFavorite } from '../services/storage';

export default function FlightDetailsScreen({ route, navigation }) {

    console.log("RODOU A TELA!");

    const { flight } = route.params;
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        checkFavoriteStatus();
    }, []);

    const checkFavoriteStatus = async () => {
        const status = await isFavorite(flight.flightNumber);
        setIsFav(status);
    };

    const handleToggleFavorite = async () => {
        const newStatus = await toggleFavorite(flight);
        setIsFav(newStatus);
    };


    const getStatusColor = (status) => {
        switch (status) {
            case 'No Horário': return '#4CAF50';
            case 'Atrasado': return '#FFC107';
            case 'Cancelado': return '#F44336';
            default: return '#757575';
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(flight.status) }]}>
                    <Text style={styles.statusText}>{flight.status}</Text>
                </View>
                <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.locationInfo}>
                        <Text style={styles.cityCode}>{flight.origin.split('(')[1].replace(')', '')}</Text>
                        <Text style={styles.cityName}>{flight.origin.split('(')[0]}</Text>
                        <Text style={styles.time}>{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        <Text style={styles.date}>{new Date(flight.departureTime).toLocaleDateString()}</Text>
                    </View>

                    <View style={styles.planeIcon}>
                        <Ionicons name="airplane" size={32} color="#007AFF" />
                        <View style={styles.dottedLine} />
                    </View>

                    <View style={styles.locationInfo}>
                        <Text style={styles.cityCode}>{flight.destination.split('(')[1].replace(')', '')}</Text>
                        <Text style={styles.cityName}>{flight.destination.split('(')[0]}</Text>
                        <Text style={styles.time}>{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        <Text style={styles.date}>{new Date(flight.arrivalTime).toLocaleDateString()}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Terminal</Text>
                    <Text style={styles.infoValue}>{flight.terminal}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Portão</Text>
                    <Text style={styles.infoValue}>{flight.gate}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Duração</Text>
                    <Text style={styles.infoValue}>1h 00m</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <CustomButton
                    title={isFav ? "Remover dos Favoritos" : "Salvar nos Favoritos"}
                    onPress={handleToggleFavorite}
                    style={[styles.favoriteButton, isFav && styles.favoriteButtonActive]}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 8,
    },
    statusText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    flightNumber: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        backgroundColor: 'white',
        margin: 16,
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationInfo: {
        alignItems: 'center',
        flex: 1,
    },
    cityCode: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    cityName: {
        fontSize: 14,
        color: '#757575',
        marginTop: 4,
        textAlign: 'center',
    },
    time: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginTop: 8,
    },
    date: {
        fontSize: 12,
        color: '#9E9E9E',
        marginTop: 2,
    },
    planeIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
    },
    dottedLine: {
        width: '100%',
        height: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        position: 'absolute',
        zIndex: -1,
    },
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: 'white',
        marginHorizontal: 16,
        borderRadius: 16,
        marginBottom: 24,
    },
    infoItem: {
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 12,
        color: '#757575',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    actions: {
        padding: 16,
    },
    favoriteButton: {
        backgroundColor: '#E0E0E0',
    },
    favoriteButtonActive: {
        backgroundColor: '#FF4081',
    },
});
