import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  //Contenedor principal
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  blackContainer: {
    backgroundColor: "#020617",
  },

  //HEADER
  header: {
    backgroundColor: "#048ED4",
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  blackHeader: {
    backgroundColor: "#0f172a",
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 10,
    marginTop: 30,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
    marginTop: 30,
  },
  //Fondo que contiene las tarjetas
  tableContainer: {
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  //Contenido interno
  listContent: {
    flexGrow: 1,
    paddingBottom: 0,
    justifyContent: "center",
    paddingTop: 20,
    alignContent: "center",
  },

  //TARJETASsS
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  blackCard: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#003f66",
  },
  blackCardName: {
    color: "white",
  },
  cardLabel: {
    fontSize: 11,
    color: "#6b7280",
  },
  blackCardLabel: {
    color: "white",
  },
  cardDates: {
    fontSize: 13,
    color: "#003f66",
    marginBottom: 8,
  },
  blackCardDates: {
    color: "white",
  },
  cardFooterRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  pdfButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#048ED4",
  },
  blackPdfButton: {
    backgroundColor: "#0f172a",
  },
  pdfButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
    marginRight: 4,
  },
  pdfIcon: {
    fontSize: 14,
    color: "#ffffff",
  },
});
