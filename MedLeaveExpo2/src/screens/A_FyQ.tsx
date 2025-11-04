import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Footer from "../components/Footer";

export default function A_FyQ() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Titulo */}
      <View className="items-center py-8 bg-blue-600">
        <Text className="text-2xl font-bold text-white text-center">
          Preguntas{"\n"}Frecuentes
        </Text>
      </View>

      {/* Preguntas */}
      <View className="px-4 py-4">
        {/* Pregunta 1 */}
        <TouchableOpacity
          className="flex-row justify-between items-center border border-blue-500 rounded-lg p-3 mb-3 bg-white"
          onPress={() => toggleExpand(1)}
        >
          <Text className="text-base font-semibold text-black">
            ¿Cómo subo mi licencia?
          </Text>
          <Text className="text-lg text-yellow-500">▼</Text>
        </TouchableOpacity>
        {expanded === 1 && (
          <View className="border border-blue-500 rounded-lg p-3 mb-3 bg-white">
            <Text className="text-sm text-black text-justify">
              Respuesta.
            </Text>
          </View>
        )}

        {/* Pregunta 2 */}
        <TouchableOpacity
          className="flex-row justify-between items-center border border-blue-500 rounded-lg p-3 mb-3 bg-white"
          onPress={() => toggleExpand(2)}
        >
          <Text className="text-base font-semibold text-black">
            ¿Quién puede ver mi licencia médica?
          </Text>
          <Text className="text-lg text-yellow-500">▼</Text>
        </TouchableOpacity>
        {expanded === 2 && (
          <View className="border border-blue-500 rounded-lg p-3 mb-3 bg-white">
            <Text className="text-sm text-black text-justify">
              Tu licencia médica será revisada únicamente por la secretaria de carrera y 
              por los docentes de las asignaturas en las que solicites justificación, 
              garantizando confidencialidad y uso exclusivo para fines académicos.
            </Text>
          </View>
        )}

        {/* Pregunta 3 */}
        <TouchableOpacity
          className="flex-row justify-between items-center border border-blue-500 rounded-lg p-3 mb-3 bg-white"
          onPress={() => toggleExpand(3)}
        >
          <Text className="text-base font-semibold text-black">
            ¿Hay un plazo máximo para subir la licencia?
          </Text>
          <Text className="text-lg text-yellow-500">▼</Text>
        </TouchableOpacity>
        {expanded === 3 && (
          <View className="border border-blue-500 rounded-lg p-3 mb-3 bg-white">
            <Text className="text-sm text-black text-justify">
              Respuesta
            </Text>
          </View>
        )}

        {/* Pregunta 4 */}
        <TouchableOpacity
          className="flex-row justify-between items-center border border-blue-500 rounded-lg p-3 mb-3 bg-white"
          onPress={() => toggleExpand(4)}
        >
          <Text className="text-base font-semibold text-black">
            ¿Qué significan los estados de mi solicitud?
          </Text>
          <Text className="text-lg text-yellow-500">▼</Text>
        </TouchableOpacity>
        {expanded === 4 && (
          <View className="border border-blue-500 rounded-lg p-3 mb-3 bg-white">
            <Text className="text-sm text-black text-justify">
              Respuesta
            </Text>
          </View>
        )}

        {/* Pregunta 5 */}
        <TouchableOpacity
          className="flex-row justify-between items-center border border-blue-500 rounded-lg p-3 mb-3 bg-white"
          onPress={() => toggleExpand(5)}
        >
          <Text className="text-base font-semibold text-black">
            ¿Qué hago si mi licencia fue rechazada?
          </Text>
          <Text className="text-lg text-yellow-500">▼</Text>
        </TouchableOpacity>
        {expanded === 5 && (
          <View className="border border-blue-500 rounded-lg p-3 mb-3 bg-white">
            <Text className="text-sm text-black text-justify">
              Respuesta
            </Text>
          </View>
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}
