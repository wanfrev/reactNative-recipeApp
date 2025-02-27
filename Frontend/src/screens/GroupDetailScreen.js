import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, FlatList, Image, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

import { useIsFocused } from '@react-navigation/native';

const GroupDetailScreen = ({ navigation, route }) => {
  const { groupId } = route.params;
  const theme = useTheme();
  const [group, setGroup] = useState(null);
  const isFocused = useIsFocused();

  const fetchGroup = async () => {
    try {
      const response = await axios.get(`http://192.168.8.1:5000/api/groups/${groupId}`);
      setGroup(response.data);
    } catch (error) {
      console.error("Error fetching group:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchGroup();
    }
  }, [isFocused]);

  if (!group) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
            <FontAwesome name={"arrow-circle-left"} size={24} color={theme.colors.buttonBackground} />
          </Pressable>
          <Text style={[styles.title, { color: theme.colors.text }]}>{group.name}</Text>
        </View>

        <FlatList
          data={group.recipes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('RecipeDetail', { item, fetchRecipes: fetchGroup })} style={styles.recipeItem}>
              <Image source={{ uri: `http://192.168.8.1:5000/${item.image}` }} style={styles.image} />
              <Text style={[styles.recipeName, { color: theme.colors.text }]} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            </Pressable>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  recipeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  recipeName: {
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default GroupDetailScreen;