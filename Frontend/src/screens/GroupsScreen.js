import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, Modal, FlatList, TextInput, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const GroupsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://192.168.8.1:5000/api/groups");
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleAddGroup = async () => {
    try {
      const response = await axios.post("http://192.168.8.1:5000/api/groups", { name: newGroupName });
      setGroups([...groups, response.data]);
      setNewGroupName("");
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`http://192.168.8.1:5000/api/groups/${groupId}`);
      setGroups(groups.filter(group => group._id !== groupId));
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
          <FontAwesome name={"arrow-circle-left"} size={24} color={theme.colors.buttonBackground} />
        </Pressable>
        <Text style={[styles.title, { color: theme.colors.text }]}>Groups</Text>
        <Pressable onPress={() => setModalVisible(true)} style={styles.iconButton}>
          <FontAwesome name={"plus-circle"} size={24} color={theme.colors.buttonBackground} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <FlatList
          data={groups}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('GroupDetail', { groupId: item._id })} style={styles.groupItem}>
              <Text style={[styles.groupName, { color: theme.colors.text }]}>{item.name}</Text>
              <Pressable onPress={() => handleDeleteGroup(item._id)} style={styles.iconButton}>
                <FontAwesome name={"trash"} size={24} color={theme.colors.buttonBackground} />
              </Pressable>
            </Pressable>
          )}
        />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
              <TextInput
                placeholder="Group Name"
                value={newGroupName}
                onChangeText={setNewGroupName}
                style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.inputBorder }]}
                placeholderTextColor={theme.colors.placeholderText}
              />
              <Pressable onPress={handleAddGroup} style={[styles.button, { backgroundColor: theme.colors.buttonBackground }]}>
                <Text style={{ color: theme.colors.buttonText }}>Add Group</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(false)} style={[styles.button, { backgroundColor: theme.colors.buttonBackground }]}>
                <Text style={{ color: theme.colors.buttonText }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  groupItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  groupName: {
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalContent: {
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default GroupsScreen;