import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#ffffff" 
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
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
    marginTop: 30,
  },
  filterBar: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  blackFilterBar: {
    backgroundColor: "#020617",
    borderBottomColor: "#334155",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    color: "#111827",
  },
  blackInput: {
    backgroundColor: "#334155",
    borderColor: "#475569",
    color: "#F1F5F9",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  selector: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  blackSelector: {
    backgroundColor: "#334155",
    borderColor: "#475569",
  },
  selectorText: { 
    color: "#111827" 
  },
  blackSelectorText: { 
    color: "#F1F5F9" 
  },
  sortBtn: {
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  blackSortBtn: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
    borderWidth: 1,
  },
  sortText: { 
    color: "#FFFFFF", 
    fontWeight: "700" 
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
  },
  blackModalBox: {
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  blackModalItem: {
    borderBottomColor: "#475569",
  },
  modalClose: { 
    alignSelf: "flex-end", 
    padding: 10 
  },
  modalCloseText: { 
    color: "#2563EB", 
    fontWeight: "700" 
  },
  blackModalCloseText: {
    color: "white",
  },
  content: { 
    flex: 1, 
    paddingVertical: 16, 
    paddingHorizontal: 16 
  },
  centerContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 40 
  },
  cursosList: { 
    gap: 12 
  },
  cursoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#cde2f6",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  blackCursoCard: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
    borderWidth: 1,
  },
  cursoInfo: { 
    flex: 1 
  },
  cursoNombre: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#1F2937", 
    marginBottom: 4 
  },
  cursoNombreDark: { 
    color: "white", 
  },
  cursoCodigo: { 
    fontSize: 14, 
    color: "#6B7280" 
  },
  blackCursoCodigo: { 
    color: "white"
  },
  emptyText: { 
    textAlign: "center", 
    color: "#6B7280", 
    marginTop: 16 
  },
});
