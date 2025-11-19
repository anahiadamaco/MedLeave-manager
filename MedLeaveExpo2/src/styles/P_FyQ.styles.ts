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
  blackContent: {
    backgroundColor: "#020617",
  },
  questionContainer: {
    marginBottom: 10,
  },
  questionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#CEEDFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#048ED4",
    outlineWidth: 0,
    shadowColor: "transparent",
  },
  questionButtonDark: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#048ED4",
    flex: 1,
  },
  questionTextDark: {
    color: "#e5e7eb",
  },
  expandIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#048ED4",
    marginLeft: 10,
  },
  expandIconDark: {
    color: "#e5e7eb",
  },
  answerContainer: {
    backgroundColor: "#CEEDFFFF",
    borderLeftWidth: 4,
    borderColor: "#048ED4",
    padding: 14,
    marginTop: 6,
    borderRadius: 8,
  },
  answerContainerDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  answerText: {
    fontSize: 14,
    color: "#048ED4",
    textAlign: "justify",
  },
  answerTextDark: {
    color: "#e5e7eb",
  },
});
