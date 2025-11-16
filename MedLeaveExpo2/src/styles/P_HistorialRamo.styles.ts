import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f1fb",
  },
  header: {
    backgroundColor: "#048ED4",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
  titleContainer: {
    backgroundColor: "#1c75bc",
    paddingVertical: 28,
    alignItems: "center",
  },
  titleMain: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  titleSub: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    color: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 24,
  },
  tableContainer: {
    backgroundColor: "#cde2f8",
    borderRadius: 8,
    padding: 16,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: "#333",
  },
});