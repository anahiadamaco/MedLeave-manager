import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function A_Login {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Correo:", email);
    console.log("Contraseña:", password);
  };

  return (
    <SafeAreaView className="flex-1 bg-sky-500 items-center justify-center px-6">
      {/* Logo */}
      <View className="items-center mb-10">
        <View className="border-4 border-white rounded-full p-10">
          <Text className="text-white font-semibold text-lg">
            (aquí va el logo)
          </Text>
        </View>
      </View>

      {/* Formulario */}
      <View className="bg-sky-500 border border-yellow-400 rounded-xl p-6 w-full max-w-sm">
        <Text className="text-white text-2xl font-bold text-center mb-6">
          Bienvenido a{"\n"}MedLeave Manager
        </Text>

        <Text className="text-white mb-1 font-medium">Correo:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Ingrese su correo"
          placeholderTextColor="#ccc"
          className="bg-yellow-400 rounded-md px-3 py-2 mb-4 text-black"
        />

        <Text className="text-white mb-1 font-medium">Contraseña:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#ccc"
          className="bg-yellow-400 rounded-md px-3 py-2 mb-6 text-black"
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-sky-600 py-2 rounded-md border border-yellow-400"
        >
          <Text className="text-center text-white font-semibold">
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
