import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f1fb",
  },
  backButton: {
    position: "absolute",
    left: 8,
    top: 8,
    zIndex: 10,
  },
  header: {
    backgroundColor: "#1c75bc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 30,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 12,
    color: "#ffffff",
  },
  titleContainer: {
    backgroundColor: "#1c75bc",
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  titleMain: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  titleSub: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
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
    borderBottomColor: "#666666",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#333333",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bbbbbb",
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: "#333333",
  },
});