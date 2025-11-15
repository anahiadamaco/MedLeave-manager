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

export default function A_FyQ() {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState<number | null>(null);

  const preguntas = [
    {
      id: 1,
      pregunta: '¿Cómo subo mi licencia médica a la plataforma?',
      respuesta: 'Puedes subirla desde el apartado "Subir licencia", adjuntando el archivo y completando los datos solicitados.',
    },
    {
      id: 2,
      pregunta: '¿Qué documentos necesito para subir mi licencia?',
      respuesta: 'Debes adjuntar PDF legible de la licencia emitida por un médico.',
    },
    {
      id: 3,
      pregunta: '¿Cuántos días tengo para subir mi licencia desde que fui al médico?',
      respuesta: 'La licencia debe ser subida dentro de 48 horas desde la fecha de emisión.',
    },
    {
      id: 4,
      pregunta: '¿Puedo subir una foto tomada con el celular?',
      respuesta: 'No, debes transformar la foto a pdf para subirla.',
    },
    {
      id: 5,
      pregunta: '¿Qué hago si me equivoqué al subir la licencia?',
      respuesta: 'Puedes eliminar la solicitud desde tu "Historial" y volver a subirla, siempre que no haya sido revisada.',
    },
    {
      id: 6,
      pregunta: '¿Cuánto demora en aprobarse una licencia médica?',
      respuesta: 'El proceso puede tardar algunos días según la carga administrativa. Puedes revisar el estado en la sección "Historial".',
    },
    {
      id: 7,
      pregunta: '¿Cómo sé si mi licencia fue aprobada o rechazada?',
      respuesta: 'En el historial podrás ver el estado actualizado, además de recibir una notificación dentro de la app.',
    },
    {
      id: 8,
      pregunta: '¿Qué pasa si tengo evaluaciones durante mi periodo de licencia?',
      respuesta: 'Puedes solicitar al profesor la reprogramación de evaluaciones justificando con la licencia aprobada.',
    },
    {
      id: 9,
      pregunta: '¿La licencia médica afecta mi asistencia?',
      respuesta: 'Las ausencias justificadas por licencia se registran como justificadas y no afectan tu asistencia.',
    },
    {
      id: 10,
      pregunta: '¿Puedo reprogramar una prueba o trabajo si coincide con mi licencia?',
      respuesta: 'Sí, una vez aprobada la licencia, puedes solicitar la reposición de evaluaciones al profesor.',
    },
    {
      id: 11,
      pregunta: '¿Qué hago si mi licencia es rechazada?',
      respuesta: 'Lo ideal es ir a hablar de forma presencial con la secretaria de carrera.',
    },
    {
      id: 12,
      pregunta: '¿Qué pasa si subo la licencia fuera de plazo?',
      respuesta: 'Podría no ser aceptada por la universidad. Es recomendable subirla lo antes posible.',
    },
    {
      id: 13,
      pregunta: '¿Puedo subir licencias emitidas fuera del país?',
      respuesta: 'Sí, siempre que el documento sea oficial y esté en un formato legible.',
    },
    {
      id: 14,
      pregunta: '¿Quién puede ver mi licencia médica?',
      respuesta: 'Solo la encargada de revisión y, cuando corresponda, tus profesores para efectos académicos.',
    }
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
          Preguntas Frecuentes
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
