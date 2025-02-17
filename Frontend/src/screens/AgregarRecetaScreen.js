import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../context/ThemeContext';

export default function AgregarRecetaScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [comensales, setComensales] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [ingredientes, setIngredientes] = useState(['']);
  const [pasos, setPasos] = useState(['']);
  const [imagen, setImagen] = useState(null);
  const theme = useTheme();

  const handleAgregarReceta = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No estás autenticado');
        return;
      }
  
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('comensales', comensales);
      formData.append('tiempo', tiempo);
      formData.append('ingredientes', JSON.stringify(ingredientes));
      formData.append('pasos', JSON.stringify(pasos));
      if (imagen) {
        formData.append('imagen', {
          uri: imagen.uri,
          type: imagen.type,
          name: imagen.fileName,
        });
      }
  
      const response = await axios.post('http://192.168.1.152:5000/api/recipes', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Alert.alert('Éxito', 'Receta agregada exitosamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al agregar la receta:', error);
      Alert.alert('Error', 'Hubo un problema al agregar la receta. Intenta de nuevo.');
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permiso de almacenamiento',
          message: 'Esta aplicación necesita acceso a tu almacenamiento para seleccionar imágenes.',
          buttonNeutral: 'Preguntar más tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleSeleccionarImagen = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        return;
      }
    }

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0];
        setImagen(source);
      }
    });
  };

  const handleAgregarIngrediente = () => {
    setIngredientes([...ingredientes, '']);
  };

  const handleEliminarIngrediente = (index) => {
    const newIngredientes = ingredientes.filter((_, i) => i !== index);
    setIngredientes(newIngredientes);
  };

  const handleIngredienteChange = (text, index) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index] = text;
    setIngredientes(newIngredientes);
  };

  const handleAgregarPaso = () => {
    setPasos([...pasos, '']);
  };

  const handleEliminarPaso = (index) => {
    const newPasos = pasos.filter((_, i) => i !== index);
    setPasos(newPasos);
  };

  const handlePasoChange = (text, index) => {
    const newPasos = [...pasos];
    newPasos[index] = text;
    setPasos(newPasos);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Agregar Receta</Text>

      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder, color: theme.colors.text }]}
        placeholder="Nombre de la receta"
        placeholderTextColor={theme.colors.placeholderText}
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder, color: theme.colors.text }]}
        placeholder="Descripción"
        placeholderTextColor={theme.colors.placeholderText}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder, color: theme.colors.text }]}
        placeholder="Comensales"
        placeholderTextColor={theme.colors.placeholderText}
        value={comensales}
        onChangeText={setComensales}
        keyboardType="numeric"
      />

      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder, color: theme.colors.text }]}
        placeholder="Tiempo de elaboración"
        placeholderTextColor={theme.colors.placeholderText}
        value={tiempo}
        onChangeText={setTiempo}
      />

      <Text style={[styles.subtitle, { color: theme.colors.text }]}>Ingredientes</Text>
      {ingredientes.map((ingrediente, index) => (
        <View key={index} style={styles.ingredienteContainer}>
          <TextInput
            style={[styles.input, styles.ingredienteInput, { backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder, color: theme.colors.text }]}
            placeholder={`Ingrediente ${index + 1}`}
            placeholderTextColor={theme.colors.placeholderText}
            value={ingrediente}
            onChangeText={(text) => handleIngredienteChange(text, index)}
          />
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleEliminarIngrediente(index)}>
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.buttonBackground }]} onPress={handleAgregarIngrediente}>
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Agregar Ingrediente</Text>
      </TouchableOpacity>

      <Text style={[styles.subtitle, { color: theme.colors.text }]}>Pasos</Text>
      {pasos.map((paso, index) => (
        <View key={index} style={styles.pasoContainer}>
          <TextInput
            style={[styles.input, styles.pasoInput, { backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder, color: theme.colors.text }]}
            placeholder={`Paso ${index + 1}`}
            placeholderTextColor={theme.colors.placeholderText}
            value={paso}
            onChangeText={(text) => handlePasoChange(text, index)}
            multiline
          />
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleEliminarPaso(index)}>
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.buttonBackground }]} onPress={handleAgregarPaso}>
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Agregar Paso</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.buttonBackground }]} onPress={handleSeleccionarImagen}>
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {imagen && (
        <Image source={{ uri: imagen.uri }} style={styles.image} />
      )}

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.buttonBackground }]} onPress={handleAgregarReceta}>
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Agregar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  ingredienteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  ingredienteInput: {
    flex: 1,
  },
  pasoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  pasoInput: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
});