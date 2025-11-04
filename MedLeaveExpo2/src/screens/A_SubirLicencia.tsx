import React from "react";
import {View, Text, TextInput, TouchableOpacity, ScrollView, Image} from "react-native";
import Footer from "../components/Footer";

export default function A_SubirLicencia() {
  return (
    <View className="flex-1 bg-[#EBF5FF]">
      {/* Imagen de encabezado */}
      <Image
        // source={require("")}
        className="w-full h-[130px]"
        resizeMode="cover"
      />

      {/* Título superpuesto */}
      <View className="absolute top-[90px] left-0 right-0 items-center">
        <Text className="text-white text-xl font-bold text-center drop-shadow">
          Subir licencia médica
        </Text>
      </View>

      {/* Contenido principal */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-5 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-center text-[#4A4A4A] mb-4">
          En esta sección podrás ingresar tu licencia médica de forma digital,
          adjuntar los documentos necesarios y enviarlos para su revisión rápida
          y segura.
        </Text>

        {/* Campo: Nombres */}
        <View className="mb-3">
          <Text className="text-[#333] mb-1">Nombres:</Text>
          <TextInput className="bg-[#ADD8F1] rounded-md px-3 py-2 border border-[#CCC]" />
        </View>

        {/* Campo: Apellidos */}
        <View className="mb-3">
          <Text className="text-[#333] mb-1">Apellidos:</Text>
          <TextInput className="bg-[#ADD8F1] rounded-md px-3 py-2 border border-[#CCC]" />
        </View>

        {/* Campo: Fecha de emisión */}
        <View className="mb-3">
          <Text className="text-[#333] mb-1">Fecha de emisión:</Text>
          <TextInput className="bg-[#ADD8F1] rounded-md px-3 py-2 border border-[#CCC]" />
        </View>

        {/* Campo: Inicio licencia */}
        <View className="mb-3">
          <Text className="text-[#333] mb-1">Inicio licencia:</Text>
          <TextInput className="bg-[#ADD8F1] rounded-md px-3 py-2 border border-[#CCC]" />
        </View>

        {/* Campo: Término licencia */}
        <View className="mb-3">
          <Text className="text-[#333] mb-1">Término licencia:</Text>
          <TextInput className="bg-[#ADD8F1] rounded-md px-3 py-2 border border-[#CCC]" />
        </View>

        {/* Campo: Cursos a justificar */}
        <View className="mb-3">
          <Text className="text-[#333] mb-1">Cursos a justificar:</Text>
          <TextInput className="bg-[#ADD8F1] rounded-md px-3 py-2 border border-[#CCC]" />
        </View>

        {/* Campo: Sección */}
        <View className="mb-3">
          <Text className="text-[#333] mb-1">Sección:</Text>
          <TextInput className="bg-[#ADD8F1] rounded-md px-3 py-2 border border-[#CCC]" />
        </View>

        {/* Botón de adjuntar */}
        <TouchableOpacity className="bg-[#C7E5FF] py-3 rounded-lg mt-2 flex-row justify-center items-center border border-[#CCC]">
          <Text className="text-[#333] font-medium">Adjuntar licencia médica</Text>
          <Text className="text-lg ml-2">📎</Text>
        </TouchableOpacity>

        {/* Botón enviar */}
        <TouchableOpacity className="bg-[#007ACC] py-3 rounded-lg mt-5">
          <Text className="text-white text-center text-lg font-semibold">Enviar</Text>
        </TouchableOpacity>
        <Footer />
      </ScrollView>
    </View>
  );
}
