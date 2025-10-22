import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";

export default function SubirLicenciaScreen() {
  return (
    <View className="flex-1 bg-[#EBF5FF]">
        
      {/* Header */}
      <View className="bg-[#007ACC] flex-row items-center justify-between px-4 pt-10 pb-3">
        <View className="flex-row items-center">
          <Image
            //source={require("")}
            className="w-8 h-8 mr-2"
            resizeMode="contain"
          />
          <Text className="text-white font-bold text-lg">MedLeave MANAGER</Text>
        </View>

        <View className="flex-row">
          <View className="w-6 h-6 bg-white rounded-full ml-2" />
          <View className="w-6 h-6 bg-white rounded-full ml-2" />
        </View>
      </View>

      <Image
        //source={require("")}
        className="w-full h-[130px]"
        resizeMode="cover"
      />

      <View className="absolute top-[140px] left-0 right-0 items-center">
        <Text className="text-white text-xl font-bold shadow text-center">
          Subir licencia medica
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-5 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-center text-[#4A4A4A] mb-4">
          En esta sección podrás ingresar tu licencia médica de forma digital,
          adjuntar los documentos necesarios y enviarlos para su revisión rápida y segura.
        </Text>

        {/* Inputs */}
        {[
          "Nombres",
          "Apellidos",
          "Fecha de emisión",
          "Inicio licencia",
          "Término licencia",
          "Cursos a justificar",
          "Sección",
        ].map((label, index) => (
          <View key={index} className="mb-3">
            <Text className="text-[#333] mb-1">{label}:</Text>
            <TextInput
              className="bg-[#ADD8F1] rounded-md px-3 py-2 border border-[#CCC]"
              placeholderTextColor="#A0A0A0"
            />
          </View>
        ))}

        {/* Botón de adjuntar */}
        <TouchableOpacity className="bg-[#C7E5FF] py-3 rounded-lg mt-2 flex-row justify-center items-center border border-[#CCC]">
          <Text className="text-[#333] font-medium">Adjuntar licencia médica</Text>
          <Text className="text-lg ml-2">📎</Text>
        </TouchableOpacity>

        {/* Botón enviar */}
        <TouchableOpacity className="bg-[#007ACC] py-3 rounded-lg mt-5">
          <Text className="text-white text-center text-lg font-semibold">Enviar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View className="bg-[#007ACC] py-3 px-4 items-center">
        <Text className="text-white font-bold">MedLeave MANAGER</Text>
        <Text className="text-white mt-1 text-sm">Contáctanos</Text>
        <Text className="text-white text-xs mt-1">📍 Calle cualquiera #1010</Text>
        <Text className="text-white text-xs mt-1">📞 +56 9 1234 5678</Text>
        <Text className="text-white text-xs mt-1">✉️ medleave@gmail.com</Text>
      </View>
    </View>
  );
}
