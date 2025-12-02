import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FlightCard = ({ flight, onPress }) => {
    if (!flight) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'No Horário': return '#4CAF50';
            case 'Atrasado': return '#FFC107';
            case 'Cancelado': return '#F44336';
            default: return '#757575';
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.header}>
                <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(flight.status) }]}>
                    <Text style={styles.statusText}>{flight.status}</Text>
                </View>
            </View>

            <View style={styles.routeContainer}>
                <View style={styles.location}>
                    <Text style={styles.cityCode}>{flight.origin.split('(')[1].replace(')', '')}</Text>
                    <Text style={styles.time}>{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>

                <View style={styles.iconContainer}>
                    <Ionicons name="airplane" size={24} color="#007AFF" />
                    <View style={styles.line} />
                </View>

                <View style={styles.location}>
                    <Text style={styles.cityCode}>{flight.destination.split('(')[1].replace(')', '')}</Text>
                    <Text style={styles.time}>{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.city}>{flight.origin.split('(')[0]}</Text>
                <Ionicons name="arrow-forward" size={16} color="#757575" />
                <Text style={styles.city}>{flight.destination.split('(')[0]}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    flightNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    routeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    location: {
        alignItems: 'center',
    },
    cityCode: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    time: {
        fontSize: 14,
        color: '#757575',
        marginTop: 4,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        height: 1,
        backgroundColor: '#E0E0E0',
        width: '100%',
        position: 'absolute',
        zIndex: -1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        paddingTop: 12,
    },
    city: {
        fontSize: 12,
        color: '#757575',
    },
});

export default FlightCard;
