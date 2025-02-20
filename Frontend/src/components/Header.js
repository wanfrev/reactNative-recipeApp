import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const Header = ({ headerText, headerIcon, textColor }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, { color: textColor }]}>{headerText}</Text>
      <FontAwesome name={headerIcon} size={24} color={textColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;