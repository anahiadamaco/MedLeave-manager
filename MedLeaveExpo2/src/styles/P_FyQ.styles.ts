import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF5FF',
  },
  backButton: {
    position: "absolute",
    left: 8,
    top: 8,
    zIndex: 10,
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#007ACC',
  },
  titleText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
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
    backgroundColor: '#C7E5FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 8,
  },
  questionText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#003366',
  },
  answerContainer: {
    backgroundColor: '#E5F2FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 4,
  },
  answerText: {
    color: '#333333',
    fontSize: 12,
  },
});