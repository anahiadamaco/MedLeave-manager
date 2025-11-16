import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#048ED4",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 10,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  title: {
    color: "#048ED4",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 20,
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