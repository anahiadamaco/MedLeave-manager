import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#e6f1fb" 
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
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  filterBar: {
    backgroundColor: "#c9e0f7",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#a8c7e2",
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
  selector: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#a8c7e2",
    padding: 10,
    marginTop: 8,
  },
  sortBtn: {
    marginTop: 8,
    backgroundColor: "#0096D6",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
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
  courseInfo: { 
    flex: 1
  },
  courseName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    marginBottom: 4
  },
  courseCode: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000"
  },
  emptyText: {
    textAlign: "center",
    color: "#0B3178",
    marginTop: 16
  },
});
