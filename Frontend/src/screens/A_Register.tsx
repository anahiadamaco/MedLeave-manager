import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";

export default function A_Register() {
  // Estado para cada campo
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    rut: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    carrera: "",
    anio_ingreso: "",
  });

  // Manejar cambios
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  // Enviar datos al backend
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert("Éxito", "Usuario registrado exitosamente ✅");
        setForm({
          nombres: "",
          apellidos: "",
          rut: "",
          correo: "",
          fecha_nacimiento: "",
          telefono: "",
          carrera: "",
          anio_ingreso: "",
        });
      } else {
        Alert.alert("Error", data.message || "No se pudo registrar");
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
        <Text className="text-white text-2xl font-bold">Regístrate</Text>
        <View className="mt-4 w-20 h-[1px] bg-white" />
        <View className="mt-6 w-20 h-20 bg-white/10 rounded-full border border-white items-center justify-center">
          <Text className="text-white text-4xl">📝</Text>
        </View>
      </View>

      {/* Formulario */}
      <View className="bg-white mx-6 mt-[-40px] rounded-2xl p-5 shadow-lg">
        <View className="flex-row justify-between">
          <View className="w-[48%]">
            <Text className="text-gray-600 mb-1">Nombres</Text>
            <TextInput
              className="bg-blue-100 rounded-md p-2"
              value={form.nombres}
              onChangeText={(text) => handleChange("nombres", text)}
            />
          </View>
          <View className="w-[48%]">
            <Text className="text-gray-600 mb-1">Apellidos</Text>
            <TextInput
              className="bg-blue-100 rounded-md p-2"
              value={form.apellidos}
              onChangeText={(text) => handleChange("apellidos", text)}
            />
          </View>
        </View>

        <Text className="text-gray-600 mt-4 mb-1">RUT</Text>
        <TextInput
          className="bg-blue-100 rounded-md p-2"
          value={form.rut}
          onChangeText={(text) => handleChange("rut", text)}
        />

        <Text className="text-gray-600 mt-4 mb-1">Correo Electrónico</Text>
        <TextInput
          className="bg-blue-100 rounded-md p-2"
          value={form.correo}
          onChangeText={(text) => handleChange("correo", text)}
        />

        <View className="flex-row justify-between mt-4">
          <View className="w-[48%]">
            <Text className="text-gray-600 mb-1">Fecha de nacimiento</Text>
            <TextInput
              className="bg-blue-100 rounded-md p-2"
              value={form.fecha_nacimiento}
              onChangeText={(text) => handleChange("fecha_nacimiento", text)}
              placeholder="DD/MM/AAAA"
            />
          </View>
          <View className="w-[48%]">
            <Text className="text-gray-600 mb-1">Teléfono</Text>
            <TextInput
              className="bg-blue-100 rounded-md p-2"
              keyboardType="phone-pad"
              value={form.telefono}
              onChangeText={(text) => handleChange("telefono", text)}
            />
          </View>
        </View>

        <View className="flex-row justify-between mt-4">
          <View className="w-[48%]">
            <Text className="text-gray-600 mb-1">Carrera</Text>
            <TextInput
              className="bg-blue-100 rounded-md p-2"
              value={form.carrera}
              onChangeText={(text) => handleChange("carrera", text)}
            />
          </View>
          <View className="w-[48%]">
            <Text className="text-gray-600 mb-1">Año de ingreso</Text>
            <TextInput
              className="bg-blue-100 rounded-md p-2"
              keyboardType="numeric"
              value={form.anio_ingreso}
              onChangeText={(text) => handleChange("anio_ingreso", text)}
            />
          </View>
        </View>

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