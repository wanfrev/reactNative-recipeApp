import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../context/ThemeContext';

const AddRecipeForm = ({ onClose }) => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);

  const handleAddRecipe = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('ingredients', ingredients);
      formData.append('steps', steps);
      if (image) {
        formData.append('image', {
          uri: image.uri,
          type: 'image/jpeg',
          name: 'recipe.jpg',
        });
      }

      const response = await axios.post('http://192.168.8.1:5000/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        onClose();
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholderTextColor={theme.colors.placeholderText}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholderTextColor={theme.colors.placeholderText}
      />
      <TextInput
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChangeText={setIngredients}
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholderTextColor={theme.colors.placeholderText}
      />
      <TextInput
        placeholder="Steps (comma separated)"
        value={steps}
        onChangeText={setSteps}
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholderTextColor={theme.colors.placeholderText}
      />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      <TouchableOpacity onPress={handleAddRecipe} style={styles.button}>
        <Text style={styles.buttonText}>Add Recipe</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={styles.button}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 16,
  },
});

export default AddRecipeForm;