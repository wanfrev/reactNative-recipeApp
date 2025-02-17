import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

const RecetasScreen = ({ navigation }) => {
  const [recetas, setRecetas] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://192.168.1.108:5000/api/recetas', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRecetas(response.data);
        }
      } catch (error) {
        console.error("Error fetching recetas", error);
      }
    };
    fetchRecetas();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Mis Recetas</Text>
      <FlatList
        data={recetas}
        renderItem={({ item }) => (
          <View style={[styles.recipeCard, { borderBottomColor: theme.colors.inputBorder }]}>
            <Text style={{ color: theme.colors.text }}>{item.nombre}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      <Pressable style={[styles.fab, { backgroundColor: theme.colors.buttonBackground }]} onPress={() => navigation.navigate('AgregarReceta')}>
        <Text style={[styles.fabText, { color: theme.colors.buttonText }]}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipeCard: {
    padding: 10,
    borderBottomWidth: 1,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
  },
});

export default RecetasScreen;