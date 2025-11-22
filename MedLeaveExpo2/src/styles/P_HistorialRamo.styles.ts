import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: "#e6f1fb",
  },
  blackContainer: {
    backgroundColor: "#020617",
  },

  // HEADER
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

  // INFORMACIÓN DEL CURSO
  courseInfo: {
    backgroundColor: "#c9e0f7",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#a8c7e2",
  },
  courseInfoDark: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  courseTitleDark: {
    color: "#ffffff",
  },
  courseMeta: {
    fontSize: 13,
    color: "#555",
  },
  courseMetaDark: {
    color: "#cbd5e1",
  },

  // FILTROS
  filterBar: {
    backgroundColor: "#c9e0f7",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#a8c7e2",
  },
  filterBarDark: {
    backgroundColor: "#0f172a",
    borderColor: "#334155",
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#a8c7e2",
  },
  filterBtnActive: {
    backgroundColor: "#048ED4",
    borderColor: "#048ED4",
  },
  filterBtnDark: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
  },
  filterBtnText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  filterBtnTextActive: {
    color: "#ffffff",
  },

  // CONTENIDO
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  // TARJETAS DE LICENCIA
  licenciaCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  licenciaCardDark: {
    backgroundColor: "#1E293B",
  },
  licenciaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  studentName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  studentNameDark: {
    color: "#ffffff",
  },
  folio: {
    fontSize: 12,
    color: "#666",
  },
  folioDark: {
    color: "#cbd5e1",
  },
  estadoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#000",
  },

  licenciaBody: {
    marginBottom: 8,
  },
  fecha: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  fechaDark: {
    color: "#cbd5e1",
  },
  motivo: {
    fontSize: 12,
    color: "#555",
    lineHeight: 16,
  },
  motivoDark: {
    color: "#94a3b8",
  },

  licenciaFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  viewMoreText: {
    fontSize: 11,
    color: "#048ED4",
    fontWeight: "500",
  },

  // CONTENEDOR VACÍO
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    textAlign: "center",
    color: "#0B3178",
    fontSize: 14,
  },
  emptyTextDark: {
    color: "#94a3b8",
  },

  // MODAL
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    maxHeight: "85%",
  },
  modalContentDark: {
    backgroundColor: "#1E293B",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  modalTitleDark: {
    color: "#ffffff",
  },
  modalBody: {
    marginBottom: 16,
  },
  modalSection: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 6,
  },
  modalLabelDark: {
    color: "#94a3b8",
  },
  modalValue: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  modalValueDark: {
    color: "#ffffff",
  },
  estadoBadgeModal: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  estadoTextModal: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  modalCloseBtn: {
    backgroundColor: "#048ED4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  modalCloseBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
