import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const RecipeDetailScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const theme = useTheme();

  console.log(item);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={[styles.safeArea, { marginHorizontal: 16 }]}>
        <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()}>
          <FontAwesome
            name={"arrow-circle-left"}
            size={20}
            color={theme.colors.text}
            style={{ flex: 1 }}
          />
        </Pressable>
        <FontAwesome name={"heart-o"} size={20} color={theme.colors.text} />
      </SafeAreaView>
      <View
        style={[
          styles.content,
          {
            backgroundColor: theme.colors.background,
            marginTop: 240,
            borderTopLeftRadius: 56,
            borderTopRightRadius: 56,
            alignItems: "center",
            paddingHorizontal: 16,
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `http://192.168.8.1:5000/${item.image}` }}
            style={styles.image}
          />
        </View>

        {/* Recipe Name */}
        <Text style={[styles.recipeName, { color: theme.colors.text }]}>
          {item.name}
        </Text>

        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                    <View style={styles.ingredientDot} />
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
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    width: 300,
    position: "absolute",
    top: -150,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  recipeName: {
    marginTop: 160,
    fontSize: 28,
    fontWeight: "bold",
  },
  description: {
    marginVertical: 16,
    fontSize: 20,
  },
  ingredientsContainer: {
    alignSelf: "flex-start",
    marginVertical: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  ingredientDot: {
    backgroundColor: "red",
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  ingredientText: {
    fontSize: 18,
    marginLeft: 6,
  },
  stepsContainer: {
    alignSelf: "flex-start",
    marginVertical: 22,
  },
  stepText: {
    fontSize: 18,
    marginLeft: 6,
  },
});

export default RecipeDetailScreen;