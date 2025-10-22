import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Mail, FileText, HelpCircle } from "lucide-react-native";

export default function P_Home() {
  return (
    <ScrollView className="flex-1 bg-[#E8F3FA] px-4 py-6">
      {/* Header */}
      <View className="flex-row items-center mb-8 bg-[#0096D6] py-4 px-4 rounded-md">
        <Text className="text-white text-2xl mr-3">☰</Text>
        <Text className="text-white text-2xl font-bold">Bienvenido, Profesor</Text>
      </View>

      {/* Tarjeta 1 - Mensajes */}
      <View className="flex-row items-center bg-[#DCEAF7] rounded-2xl mb-6 px-3 py-3 shadow">
        <View className="w-16 h-16 border-4 border-yellow-400 rounded-md justify-center items-center mr-3 bg-white">
          <Mail color="#0096D6" size={36} />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold text-[#0B3178]">Mensajes</Text>
          <Text className="text-sm text-[#0B3178]">
            Aquí puede revisar los mensajes más recientes.
          </Text>
        </View>

        <TouchableOpacity className="bg-[#0096D6] w-10 h-10 rounded-full justify-center items-center ml-2">
          <Text className="text-white text-xl">{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjeta 2 - Historial */}
      <View className="flex-row items-center bg-[#DCEAF7] rounded-2xl mb-6 px-3 py-3 shadow">
        <View className="w-16 h-16 border-4 border-yellow-400 rounded-md justify-center items-center mr-3 bg-white">
          <FileText color="#0096D6" size={36} />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold text-[#0B3178]">Historial</Text>
          <Text className="text-sm text-[#0B3178]">
            Consulta el historial de cada uno de tus ramos.
          </Text>
        </View>

        <TouchableOpacity className="bg-[#0096D6] w-10 h-10 rounded-full justify-center items-center ml-2">
          <Text className="text-white text-xl">{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjeta 3 - Preguntas frecuentes */}
      <View className="flex-row items-center bg-[#DCEAF7] rounded-2xl mb-6 px-3 py-3 shadow">
        <View className="w-16 h-16 border-4 border-yellow-400 rounded-md justify-center items-center mr-3 bg-white">
          <HelpCircle color="#0096D6" size={36} />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold text-[#0B3178]">Preguntas frecuentes</Text>
          <Text className="text-sm text-[#0B3178]">
            Encuentra respuestas a las dudas de uso de la plataforma.
          </Text>
        </View>

        <TouchableOpacity className="bg-[#0096D6] w-10 h-10 rounded-full justify-center items-center ml-2">
          <Text className="text-white text-xl">{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View className="mt-8 items-center">
        <Text className="text-[#0B3178] text-sm">Contáctanos</Text>
        <Text className="text-[#0096D6] text-sm underline">medleave@gmail.com</Text>
        <Text className="text-[#0B3178] text-sm">+56 9 1234 5678</Text>
        <Image
          source={require("../assets/logo.png")}
          className="w-24 h-24 mt-4"
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
}
