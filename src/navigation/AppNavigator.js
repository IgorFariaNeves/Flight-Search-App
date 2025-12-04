import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

import SearchScreen from '../screens/SearchScreen';
import HistoryScreen from '../screens/HistoryScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FlightDetailsScreen from '../screens/FlightDetailsScreen';
import MapScreen from '../screens/MapScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Buscar') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Histórico') {
                        iconName = focused ? 'time' : 'time-outline';
                    } else if (route.name === 'Favoritos') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Configurações') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                headerShown: false, // O Drawer ou Stack cuidará do Header
            })}
        >
            <Tab.Screen name="Buscar" component={SearchScreen} />
            <Tab.Screen name="Histórico" component={HistoryScreen} />
            <Tab.Screen name="Favoritos" component={FavoritesScreen} />
            <Tab.Screen name="Configurações" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="HomeTabs">
            <Drawer.Screen
                name="HomeTabs"
                component={TabNavigator}
                options={{
                    title: 'Início',
                    drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />
                }}
            />
            <Drawer.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: 'Mapa de Aeroportos',
                    drawerIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color} />
                }}
            />
        </Drawer.Navigator>
    );
}

function MainStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FlightDetails"
                component={FlightDetailsScreen}
                options={{ title: 'Detalhes do Voo' }}
            />
        </Stack.Navigator>
    );
}

function AuthStackNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
}

export default function AppNavigator() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return null; // You could show a splash screen here
    }

    return (
        <NavigationContainer>
            {user ? <MainStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
}
