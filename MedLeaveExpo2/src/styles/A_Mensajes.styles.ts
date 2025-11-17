import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#048ED4",
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  content: {
    marginTop: 10,
    padding: 16,
    marginBottom: 100,
  },
  card: {
    backgroundColor: "#CEEDFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
  },
  cardNoLeido: {
    borderColor: "#048ED4",
  },
  cardLeido: {
    borderColor: "#9ac7dd",
    opacity: 0.7,
  },
  rightActions: {
    position: "absolute",
    top: 10,
    right: 10,
    pointerEvents: "box-none",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
  },
  smallButton: {
    backgroundColor: "#048ED4",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    minWidth: 70,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#D9534F",
  },
  smallButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#048ED4",
    marginBottom: 4,
  },
  mensaje: {
    fontSize: 14,
    color: "#048ED4",
    marginBottom: 8,
  },
  fecha: {
    marginTop: 6,
    fontSize: 12,
    color: "#3b82f6",
    textAlign: "right",
  },
});
