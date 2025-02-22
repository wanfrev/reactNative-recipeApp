import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const RecipeCard = ({ recipes, fetchRecipes }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("RecipeDetail", { item: item, fetchRecipes: fetchRecipes })}
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.background,
                shadowColor: theme.colors.text,
              },
            ]}
          >
            <Image
              source={{ uri: `http://192.168.8.1:5000${item.image}` }}
              style={styles.image}
            />
            <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
            <View>
              <Text style={[styles.time, { color: theme.colors.text }]}>{item.time}</Text>
              <View>
                <Text style={[styles.rating, { color: theme.colors.text }]}>{item.rating}</Text>
              </View>
            </View>
          </Pressable>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 26,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 16,
  },
  rating: {
    fontSize: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default RecipeCard;