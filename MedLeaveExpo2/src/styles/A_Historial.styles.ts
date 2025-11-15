import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9FAFB" 
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0369a1",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  topBarText: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#ffffff" 
  },
  accountText: { 
    fontSize: 12, 
    color: "#ffffff" 
  },
  backButton: { 
    paddingRight: 8 
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#1F2937" 
  },

  filterBar: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
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
  selectorText: { 
    color: "#111827" 
  },

  sortBtn: {
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
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
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalClose: { 
    alignSelf: "flex-end", 
    padding: 10 
  },
  modalCloseText: { 
    color: "#2563EB", 
    fontWeight: "700" 
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
  cursoInfo: { 
    flex: 1 
  },
  cursoNombre: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#1F2937", 
    marginBottom: 4 
  },
  cursoCodigo: { 
    fontSize: 14, 
    color: "#6B7280" 
  },
  emptyText: { 
    textAlign: "center", 
    color: "#6B7280", 
    marginTop: 16 
  },
});