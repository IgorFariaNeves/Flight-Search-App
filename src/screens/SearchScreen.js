import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { fetchFlightDetails } from '../services/api';
import { saveHistory } from '../services/storage';

export default function SearchScreen({ navigation }) {
    const [flightNumber, setFlightNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!flightNumber.trim()) {
            Alert.alert('Erro', 'Por favor, insira o número do voo.');
            return;
        }

        Keyboard.dismiss();
        setLoading(true);

        try {
            const flight = await fetchFlightDetails(flightNumber);
            await saveHistory(flight);
            navigation.navigate('FlightDetails', { flight });
        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Busca de Voos</Text>
                <Text style={styles.subtitle}>Encontre informações sobre seu voo</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Número do Voo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: AB123"
                        value={flightNumber}
                        onChangeText={setFlightNumber}
                        autoCapitalize="characters"
                        autoCorrect={false}
                    />
                </View>

                <CustomButton
                    title="Buscar Voo"
                    onPress={handleSearch}
                    loading={loading}
                    style={styles.button}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#757575',
        marginBottom: 48,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        color: '#333',
    },
    button: {
        marginTop: 8,
    },
});
