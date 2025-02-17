import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const theme = useTheme();

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'El email no es válido');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.152:5000/api/users/register', {
        email,
        password
      });
      Alert.alert('Registro Exitoso', 'Ahora puedes iniciar sesión con tu cuenta.');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el usuario. Intenta de nuevo.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Registro</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder, color: theme.colors.text }]}
        placeholder="Correo electrónico"
        placeholderTextColor={theme.colors.placeholderText}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder, color: theme.colors.text }]}
        placeholder="Contraseña"
        placeholderTextColor={theme.colors.placeholderText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder, color: theme.colors.text }]}
        placeholder="Confirmar Contraseña"
        placeholderTextColor={theme.colors.placeholderText}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.buttonBackground }]} onPress={handleRegister}>
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.linkText, { color: theme.colors.linkText }]}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
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
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
  linkText: {
    marginTop: 10,
  },
});