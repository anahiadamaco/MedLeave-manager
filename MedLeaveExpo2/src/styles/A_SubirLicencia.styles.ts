import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  blackContainer: {
    backgroundColor: '#020617',
  },
  header: {
    backgroundColor: '#048ED4',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackHeader: {
    backgroundColor: '#0f172a',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
    marginTop: 30,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    marginTop: 30,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    textAlign: 'center',
    color: '#4A4A4A',
    marginBottom: 16,
  },
  blackDescription: {
    color: 'white',
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    color: '#333333',
    marginBottom: 4,
  },
  blackLabel: {
    color: 'white',
  },
  input: {
    backgroundColor: '#ADD8F1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  blackInput: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    color: 'white',
  },
  attachButton: {
    backgroundColor: '#C7E5FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  attachButtonDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  attachButtonText: {
    color: '#333333',
    fontWeight: '500',
  },
  attachButtonTextDark: {
    color: 'white',
  },
  attachIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#007ACC',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonDark: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  submitButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
