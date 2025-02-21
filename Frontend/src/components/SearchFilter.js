import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const SearchFilter = ({ icon, placeholder, iconColor, onChangeText }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.inputBackground,
          shadowColor: theme.colors.text,
        },
      ]}
    >
      <FontAwesome name={icon} size={20} color={iconColor} />
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholderText}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  input: {
    paddingLeft: 8,
    fontSize: 16,
    flex: 1,
  },
});

export default SearchFilter;