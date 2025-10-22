import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

export default function LoginScreen() {
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 bg-[#E6F2FF] items-center">
      {/* ENCABEZADO */}
      <View className="w-full bg-[#0089E0] items-center py-10 rounded-b-[100px]">
        <Text className="text-white text-2xl font-bold mb-4">Bienvenido</Text>
        <View className="w-[90px] h-[90px] rounded-full bg-white items-center justify-center">
          <Image
            // source={require("./assets/document.png")}
            className="w-[50px] h-[50px] tint-[#0089E0]"
          />
        </View>
      </View>

      {/* FORMULARIO */}
      <View className="bg-white border-2 border-[#FFB700] rounded-xl w-[85%] mt-8 p-5 items-center">
        <View className="bg-[#E6F2FF] rounded-full p-2.5 mb-3">
          <Image
            //source={require("")}
            className="w-10 h-10 tint-[#0089E0]"
          />
        </View>

        <Text className="self-start font-semibold text-black mt-2">Rut:</Text>
        <TextInput
          className="w-full bg-[#B9DCFA] rounded-md p-2 mt-1"
          value={rut}
          onChangeText={setRut}
          placeholder="Ej: 12.345.678-9"
          placeholderTextColor="#9EC9E8"
        />

        <Text className="self-start font-semibold text-black mt-3">Correo:</Text>
        <TextInput
          className="w-full bg-[#B9DCFA] rounded-md p-2 mt-1"
          value={correo}
          onChangeText={setCorreo}
          placeholder="correo@ejemplo.com"
          placeholderTextColor="#9EC9E8"
        />

        <Text className="self-start font-semibold text-black mt-3">
          Contraseña:
        </Text>
        <TextInput
          className="w-full bg-[#B9DCFA] rounded-md p-2 mt-1"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="********"
          placeholderTextColor="#9EC9E8"
        />

        <Text className="self-start text-xs text-[#444] mt-2 mb-4">
          ¿Olvidaste tu contraseña?
        </Text>

        <TouchableOpacity className="bg-[#0089E0] py-3 w-[60%] rounded-lg items-center border-2 border-[#FFB700]">
          <Text className="text-white text-base font-bold">Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
