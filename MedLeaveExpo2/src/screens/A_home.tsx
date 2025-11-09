import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Footer from "../components/Footer";

export default function A_Home({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E6F2FF" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#0089E0" }}>Home - Alumno</Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
}
