import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Bell, User, MoreHorizontal } from "lucide-react-native";

export default function A_Home() {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* NAVBAR */}
      <View className="flex-row items-center justify-between bg-[#004AAD] px-5 py-4 shadow-md">
        <Text className="text-white text-xl font-bold">MED LEAVE MANAGER</Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity>
            <Bell color="white" size={22} />
          </TouchableOpacity>
          <TouchableOpacity>
            <User color="white" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Fondo decorativo */}
      <View className="relative">
        <Image
          source={require("../assets/licencia_fondo.png")}
          className="w-full h-32 opacity-60"
          resizeMode="cover"
        />
      </View>

      {/* Contenido */}
      <View className="px-5 mt-4">
        {/* Botón principal */}
        <TouchableOpacity className="bg-[#0078D4] py-3 rounded-xl shadow-md border-2 border-yellow-400">
          <Text className="text-white text-center text-lg font-semibold">
            Subir licencia
          </Text>
        </TouchableOpacity>

        {/* Recordatorio */}
        <View className="bg-[#FEE2E2] border border-[#DC2626] rounded-xl py-3 px-4 mt-4 shadow-sm">
          <Text className="text-[#DC2626] font-bold text-center text-base">
            RECUERDA
          </Text>
          <Text className="text-center text-sm text-[#4B5563] mt-1">
            Tienes un plazo de 48 horas para poder subir tu licencia médica una
            vez emitida.
          </Text>
        </View>

        {/* Navegación */}
        <View className="mt-6 space-y-3">
          <TouchableOpacity className="bg-[#004AAD] py-3 rounded-full shadow border-2 border-yellow-400">
            <Text className="text-white text-center font-semibold text-base">
              Estado de mis licencias
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#004AAD] py-3 rounded-full shadow border-2 border-yellow-400">
            <Text className="text-white text-center font-semibold text-base">
              Historial
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#004AAD] py-3 rounded-full shadow border-2 border-yellow-400">
            <Text className="text-white text-center font-semibold text-base">
              Preguntas frecuentes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Información */}
        <View className="mt-6 bg-white p-2">
          <Text className="text-justify text-gray-700 text-sm leading-5">
            Accede a la normativa vigente sobre licencias médicas, incluyendo
            información sobre plazos de entrega, documentación requerida y
            criterios de validación.
          </Text>
        </View>

        {/* Botón reglamentos */}
        <View className="flex-row items-center justify-between bg-[#FFD700] py-3 px-4 rounded-full shadow mt-4">
          <Text className="text-center text-[#1E3A8A] font-semibold text-base">
            Ver reglamentos
          </Text>
          <MoreHorizontal color="#1E3A8A" size={22} />
        </View>
      </View>
    </ScrollView>
  );
}
