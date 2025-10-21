import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";

export default function A_Register() {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",        // nombre del usuario
    correo_usuario: "",// correo para login
    contrasena: "",    // contraseña
    id_rol: "2",       // 2 = estudiante por defecto
  });

  // Manejar cambios en los inputs
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  // Enviar formulario al backend
  const handleRegister = async () => {
    // Validaciones básicas
    if (!form.nombre || !form.correo_usuario || !form.contrasena) {
      return Alert.alert("Error", "Todos los campos obligatorios deben ser completados.");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("✅ Éxito", "Usuario registrado correctamente");
        setForm({
          nombre: "",
          correo_usuario: "",
          contrasena: "",
          id_rol: "2",
        });
      } else {
        Alert.alert("❌ Error", data.error || "No se pudo registrar el usuario");
      }
    } catch (error) {
      console.error("❌ Error al registrar:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#e6f0ff]">
      {/* Encabezado */}
      <View className="bg-[#0088dc] rounded-b-3xl items-center pt-10 pb-8 shadow-md">
        <Text className="text-white text-2xl font-bold">Registro de Alumno</Text>
        <View className="mt-4 w-20 h-[1px] bg-white" />
        <View className="mt-6 w-20 h-20 bg-white/10 rounded-full border border-white items-center justify-center">
          <Text className="text-white text-4xl">📝</Text>
        </View>
      </View>

      {/* Formulario */}
      <View className="bg-white mx-6 mt-[-40px] rounded-2xl p-5 shadow-lg">
        <Text className="text-gray-600 mb-1">Nombre completo</Text>
        <TextInput
          className="bg-blue-100 rounded-md p-2 mb-4"
          value={form.nombre}
          onChangeText={(text) => handleChange("nombre", text)}
          placeholder="Nombre completo"
        />

        <Text className="text-gray-600 mb-1">Correo electrónico</Text>
        <TextInput
          className="bg-blue-100 rounded-md p-2 mb-4"
          value={form.correo_usuario}
          onChangeText={(text) => handleChange("correo_usuario", text)}
          placeholder="correo@institucion.cl"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-gray-600 mb-1">Contraseña</Text>
        <TextInput
          className="bg-blue-100 rounded-md p-2 mb-4"
          value={form.contrasena}
          onChangeText={(text) => handleChange("contrasena", text)}
          placeholder="********"
          secureTextEntry
        />


        <TouchableOpacity
          className="bg-[#0088dc] mt-6 py-3 rounded-full items-center shadow"
          onPress={handleRegister}
        >
          <Text className="text-white font-bold text-base">Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}