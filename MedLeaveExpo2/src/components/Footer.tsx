import React from 'react';
import { View, Text, Image } from 'react-native';

export default function Footer() {
  return (
    <View className="absolute bottom-0 w-full bg-[#007ACC] flex-row justify-between items-center py-4 px-5">
      {/* Sección izquierda */}
      <View className="flex-1">
        <Text className="text-white font-semibold text-[15px] mb-3">Contáctanos</Text>

        <View className="flex-row items-center mb-2">
          <Image source={require('../assets/Gmail.png')} className="w-[22px] h-[22px] mr-2" />
          <Text className="text-white text-[14px] underline">medleave@gmail.com</Text>
        </View>

        <View className="flex-row items-center mb-2">
          <Image source={require('../assets/Telefono.png')} className="w-[22px] h-[22px] mr-2" />
          <Text className="text-white text-[14px] underline">+56 9 1234 5678</Text>
        </View>

        <View className="flex-row items-center">
          <Image source={require('../assets/Maps.png')} className="w-[22px] h-[22px] mr-2" />
          <Text className="text-white text-[14px] underline">calle cualquiera #1234</Text>
        </View>
      </View>

      {/* Sección derecha */}
      <View className="items-center justify-center">
        <Image
          source={require('../assets/Logo.png')}
          className="w-[90px] h-[90px] mr-[10px]"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
