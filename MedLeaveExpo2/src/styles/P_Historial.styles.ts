import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#e6f1fb" 
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
  backButton: {
    position: "absolute",
    left: 16,
    marginTop: 30,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
  },
  blackHeader: {
    backgroundColor: "#0f172a",
  },
  filterBar: {
    backgroundColor: "#c9e0f7",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#a8c7e2",
  },
  blackFilterBar: {
    backgroundColor: "#020617",
    borderBottomColor: "#334155",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#a8c7e2",
    paddingHorizontal: 12,
    height: 40,
    color: "#000000",
  },
  blackInput: {
    backgroundColor: "#334155",
    borderColor: "#475569",
    color: "#F1F5F9",
  },
  selector: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#a8c7e2",
    padding: 10,
    marginTop: 8,
  },
  blackSelector: {
    backgroundColor: "#334155",
    borderColor: "#475569",
  },
  sortBtn: {
    marginTop: 8,
    backgroundColor: "#0096D6",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  blackSortBtn: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
    borderWidth: 1,
  },
  sortText: { 
    color: "#ffffff", 
    fontWeight: "bold" 
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalBox: {
    backgroundColor: "#fff",
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
    borderBottomColor: "#ddd",
  },
  modalClose: {
    alignSelf: "flex-end", 
    padding: 10 
  },
  modalCloseText: {
    color: "#1c75bc", 
    fontWeight: "bold" 
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 24, 
    paddingVertical: 16 
  },
  courseCard: {
    backgroundColor: "#c9e0f7",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#a8c7e2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  blackCourseCard: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
    borderWidth: 1,
  },
  courseInfo: { 
    flex: 1
  },
  courseName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    marginBottom: 4
  },
  courseNameDark: {
    color: "#ffffff",
  },
  courseCode: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000"
  },
  courseCodeDark: {
    color: "#e5e7eb",
  },
  emptyText: {
    textAlign: "center",
    color: "#0B3178",
    marginTop: 16
  },
  emptyTextDark: {
    color: "#94a3b8",
  },
});
