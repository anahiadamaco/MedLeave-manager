import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#ffffff",
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
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
    marginTop: 30,
    color: "#ffffff",
  },
  filterBar: {
    backgroundColor: "#CEEDFFFF",
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
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    color: "#048ED4",
  },
  blackInput: {
    backgroundColor: "#334155",
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
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  blackSelector: {
    backgroundColor: "#334155",
  },
  selectorText: { 
    color: "#048ED4" 
  },
  sortBtn: {
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#CEEDFFFF",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#048ED4",
  },
  blackSortBtn: {
    backgroundColor: "#1E293B",
  },
  sortText: { 
    fontWeight: "700",
    color: "#048ED4"
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
    borderWidth: 1,
  },
  blackModalBox: {
    backgroundColor: "#1E293B",
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  blackModalItem: {},
  modalClose: { 
    alignSelf: "flex-end", 
    padding: 10 
  },
  modalCloseText: { 
    fontWeight: "700",
    color: "#048ED4"
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
    backgroundColor: "#CEEDFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  blackCursoCard: {
    backgroundColor: "#1E293B",
  },
  cursoInfo: { 
    flex: 1 
  },
  cursoNombre: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#048ED4", 
    marginBottom: 4 
  },
  cursoCodigo: { 
    fontSize: 14, 
    color: "#048ED4"
  },
  emptyText: { 
    textAlign: "center", 
    marginTop: 16,
    color: "#048ED4"
  },
});