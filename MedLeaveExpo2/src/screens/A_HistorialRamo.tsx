import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/A_HistorialRamo.styles";
import A_Menu from "../components/A_Menu";

type HistorialItem = {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  pdfUrl?: string;
};

export default function A_HistorialRamo() {
  const navigation = useNavigation<any>();

  const historial: HistorialItem[] = [
    { id: "1", nombre: "Juan Castro", fechaInicio: "12-08-2025", fechaFin: "14-08-2025" },
    { id: "2", nombre: "Juan Castro", fechaInicio: "12-08-2025", fechaFin: "14-08-2025" },
    { id: "3", nombre: "Juan Castro", fechaInicio: "12-08-2025", fechaFin: "14-08-2025" },
    { id: "4", nombre: "Juan Castro", fechaInicio: "12-08-2025", fechaFin: "14-08-2025" },
  ];

  const handleOpenPdf = (item: HistorialItem) => {
    console.log("Abrir PDF de", item.nombre);
  };

  const renderItem = ({ item }: { item: HistorialItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardName}>{item.nombre}</Text>
      </View>

      <Text style={styles.cardLabel}>Período licencia</Text>
      <Text style={styles.cardDates}>
        {item.fechaInicio} - {item.fechaFin}
      </Text>

      <View style={styles.cardFooterRow}>
        <TouchableOpacity
          style={styles.pdfButton}
          onPress={() => handleOpenPdf(item)}
        >
          <Text style={styles.pdfButtonText}>Ver PDF</Text>
          <Text style={styles.pdfIcon}>📄</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header fijo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial por ramo</Text>
      </View>


      <View style={{ flex: 1, paddingHorizontal: 12, paddingTop: 20 }}>
        <View style={styles.tableContainer}>
          <FlatList
            data={historial}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      {/* Menú fijo abajo */}
      <A_Menu navigation={navigation} />
    </View>
  );
}
