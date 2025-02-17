import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const Header = ({ headerText, headerIcon }) => {
  return (
    <View style={{ flexDirection: "row", paddingTop: 16 }}>
      <Text style={{ flex: 1, fontSize: 22, fontWeight: "700" }}>
        {headerText}
      </Text>
      <FontAwesome name={headerIcon} size={24} color="black" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
