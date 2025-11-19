import * as React from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, Dimensions, Platform, Linking } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/A_HistorialRamo.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";
import { WebView } from "react-native-webview";

type HistorialItem = {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  pdfUrl?: string;
};

export default function A_HistorialRamo() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentPdf, setCurrentPdf] = React.useState<string | undefined>(undefined);

  const historial: HistorialItem[] = [
    { id: "1", nombre: "Juan Castro", fechaInicio: "12-08-2025", fechaFin: "14-08-2025", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "2", nombre: "Ana Pérez", fechaInicio: "15-08-2025", fechaFin: "17-08-2025", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: "3", nombre: "Carlos Gómez", fechaInicio: "18-08-2025", fechaFin: "20-08-2025", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  ];

  const handleOpenPdf = (item: HistorialItem) => {
    if (!item.pdfUrl) {
      alert("No hay PDF disponible para este registro.");
      return;
    }

    if (Platform.OS === "web") {
      // En web abrimos el PDF en una nueva pestaña
      window.open(item.pdfUrl, "_blank");
    } else {
      // En móvil usamos modal con WebView
      setCurrentPdf(item.pdfUrl);
      setModalVisible(true);
    }
  };

  const renderItem = ({ item }: { item: HistorialItem }) => (
    <View style={[styles.card, isDark && styles.blackCard]}>
      <View style={styles.cardHeaderRow}>
        <Text style={[styles.cardName, isDark && styles.blackCardName]}>{item.nombre}</Text>
      </View>

      <Text style={[styles.cardLabel, isDark && styles.blackCardLabel]}>Período licencia</Text>
      <Text style={[styles.cardDates, isDark && styles.blackCardDates]}>
        {item.fechaInicio} - {item.fechaFin}
      </Text>

      <View style={styles.cardFooterRow}>
        <TouchableOpacity
          style={[styles.pdfButton, isDark && styles.blackPdfButton]}
          onPress={() => handleOpenPdf(item)}
        >
          <Text style={styles.pdfButtonText}>Ver PDF</Text>
          <Text style={styles.pdfIcon}>📄</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial por ramo</Text>
      </View>

      <FlatList
        data={historial}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 12, paddingTop: 20 }}
      />

      <A_Menu navigation={navigation} />

      {/* Modal solo para móvil */}
      {Platform.OS !== "web" && (
        <Modal visible={modalVisible} animationType="slide">
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: "#333" }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff" }}>Cerrar PDF</Text>
            </TouchableOpacity>

            {currentPdf && (
              <WebView
                source={{ uri: currentPdf }}
                style={{ flex: 1, width: Dimensions.get("window").width }}
              />
            )}
          </View>
        </Modal>
      )}
    </View>
  );
}
