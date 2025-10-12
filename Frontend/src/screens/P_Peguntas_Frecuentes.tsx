import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

export default function PreguntasFrecuentesScreen() {
  return (
    <View className="flex-1 bg-[#EBF5FF]">
      {/* Header */}
      <View className="flex-row items-center justify-between bg-[#007ACC] pt-10 pb-3 px-4">
        <TouchableOpacity className="bg-[#005EA6] rounded-lg px-2.5 py-1">
          <Text className="text-white text-xl">☰</Text>
        </TouchableOpacity>

        <Text className="text-white font-bold text-base">MedLeave Manager</Text>

        <View className="items-center">
          <Text className="text-white text-xs text-center">
            Cuenta:{"\n"}Juan Pérez
          </Text>
          <Text className="text-white text-xl">➡️</Text>
        </View>
      </View>

      {/* Imagen encabezado*/}
      <Image
        //source={require(")}
        className="w-full h-10"
        resizeMode="cover"
      />

      {/* Título */}
      <View className="items-center mt-5 mb-1">
        <Text className="text-center text-[#007ACC] text-xl font-bold">
          Preguntas{"\n"}Frecuentes
        </Text>
      </View>

      {/* Contenido */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="bg-white mx-4 rounded-lg p-3 border border-[#BBD8EE] mt-10">
          {/* Pregunta 1 */}
          <Text className="bg-[#C7E5FF] rounded-md p-2 font-semibold mt-2 text-[#003366]">
            ¿Cómo puedo revisar si un estudiante tiene licencia médica aprobada?
          </Text>
          <Text className="bg-[#E5F2FF] rounded-md p-2 mt-1 text-[#333] text-sm">
            A través del módulo de gestión, ingresando con su usuario y revisando la lista de
            estudiantes con licencia vigente.
          </Text>

          {/* Pregunta 2 */}
          <Text className="bg-[#C7E5FF] rounded-md p-2 font-semibold mt-3 text-[#003366]">
            ¿Recibiré una notificación cuando un estudiante presente licencia médica?
          </Text>
          <Text className="bg-[#E5F2FF] rounded-md p-2 mt-1 text-[#333] text-sm">
            Sí, el sistema enviará una notificación automática al correo institucional y dentro de la
            plataforma.
          </Text>

          {/* Pregunta 3 */}
          <Text className="bg-[#C7E5FF] rounded-md p-2 font-semibold mt-3 text-[#003366]">
            ¿Puedo ver el tiempo de vigencia de la licencia?
          </Text>
          <Text className="bg-[#E5F2FF] rounded-md p-2 mt-1 text-[#333] text-sm">
            Sí, en el detalle de la licencia aparece la fecha de inicio y término.
          </Text>

          {/* Pregunta 4 */}
          <Text className="bg-[#C7E5FF] rounded-md p-2 font-semibold mt-3 text-[#003366]">
            ¿Qué debo hacer si tengo dudas sobre la validez de una licencia médica?
          </Text>
          <Text className="bg-[#E5F2FF] rounded-md p-2 mt-1 text-[#333] text-sm">
            El sistema permite contactar directamente a la unidad administrativa encargada,
            adjuntando la licencia en cuestión.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="bg-[#007ACC] items-center py-4">
        <Text className="text-white font-bold text-sm">Contáctanos</Text>
        <Text className="text-white text-xs mt-1">📧 medleave@gmail.com</Text>
        <Text className="text-white text-xs mt-0.5">📞 +56 9 1234 5678</Text>

        <Image
          //source={require("./assets/logo_footer.png")}
          className="w-24 h-12 mt-2"
          resizeMode="contain"
        />
        <Text className="text-white text-xs -mt-1">MedLeave MANAGER</Text>
      </View>
    </View>
  );
}
