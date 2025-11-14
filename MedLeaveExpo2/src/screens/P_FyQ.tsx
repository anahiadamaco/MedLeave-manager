import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF5FF',
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#007ACC',
  },
  titleText: {
    textAlign: 'center',
    color: '#007ACC',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  content: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 40,
    marginBottom: 100,
  },
  questionContainer: {
    marginBottom: 12,
  },
  questionButton: {
    backgroundColor: '#C7E5FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 8,
  },
  questionText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#003366',
  },
  answerContainer: {
    backgroundColor: '#E5F2FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 4,
  },
  answerText: {
    color: '#333333',
    fontSize: 12,
  },
});

export default function P_FyQ() {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState<number | null>(null);

  const preguntas = [
    {
      id: 1,
      pregunta: '¿Cómo puedo revisar si un estudiante tiene licencia médica aprobada?',
      respuesta: 'A través del módulo de gestión, ingresando con su usuario y revisando la lista de estudiantes con licencia vigente.',
    },
    {
      id: 2,
      pregunta: '¿Recibiré una notificación cuando un estudiante presente licencia médica?',
      respuesta: 'Sí, el sistema enviará una notificación automática al correo institucional y dentro de la plataforma.',
    },
    {
      id: 3,
      pregunta: '¿Puedo ver el tiempo de vigencia de la licencia?',
      respuesta: 'Sí, en el detalle de la licencia aparece la fecha de inicio y término.',
    },
    {
      id: 4,
      pregunta: '¿Qué debo hacer si tengo dudas sobre la validez de una licencia médica?',
      respuesta: 'El sistema permite contactar directamente a la unidad administrativa encargada, adjuntando la licencia en cuestión.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Flecha de volver atrás */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-2 top-2">
        <ChevronLeft size={24} color="#007ACC" />
      </TouchableOpacity>
      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Preguntas{"\n"}Frecuentes
        </Text>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {preguntas.map((item) => (
          <View key={item.id} style={styles.questionContainer}>
            <TouchableOpacity
              style={styles.questionButton}
              onPress={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              <Text style={styles.questionText}>{item.pregunta}</Text>
            </TouchableOpacity>
            {expanded === item.id && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.respuesta}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
