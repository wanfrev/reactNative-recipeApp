import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function PerfilScreen({ navigation }) {
  const theme = useTheme();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    alert('Sesión cerrada');
    
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Perfil</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} color={theme.colors.buttonBackground} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});