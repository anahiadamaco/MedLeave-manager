import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, ScrollView } from "react-native";
import Footer from "../components/Footer";

const A_Login = () => {
  // Estados locales
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    // Contenedor principal
    <ScrollView style={{ flex: 1, padding: 16 }}>

      {/* Sección del logo en la parte superior */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text>LOGO</Text>
      </View>

      {/* Mensaje de bienvenida */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text>Bienvenido a MedLeave Manager</Text>
      </View>

      {/* Campo de texto para ingresar el correo */}
      <View style={{ marginBottom: 12 }}>
        <Text>Correo:</Text>
        <TextInput
          placeholder="Ingresa tu correo"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Campo de texto para ingresar la contraseña */}
      <View style={{ marginBottom: 20 }}>
        <Text>Contraseña:</Text>
        <TextInput
          placeholder="Ingresa tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Botón iniciar sesión */}
      <TouchableOpacity 
        onPress={() => console.log("Login")} 
        style={{ padding: 12, borderWidth: 1, borderRadius: 4, alignItems: "center" }}
      >
        <Text>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Footer />
    </ScrollView>
  );
};

export default A_Login;
