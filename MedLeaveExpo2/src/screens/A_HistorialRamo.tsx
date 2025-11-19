import * as React from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, Dimensions, Platform, ActivityIndicator, TextInput } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/A_HistorialRamo.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";
import { WebView } from "react-native-webview";

type HistorialItem = {
  id: string;
  nombre: string;
  fechaInicio: string; // formato YYYY-MM-DD
  fechaFin: string;    // formato YYYY-MM-DD
  pdfUrl?: string;
};

export default function A_HistorialRamo() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();

  const [historial, setHistorial] = React.useState<HistorialItem[]>([]);
  const [filteredHistorial, setFilteredHistorial] = React.useState<HistorialItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentPdf, setCurrentPdf] = React.useState<string | undefined>(undefined);
  const [searchText, setSearchText] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  // Simular carga de datos
  React.useEffect(() => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        const data: HistorialItem[] = [
          { id: "1", nombre: "Juan Castro", fechaInicio: "2025-08-12", fechaFin: "2025-08-14", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
          { id: "2", nombre: "Ana Pérez", fechaInicio: "2025-08-15", fechaFin: "2025-08-17", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
          { id: "3", nombre: "Carlos Gómez", fechaInicio: "2025-08-18", fechaFin: "2025-08-20", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
        ];
        setHistorial(data);
        setFilteredHistorial(data);
      } catch (err) {
        setError("Error al cargar el historial");
      } finally {
        setLoading(false);
      }
    }, 1500);
  }, []);

  // Filtrar historial
  React.useEffect(() => {
    let filtered = [...historial];

    // Filtro de búsqueda por nombre
    if (searchText.trim()) {
      const lower = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.nombre.toLowerCase().includes(lower)
      );
    }

    // Filtro por rango de fechas
    if (startDate) {
      filtered = filtered.filter((item) => new Date(item.fechaInicio) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter((item) => new Date(item.fechaFin) <= new Date(endDate));
    }

    setFilteredHistorial(filtered);
  }, [searchText, startDate, endDate, historial]);

  const handleOpenPdf = (item: HistorialItem) => {
    if (!item.pdfUrl) {
      alert("No hay PDF disponible para este registro.");
      return;
    }
    if (Platform.OS === "web") {
      window.open(item.pdfUrl, "_blank");
    } else {
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

      <View style={{ flex: 1, paddingHorizontal: 12, paddingTop: 20 }}>
        {/* Filtros */}
        

        {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />}
        {error && <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>{error}</Text>}
        {!loading && !error && filteredHistorial.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20 }}>No hay resultados</Text>
        )}
        {!loading && !error && filteredHistorial.length > 0 && (
          <FlatList
            data={filteredHistorial}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <A_Menu navigation={navigation} />

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
