import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Home, History, HelpCircle, User, Mail } from "lucide-react-native";

import { useTheme } from "./ThemeContext";

type Props = {
  navigation: NavigationProp<any>;
};

export default function A_Menu({ navigation }: Props) {
  const { isDark } = useTheme();

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("P_Home")}
      >
        <Home color="#ffffff" size={26} />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

       <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("P_Mensajes")}
      >
        <Mail color="#ffffff" size={26} />
        <Text style={styles.label}>Mensajes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("P_Historial")}
      >
        <History color="#ffffff" size={26} />
        <Text style={styles.label}>Historial</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("P_FyQ")}
      >
        <HelpCircle color="#ffffff" size={26} />
        <Text style={styles.label}>Preguntas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("P_ProfileUser")}
      >
        <User color="#ffffff" size={26} />
        <Text style={styles.label}>Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#048ED4",
    paddingTop: 8,
    paddingBottom: 50,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#048ED4",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  blackContainer: {
    backgroundColor: "#0f172a",
    borderTopColor: "#334155",
  },

  item: {
    alignItems: "center",
  },
  label: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 2,
  },
});
