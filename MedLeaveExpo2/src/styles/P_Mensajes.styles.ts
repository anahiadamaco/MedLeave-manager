import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f1fb",
  },
  blackContainer: {
    backgroundColor: "#020617",
  },
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
    fontWeight: "700",
    marginTop: 30,
    flex: 1,
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    right: 16,
    marginTop: 30,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: "center",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },

  actionBar: {
    backgroundColor: "#c9e0f7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#a8c7e2",
  },
  actionBarDark: {
    backgroundColor: "#1E293B",
    borderBottomColor: "#334155",
  },
  markAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#048ED4",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  markAllBtnText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },

  content: {
    flex: 1,
    padding: 12,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: "#c9e0f7",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#048ED4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  blackCard: {
    backgroundColor: "#1E293B",
    borderLeftColor: "#334155",
  },
  cardNoLeido: {
    borderLeftColor: "#FF6B6B",
    backgroundColor: "#fff",
    opacity: 1,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titulo: {
    fontSize: 15,
    fontWeight: "700",
    color: "#048ED4",
    marginBottom: 4,
  },
  blackTitulo: {
    color: "#ffffff",
  },
  mensaje: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
  blackMensaje: {
    color: "#cbd5e1",
  },

  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF6B6B",
    marginLeft: 8,
  },

  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "#a8c7e2",
    paddingTop: 10,
  },

  fecha: {
    fontSize: 11,
    color: "#666",
    marginBottom: 8,
  },
  blackFecha: {
    color: "#94a3b8",
  },

  buttonGroup: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  actionBtnActive: {
    backgroundColor: "#e0f2fe",
    borderColor: "#048ED4",
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#666",
  },
  actionBtnTextActive: {
    color: "#048ED4",
  },

  deleteBtn: {
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
  },
  deleteBtnText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#FF6B6B",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  emptyTextDark: {
    color: "#cbd5e1",
  },
});
