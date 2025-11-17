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
  titleContainer: {
    marginTop: 48,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",

  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#048ED4",
    textAlign: "center",
  },
  content: {
    backgroundColor: "#ffffff",
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
});