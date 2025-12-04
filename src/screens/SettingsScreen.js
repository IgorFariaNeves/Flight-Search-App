import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { clearHistory, clearFavorites } from '../services/storage';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function SettingsScreen() {
    const handleClearData = async () => {
        Alert.alert(
            'Limpar Dados',
            'Tem certeza que deseja limpar todo o histórico e favoritos?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Limpar',
                    style: 'destructive',
                    onPress: async () => {
                        await clearHistory();
                        await clearFavorites();
                        Alert.alert('Sucesso', 'Dados limpos com sucesso.');
                    },
                },
            ]
        );
    };

    const handleLogout = async () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair da sua conta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await signOut(auth);
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Conta</Text>
                <CustomButton
                    title="Sair"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dados</Text>
                <CustomButton
                    title="Limpar Histórico e Favoritos"
                    onPress={handleClearData}
                    style={styles.dangerButton}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sobre</Text>
                <Text style={styles.text}>Flight Search App v1.0.0</Text>
                <Text style={styles.text}>Desenvolvido com React Native</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    text: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 8,
    },
    dangerButton: {
        backgroundColor: '#F44336',
    },
    logoutButton: {
        backgroundColor: '#FF9800',
    },
});
