import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      {/* Render Header */}
      <Header headerText={"Hi, Wanfrev"} headerIcon={"bell-o"} />
      {/* Search Filter */}
      <SearchFilter icon="search" placeholder={"Search..."} />
      {/* Categories filter */}
      <View style={{ marginTop: 22 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text>
        {/* Categories list */}
        <CategoriesFilter />
      </View>
    </SafeAreaView>
  );
}