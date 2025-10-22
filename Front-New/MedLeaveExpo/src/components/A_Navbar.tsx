import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/*Encabesado*/}

      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "#ccc" }} />
        <Text style={{ marginTop: 10 }}>medleave@gmail.com</Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate("Opcion1")}>
          <Text>Opción 1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("Opcion2")}>
          <Text>Opción 2</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("Opcion3")}>
          <Text>Opción 3</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("Opcion4")}>
          <Text>Opción 4</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("Opcion5")}>
          <Text>Opción 5</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function PantallaEjemplo({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{route.name}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Opcion1" component={PantallaEjemplo} />
        <Drawer.Screen name="Opcion2" component={PantallaEjemplo} />
        <Drawer.Screen name="Opcion3" component={PantallaEjemplo} />
        <Drawer.Screen name="Opcion4" component={PantallaEjemplo} />
        <Drawer.Screen name="Opcion5" component={PantallaEjemplo} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
