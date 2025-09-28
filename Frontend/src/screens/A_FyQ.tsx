import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function A_FyQ() {
    const [expanded, setExpanded] = useState<number | null>(null);
    const toggleExpand = (index: number) => {
        setExpanded(expanded === index ? null : index);
    };
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.banner}>
                <Text style={styles.title}>Preguntas{"\n"}Frecuentes</Text>
            </View>
            
            {/* Preguntas */}
            <View style={styles.faqSection}>
                {/* Pregunta 1 */}
                <TouchableOpacity style={styles.question} onPress={() => toggleExpand(1)}>
                    <Text style={styles.questionText}>¿Cómo subo mi licencia?</Text>
                    <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity>
                {expanded === 1 && (
                <View style={styles.answerBox}>
                    <Text style={styles.answerText}>
                    Respuesta.
                    </Text>
                </View>
                )}

                {/* Pregunta 2 */}
                <TouchableOpacity style={styles.question} onPress={() => toggleExpand(2)}>
                    <Text style={styles.questionText}>¿Quién puede ver mi licencia médica?</Text>
                    <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity>
                {expanded === 2 && (
                <View style={styles.answerBox}>
                    <Text style={styles.answerText}>
                        Tu licencia médica será revisada únicamente por la secretaria de carrera
                        y por los docentes de las asignaturas en las que solicites justificación,
                        garantizando confidencialidad y uso exclusivo para fines académicos.
                    </Text>
                </View>
                )}

                {/* Pregunta 3 */}
                <TouchableOpacity style={styles.question} onPress={() => toggleExpand(3)}>
                    <Text style={styles.questionText}>¿Hay un plazo máximo para subir la licencia?</Text>
                    <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity>
                {expanded === 3 && (
                <View style={styles.answerBox}>
                    <Text style={styles.answerText}>
                        Respuesta
                    </Text>
                </View>
                )}

                {/* Pregunta 4 */}
                <TouchableOpacity style={styles.question} onPress={() => toggleExpand(4)}>
                    <Text style={styles.questionText}>¿Qué significan los estados de mi solicitud?</Text>
                    <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity>
                {expanded === 4 && (
                <View style={styles.answerBox}>
                    <Text style={styles.answerText}>
                        Respuesta
                    </Text>
                </View>
                )}

                {/* Pregunta 5 */}
                <TouchableOpacity style={styles.question} onPress={() => toggleExpand(5)}>
                    <Text style={styles.questionText}>¿Qué hago si mi licencia fue rechazada?</Text>
                    <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity>
                {expanded === 5 && (
                <View style={styles.answerBox}>
                    <Text style={styles.answerText}>
                        Respuesta
                    </Text>
                </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    banner: {
        alignItems: "center",
        paddingVertical: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    faqSection: {
        padding: 16,
    },
    question: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#000",
    },
    questionText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
    },
    arrow: {
        fontSize: 18,
        color: "#000",
    },
    answerBox: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000",
        padding: 12,
        marginBottom: 10,
        borderRadius: 6,
    },
    answerText: {
        fontSize: 14,
        textAlign: "justify",
        color: "#000",
    },
});
