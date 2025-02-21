import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const Header = ({ headerText, headerIcon, textColor, iconColor, onPress }) => {
  const theme = useTheme();

  return (
    <View style={styles.header}>
      <Text style={[styles.headerText, { color: textColor }]}>{headerText}</Text>
      <Pressable onPress={onPress}>
        <FontAwesome name={headerIcon} size={24} color={iconColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Header;