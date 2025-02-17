import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { categories } from "../data/categories"; // Corregir la importación

const CategoriesFilter = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => {
          return (
            <View
              key={category.id} // Añadir key
              style={{
                backgroundColor: index === 0 ? "#BB86FC" : "#fff",
                marginRight: 36,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 7,
                marginVertical: 16,
              }}
            >
              <Text
                style={{
                  color: index === 0 && "#FFF",
                  fontSize: 18,
                }}
              >
                {category.category}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoriesFilter;

const styles = StyleSheet.create({});
