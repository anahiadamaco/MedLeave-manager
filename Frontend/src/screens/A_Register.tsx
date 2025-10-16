import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function A_Register() {
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
                <TextInput className="bg-blue-100 rounded-md p-2" />
            </View>
            <View className="w-[48%]">
                <Text className="text-gray-600 mb-1">Apellidos</Text>
                <TextInput className="bg-blue-100 rounded-md p-2" />
            </View>
            </View>

            <Text className="text-gray-600 mt-4 mb-1">RUT</Text>
            <TextInput className="bg-blue-100 rounded-md p-2" />

            <Text className="text-gray-600 mt-4 mb-1">Correo Electrónico</Text>
            <TextInput className="bg-blue-100 rounded-md p-2" />

            <View className="flex-row justify-between mt-4">
            <View className="w-[48%]">
                <Text className="text-gray-600 mb-1">Fecha de nacimiento</Text>
                <TextInput className="bg-blue-100 rounded-md p-2" placeholder="DD/MM/AAAA" />
            </View>
            <View className="w-[48%]">
                <Text className="text-gray-600 mb-1">Teléfono</Text>
                <TextInput className="bg-blue-100 rounded-md p-2" keyboardType="phone-pad" />
            </View>
            </View>

            <View className="flex-row justify-between mt-4">
            <View className="w-[48%]">
                <Text className="text-gray-600 mb-1">Carrera</Text>
                <TextInput className="bg-blue-100 rounded-md p-2" />
            </View>
            <View className="w-[48%]">
                <Text className="text-gray-600 mb-1">Año de ingreso</Text>
                <TextInput className="bg-blue-100 rounded-md p-2" keyboardType="numeric" />
            </View>
            </View>

            <TouchableOpacity className="bg-[#0088dc] mt-6 py-3 rounded-full items-center shadow">
            <Text className="text-white font-bold text-base">Registrarse</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    );
}
