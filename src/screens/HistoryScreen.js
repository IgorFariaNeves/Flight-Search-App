import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getHistory, clearHistory } from '../services/storage';
import FlightCard from '../components/FlightCard';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen({ navigation }) {
    const [history, setHistory] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadHistory();
        }, [])
    );

    const loadHistory = async () => {
        const data = await getHistory();
        setHistory(data);
    };

    const handleClearHistory = async () => {
        await clearHistory();
        setHistory([]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Histórico</Text>
                {history.length > 0 && (
                    <TouchableOpacity onPress={handleClearHistory}>
                        <Ionicons name="trash-outline" size={24} color="#F44336" />
                    </TouchableOpacity>
                )}
            </View>

            {history.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nenhum histórico recente.</Text>
                </View>
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item) => item.flightNumber}
                    renderItem={({ item }) => (
                        <FlightCard
                            flight={item}
                            onPress={() => navigation.navigate('FlightDetails', { flight: item })}
                        />
                    )}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    list: {
        paddingVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#757575',
        fontSize: 16,
    },
});
