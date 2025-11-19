import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";
import { LICENCIA_ROUTES } from "../config/api";
import { styles } from "../styles/A_SubirLicencia.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";

// NOTIFICACIONES LOCALES (puedes reemplazarlo con Context o Redux)
type Notificacion = {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
};

type FormState = {
  nombres: string;
  apellidos: string;
  fechaEmision: string;
  inicioLicencia: string;
  terminoLicencia: string;
  cursosJustificar: string;
  seccion: string;
};

export default function A_SubirLicencia({ navigation }: any) {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState<FormState>({
    nombres: "",
    apellidos: "",
    fechaEmision: "",
    inicioLicencia: "",
    terminoLicencia: "",
    cursosJustificar: "",
    seccion: "",
  });

  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<any>(null);
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      if ((result as any).type === "cancel" || (result as any).canceled === true) return;

      let file: any = null;
      if ((result as any).uri) {
        file = {
          uri: (result as any).uri,
          name: (result as any).name || "licencia.pdf",
          type: (result as any).mimeType || "application/pdf",
        };
      } else if ((result as any).assets && (result as any).assets.length > 0) {
        const a = (result as any).assets[0];
        file = {
          uri: a.uri,
          name: a.name || "licencia.pdf",
          type: a.mimeType || "application/pdf",
        };
      }

      if (!file) {
        Alert.alert("Error", "No se pudo obtener el archivo seleccionado.");
        return;
      }

      setPdfFile(file);
      Alert.alert("Archivo seleccionado", file.name);
    } catch (e) {
      console.error("Error al seleccionar PDF:", e);
      Alert.alert("Error", "No se pudo seleccionar el archivo PDF.");
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.nombres ||
      !formData.apellidos ||
      !formData.fechaEmision ||
      !formData.inicioLicencia ||
      !formData.terminoLicencia ||
      !formData.cursosJustificar ||
      !formData.seccion
    ) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (!pdfFile) {
      Alert.alert("Error", "Debes adjuntar el PDF de la licencia.");
      return;
    }

    setLoading(true);

    try {
      const sendData = new FormData();
      Object.entries(formData).forEach(([key, value]) => sendData.append(key, value));
      sendData.append("pdf", {
        uri: pdfFile.uri,
        name: pdfFile.name.endsWith(".pdf") ? pdfFile.name : pdfFile.name + ".pdf",
        type: pdfFile.type || "application/pdf",
      } as any);

      const response = await fetch(LICENCIA_ROUTES.CREATE, {
        method: "POST",
        body: sendData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.log("Error backend:", data);
        Alert.alert("Error", data.message || "No se pudo enviar la licencia");

        // Notificación de fallo
        setNotificaciones((prev) => [
          ...prev,
          {
            id: new Date().getTime().toString(),
            titulo: "Error al enviar licencia",
            mensaje: `Licencia de ${formData.nombres} ${formData.apellidos} no enviada.`,
            fecha: new Date().toLocaleDateString(),
            leido: false,
          },
        ]);
        return;
      }

      Alert.alert("Éxito", data.message || "Licencia enviada correctamente");

      // Notificación de éxito
      setNotificaciones((prev) => [
        ...prev,
        {
          id: new Date().getTime().toString(),
          titulo: "Licencia enviada",
          mensaje: `Licencia de ${formData.nombres} ${formData.apellidos} enviada correctamente.`,
          fecha: new Date().toLocaleDateString(),
          leido: false,
        },
      ]);

      // Reset
      setFormData({
        nombres: "",
        apellidos: "",
        fechaEmision: "",
        inicioLicencia: "",
        terminoLicencia: "",
        cursosJustificar: "",
        seccion: "",
      });
      setPdfFile(null);
    } catch (error) {
      console.error("Error al enviar licencia:", error);
      Alert.alert("Error", "Hubo un problema al enviar la licencia.");

      setNotificaciones((prev) => [
        ...prev,
        {
          id: new Date().getTime().toString(),
          titulo: "Error al enviar licencia",
          mensaje: `Licencia de ${formData.nombres} ${formData.apellidos} no enviada por error del sistema.`,
          fecha: new Date().toLocaleDateString(),
          leido: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subir licencia médica</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, isDark && styles.blackDescription]}>
          En esta sección podrás ingresar tu licencia médica y adjuntar el PDF para su verificación.
        </Text>

        {[
          ["Nombres", "nombres"],
          ["Apellidos", "apellidos"],
          ["Fecha de emisión (YYYY-MM-DD)", "fechaEmision"],
          ["Inicio licencia (YYYY-MM-DD)", "inicioLicencia"],
          ["Término licencia (YYYY-MM-DD)", "terminoLicencia"],
          ["Cursos a justificar", "cursosJustificar"],
          ["Sección", "seccion"],
        ].map(([label, field]) => (
          <View key={field as string} style={styles.fieldContainer}>
            <Text style={[styles.label, isDark && styles.blackLabel]}>{label}:</Text>
            <TextInput
              style={[styles.input, isDark && styles.blackInput]}
              value={(formData as any)[field as string]}
              onChangeText={(value) => handleInputChange(field as keyof FormState, value)}
              editable={!loading}
            />
          </View>
        ))}

        <TouchableOpacity
          style={[styles.attachButton, isDark && styles.attachButtonDark]}
          onPress={handlePickPDF}
          disabled={loading}
        >
          <Text style={[styles.attachButtonText, isDark && styles.attachButtonTextDark]}>
            {pdfFile ? `PDF seleccionado: ${pdfFile.name}` : "Adjuntar licencia médica (PDF)"}
          </Text>
          <Text style={styles.attachIcon}>📎</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, isDark && styles.submitButtonDark]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.submitButtonText}>Enviar</Text>}
        </TouchableOpacity>
      </ScrollView>

      <A_Menu navigation={navigation} />
    </View>
  );
}
