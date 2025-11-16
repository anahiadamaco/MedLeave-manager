import * as React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/A_HistorialRamo.styles";
import A_Menu from "../components/A_Menu";

export default function A_HistorialRamo() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Historial por ramo
        </Text>
      </View>

      {/* Título subtítulo */}
      <Text style={styles.title}>
        Historial
      </Text>

      {/* Contenedor de tabla */}
      <View style={styles.tableContainer}>
        {/* Encabezado */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.headerCellLarge]}>
            Nombre alumno
          </Text>
          <Text style={[styles.headerCell, styles.headerCellMedium]}>
            Fecha inicio
          </Text>
          <Text style={[styles.headerCell, styles.headerCellMedium]}>
            Fecha fin
          </Text>
          <Text style={[styles.headerCell, styles.headerCellSmall]}>
            PDF
          </Text>
        </View>

        {/* Filas */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={styles.scrollContent}
        >
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <View
                key={i}
                style={styles.tableRow}
              >
                <Text style={[styles.rowCell, styles.rowCellLarge]}>
                  Juan Castro
                </Text>
                <Text style={[styles.rowCell, styles.rowCellMedium]}>
                  12-08-2025
                </Text>
                <Text style={[styles.rowCell, styles.rowCellMedium]}>
                  14-08-2025
                </Text>
                <Text style={[styles.rowCell, styles.rowCellSmall]}>
                  📄
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>

      {/* Menú fijo abajo */}
      <A_Menu navigation={navigation} />
    </View>
  );
}