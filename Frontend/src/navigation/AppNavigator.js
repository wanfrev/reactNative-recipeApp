import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen";
import RecetasScreen from "../screens/RecetasScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PerfilScreen from "../screens/PerfilScreen";
import AgregarRecetaScreen from "../screens/AgregarRecetaScreen";
import { useTheme } from "../context/ThemeContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function PerfilDrawer() {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Perfil"
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        drawerLabelStyle: {
          color: theme.colors.text,
        },
      }}
    >
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
    </Drawer.Navigator>
  );
}

function HomeTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarLabelStyle: {
          color: theme.colors.text,
        },
      }}
    >
      <Tab.Screen name="Recetas" component={RecetasScreen} />
      <Tab.Screen name="Perfil" component={PerfilDrawer} />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.buttonBackground,
          },
          headerTintColor: theme.colors.buttonText,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recetas"
          component={RecetasScreen}
          options={{
            title: 'Mis Recetas',
            headerStyle: {
              backgroundColor: theme.colors.buttonBackground,
            },
            headerTintColor: theme.colors.buttonText,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AgregarReceta"
          component={AgregarRecetaScreen}
          options={{
            title: 'Agregar Receta',
            headerStyle: {
              backgroundColor: theme.colors.buttonBackground,
            },
            headerTintColor: theme.colors.buttonText,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;