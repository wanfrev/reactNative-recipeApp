import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import axios from 'axios';

const RecipeDetailScreen = ({ navigation, route }) => {
  const { item, fetchRecipes } = route.params;
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://192.168.8.1:5000/api/groups");
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleAddToGroup = async (groupId) => {
    try {
      await axios.put(`http://192.168.8.1:5000/api/groups/${groupId}/addRecipe`, { recipeId: item._id });
      Alert.alert("Recipe added to group successfully");
      setModalVisible(false);
      fetchGroups(); // Actualizar los grupos después de agregar la receta
    } catch (error) {
      console.error("Error adding recipe to group:", error);
      Alert.alert("Error adding recipe to group");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(`http://192.168.8.1:5000/api/recipes/${item._id}`);
      Alert.alert("Recipe deleted successfully");
      fetchRecipes();
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting recipe:", error);
      Alert.alert("Error deleting recipe");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={[styles.safeArea, { marginHorizontal: 16 }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
          <FontAwesome
            name={"arrow-circle-left"}
            size={24}
            color={theme.colors.buttonBackground}
            style={{ marginTop: 16 }}
          />
        </Pressable>
        <Pressable onPress={handleDeleteRecipe} style={styles.iconButton}>
          <FontAwesome name={"trash"} size={24} color={theme.colors.buttonBackground} style={{ marginTop: 16 }} />
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)} style={styles.iconButton}>
          <FontAwesome name={"heart"} size={24} color={theme.colors.buttonBackground} style={{ marginTop: 16 }} />
        </Pressable>
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: theme.colors.background,
              marginTop: item.image ? 240 : 0,
              borderTopLeftRadius: item.image ? 56 : 0,
              borderTopRightRadius: item.image ? 56 : 0,
              alignItems: "center",
              paddingHorizontal: 16,
            },
          ]}
        >
          {item.image && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `http://192.168.8.1:5000/${item.image}` }}
                style={styles.image}
              />
            </View>
          )}

          {/* Recipe Name */}
          <Text style={[styles.recipeName, { color: theme.colors.text }]}>
            {item.name}
          </Text>

          <View style={{ flex: 1 }}>
            {/* Recipe Description */}
            <Text style={[styles.description, { color: theme.colors.text }]}>
              {item.description}
            </Text>

            {/* Recipe ingredients */}
            <View style={styles.ingredientsContainer}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Ingredients:
              </Text>

              {/* Ingredients list */}
              {item.ingredients.map((ingredient, index) => {
                return (
                  <View key={index} style={styles.ingredientItem}>
                    <View style={[styles.ingredientDot, { backgroundColor: theme.colors.buttonBackground }]} />
                    <Text style={[styles.ingredientText, { color: theme.colors.text }]}>
                      {ingredient}
                    </Text>
                  </View>
                );
              })}

            </View>

            {/* Recipe steps */}
            <View style={styles.stepsContainer}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Steps:
              </Text>

              {/* Steps list */}
              {item.steps.map((step, index) => {
                return (
                  <Text key={index} style={[styles.stepText, { color: theme.colors.text }]}>
                    {`${index + 1}- ${step}`}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal para seleccionar grupo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.title, { color: theme.colors.text }]}>Select Group</Text>
              <FlatList
                data={groups}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <Pressable onPress={() => handleAddToGroup(item._id)} style={styles.groupItem}>
                    <Text style={[styles.groupName, { color: theme.colors.text }]}>{item.name}</Text>
                  </Pressable>
                )}
              />
              <Pressable onPress={() => setModalVisible(false)} style={[styles.button, { backgroundColor: theme.colors.buttonBackground }]}>
                <Text style={{ color: theme.colors.buttonText }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  imageContainer: {
    height: 300,
    width: 300,
    position: "absolute",
    top: -150,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 16,
  },
  recipeName: {
    marginTop: 160,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 16,
  },
  description: {
    marginVertical: 16,
    fontSize: 20,
    textAlign: "center",
    flexWrap: 'wrap',
    marginHorizontal: 16,
  },
  ingredientsContainer: {
    alignSelf: "stretch",
    marginVertical: 22,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  ingredientDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  ingredientText: {
    fontSize: 18,
    marginLeft: 6,
    flexWrap: 'wrap',
    flex: 1,
  },
  stepsContainer: {
    alignSelf: "stretch",
    marginVertical: 22,
    marginHorizontal: 16,
  },
  stepText: {
    fontSize: 18,
    marginLeft: 6,
    marginVertical: 4,
    textAlign: "center",
    flexWrap: 'wrap',
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  groupItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  groupName: {
    fontSize: 18,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default RecipeDetailScreen;