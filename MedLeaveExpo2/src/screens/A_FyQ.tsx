import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import A_Menu from "../components/A_Menu";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#0369a1",
    alignItems: "center",
    paddingVertical: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  questionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  questionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    flex: 1,
  },
  expandIcon: {
    fontSize: 18,
    color: "#facc15",
  },
  answerContainer: {
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  answerText: {
    fontSize: 14,
    color: "#000000",
    textAlign: "justify",
  },
});

export default function A_FyQ({ navigation }: any) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }} // espacio para no tapar el último elemento
      >
        {/* Título */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Preguntas{"\n"}Frecuentes
          </Text>
        </View>

        {/* Preguntas */}
        <View style={styles.questionsContainer}>
          {/* Pregunta 1 */}
          <TouchableOpacity
            style={styles.questionButton}
            onPress={() => toggleExpand(1)}
          >
            <Text style={styles.questionText}>¿Cómo subo mi licencia?</Text>
            <Text style={styles.expandIcon}>▼</Text>
          </TouchableOpacity>
          {expanded === 1 && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>Respuesta.</Text>
            </View>
          )}

          {/* Pregunta 2 */}
          <TouchableOpacity
            style={styles.questionButton}
            onPress={() => toggleExpand(2)}
          >
            <Text style={styles.questionText}>
              ¿Quién puede ver mi licencia médica?
            </Text>
            <Text style={styles.expandIcon}>▼</Text>
          </TouchableOpacity>
          {expanded === 2 && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>
                Tu licencia médica será revisada únicamente por la secretaria
                de carrera y por los docentes de las asignaturas en las que
                solicites justificación, garantizando confidencialidad y uso
                exclusivo para fines académicos.
              </Text>
            </View>
          )}

          {/* Pregunta 3 */}
          <TouchableOpacity
            style={styles.questionButton}
            onPress={() => toggleExpand(3)}
          >
            <Text style={styles.questionText}>
              ¿Hay un plazo máximo para subir la licencia?
            </Text>
            <Text style={styles.expandIcon}>▼</Text>
          </TouchableOpacity>
          {expanded === 3 && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>Respuesta</Text>
            </View>
          )}

          {/* Pregunta 4 */}
          <TouchableOpacity
            style={styles.questionButton}
            onPress={() => toggleExpand(4)}
          >
            <Text style={styles.questionText}>
              ¿Qué significan los estados de mi solicitud?
            </Text>
            <Text style={styles.expandIcon}>▼</Text>
          </TouchableOpacity>
          {expanded === 4 && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>Respuesta</Text>
            </View>
          )}

          {/* Pregunta 5 */}
          <TouchableOpacity
            style={styles.questionButton}
            onPress={() => toggleExpand(5)}
          >
            <Text style={styles.questionText}>
              ¿Qué hago si mi licencia fue rechazada?
            </Text>
            <Text style={styles.expandIcon}>▼</Text>
          </TouchableOpacity>
          {expanded === 5 && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>Respuesta</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 🔥 Menú fijo abajo, siempre visible */}
      <A_Menu navigation={navigation} />
    </View>
  );
}
