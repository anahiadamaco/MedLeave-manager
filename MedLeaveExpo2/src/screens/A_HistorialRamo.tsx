import * as React from "react"; 
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function A_HistorialRamo() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#e6f0fa] p-4">
      {/* Flecha de volver atrás */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-2 top-2">
        <ChevronLeft size={24} color="#007ACC" />
      </TouchableOpacity>

      {/* Título */}
      <Text className="text-[#007ACC] text-xl font-semibold text-center mb-4">
        INFO 1111 - Integración III
      </Text>

      {/* Contenedor de tabla */}
      <View className="bg-[#b5d9ef] rounded-xl p-3 shadow-md shadow-black/20">
        {/* Encabezado */}
        <View className="flex-row items-center justify-between border-b-2 border-[#007ACC] pb-2">
          <Text className="flex-[1.5] text-center font-bold text-[#003f66] text-sm">
            Nombre alumno
          </Text>
          <Text className="flex-1 text-center font-bold text-[#003f66] text-sm">
            Fecha inicio
          </Text>
          <Text className="flex-1 text-center font-bold text-[#003f66] text-sm">
            Fecha fin
          </Text>
          <Text className="flex-[0.5] text-center font-bold text-[#003f66] text-sm">
            PDF
          </Text>
        </View>

        {/* Filas */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <View
                key={i}
                className="flex-row items-center justify-between border-b border-[#aad4e6] py-2"
              >
                <Text className="flex-[1.5] text-center text-[#003f66] text-sm">
                  Juan Castro
                </Text>
                <Text className="flex-1 text-center text-[#003f66] text-sm">
                  12-08-2025
                </Text>
                <Text className="flex-1 text-center text-[#003f66] text-sm">
                  14-08-2025
                </Text>
                <Text className="flex-[0.5] text-center text-[#003f66] text-sm">
                  📄
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}


