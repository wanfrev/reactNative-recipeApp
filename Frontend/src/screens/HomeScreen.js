import { View, Text, SafeAreaView, StyleSheet, Pressable, Modal, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";
import { useTheme } from "../context/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
import AddRecipeForm from "../components/AddRecipeForm";
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://192.168.8.1:5000/api/recipes");
      const sortedRecipes = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setRecipes(sortedRecipes);
      setFilteredRecipes(sortedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const results = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(results);
  }, [searchTerm, recipes]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Render Header */}
        <Header headerText={"Hi, Wanfrev"} headerIcon={"heart"} textColor={theme.colors.text} iconColor={theme.colors.buttonBackground} onPress={() => navigation.navigate('Groups')} />

        {/* Search Filter */}
        <View style={styles.marginHorizontal}>
          <SearchFilter
            icon="search"
            placeholder={"Search..."}
            iconColor={theme.colors.buttonBackground}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Categories filter */}
        <View style={[styles.marginHorizontal, { marginTop: 22 }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Categories</Text>

          {/* Categories list */}
          <CategoriesFilter />
        </View>

        {/* Recipe list */}
        <View style={[styles.marginHorizontal, { marginTop: 22, flex: 1 }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Recipes</Text>
          
          <RecipeCard recipes={filteredRecipes} fetchRecipes={fetchRecipes} />
        </View>
      </ScrollView>

      {/* Botón circular */}
      <Pressable
        style={[styles.fab, { backgroundColor: theme.colors.buttonBackground }]}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="plus" size={24} color={theme.colors.buttonText} />
      </Pressable>

      {/* Modal para agregar receta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
              <AddRecipeForm onClose={() => { setModalVisible(false); fetchRecipes(); }} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Asegurarse de que el fondo sea oscuro
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalContent: {
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 20,
  },
});