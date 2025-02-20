import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Render Header */}
      <Header headerText={"Hi, Wanfrev"} headerIcon={"heart"} textColor={theme.colors.text} iconColor={theme.colors.buttonBackground} />

      {/* Search Filter */}
      <View style={styles.marginHorizontal}>
        <SearchFilter icon="search" placeholder={"Search..."} iconColor={theme.colors.buttonBackground} />
      </View>

      {/* Categories filter */}
      {/* <View style={[styles.marginHorizontal, { marginTop: 22 }]}> */}
        {/* <Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text> */}

        {/* Categories list */}
        {/* <CategoriesFilter /> */}
      {/* </View> */}

      {/* Categories filter */}
      <View style={[styles.marginHorizontal, { marginTop: 22, flex: 1 }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Recipes</Text>
        
        {/* Recipe list */}
        <RecipeCard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Asegurarse de que el fondo sea oscuro
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
});