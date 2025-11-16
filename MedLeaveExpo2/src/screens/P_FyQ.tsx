import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { styles } from "../styles/P_FyQ.styles";
import P_Menu from "../components/P_Menu";

export default function P_FyQ({ navigation }: any) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const preguntas = [
    {
      id: 1,
      pregunta: '¿Cómo puedo revisar si un estudiante tiene una licencia médica aprobada?',
      respuesta: 'Puedes revisarlo en "Historial" y luego accediendo al ramo, allí se muestra la lista de estudiantes con licencias y su detalle.',
    },
    {
      id: 2,
      pregunta: '¿Recibiré una notificación cuando un estudiante presente licencia médica?',
      respuesta: 'Sí, recibirás una notificación indicando que se ha presentado una licencia.',
    },
    {
      id: 3,
      pregunta: '¿Dónde puedo ver la fecha de inicio y término de la licencia?',
      respuesta: 'En el detalle de la licencia, dentro del historial y seleccionando el ramo.',
    },
    {
      id: 4,
      pregunta: '¿Qué debo hacer si tengo dudas sobre la validez de una licencia médica?',
      respuesta: 'Puedes derigirte hacía donde la persona encargada de la revisión de licencias.',
    },
    {
      id: 5,
      pregunta: '¿Qué pasa si un estudiante tiene una evaluación durante el periodo de su licencia médica?',
      respuesta: 'Debes ofrecer una instancia de reposición acorde al reglamento académico.',
    },
    {
      id: 6,
      pregunta: '¿Puedo ver las licencias anteriores de un estudiante?',
      respuesta: 'Sí, en el "Historial" podrás ver todas las licencias previas por ramo.',
    },
    {
      id: 7,
      pregunta: '¿Qué hago si un estudiante alega haber subido una licencia pero no aparece en el sistema?',
      respuesta: 'Debes derivar el caso a la encargada de revisión para verificación.',
    },
    {
      id: 8,
      pregunta: '¿La plataforma me avisa si una licencia fue rechazada?',
      respuesta: 'Sí, recibirás una notificación indicando el estado actualizado del estudiante.',
    },
    {
      id: 9,
      pregunta: '¿Puedo subir yo una licencia médica por un estudiante?',
      respuesta: 'No, las licencias deben ser subidas únicamente por el estudiante.',
    },
    {
      id: 10,
      pregunta: '¿Las ausencias por licencia afectan el porcentaje de asistencia del estudiante?',
      respuesta: 'No, las inasistencias justificadas por licencia se consideran justificadas.',
    },
    {
      id: 11,
      pregunta: '¿Qué hago si no puedo visualizar el archivo de la licencia?',
      respuesta: 'Puedes intentar descargarlo nuevamente, si el problema persiste contacte a los desarrolladores.',
    },
    {
      id: 12,
      pregunta: '¿Puedo ver los días que justificó un estudiante por cada licencia?',
      respuesta: 'Sí, dentro del detalle de la licencia se muestra la cantidad de días justificados según las fechas ingresadas.',
    },
    {
      id: 13,
      pregunta: '¿Qué indica el color o estado que aparece junto al nombre del estudiante?',
      respuesta: 'El color refleja el estado de su licencia: pendiente, aprobada o rechazada, para facilitar la revisión rápida.',
    }
  ];

  return (
    <View style={styles.container}>
      {/* Flecha de volver atrás */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <ChevronLeft size={24} color="#007ACC" />
      </TouchableOpacity>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Preguntas Frecuentes
        </Text>
      </View>

      {/* Contenido */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
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
      <P_Menu navigation={navigation} />
    </View>
  );
}