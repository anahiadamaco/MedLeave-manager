import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f0fa",
    padding: 16,
  },
  backButton: {
    position: "absolute",
    left: 8,
    top: 8,
    zIndex: 10,
  },
  title: {
    color: "#007ACC",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 32,
  },
  tableContainer: {
    backgroundColor: "#b5d9ef",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#007ACC",
    paddingBottom: 8,
  },
  headerCell: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#003f66",
    fontSize: 12,
  },
  headerCellLarge: {
    flex: 1.5,
  },
  headerCellMedium: {
    flex: 1,
  },
  headerCellSmall: {
    flex: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#aad4e6",
    paddingVertical: 8,
  },
  rowCell: {
    textAlign: "center",
    color: "#003f66",
    fontSize: 12,
  },
  rowCellLarge: {
    flex: 1.5,
  },
  rowCellMedium: {
    flex: 1,
  },
  rowCellSmall: {
    flex: 0.5,
  },
  scrollContent: {
    width: "100%",
  },
});