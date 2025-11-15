import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#0369a1",
    alignItems: "center",
    paddingVertical: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  titleContainer: {
    marginTop: 48,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0369a1",
    textAlign: "center",
  },
  content: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 40,
    marginBottom: 100,
  },
  questionContainer: {
    marginBottom: 12,
  },
  questionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    flex: 1,
  },
  expandIcon: {
    fontSize: 18,
    color: "#facc15",
  },
  answerContainer: {
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  answerText: {
    fontSize: 14,
    color: "#000000",
    textAlign: "justify",
  },
  backButton: {
    position: "absolute",
    left: 8,
    top: 8,
    zIndex: 10,
  },
});