import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F3FA',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#0096D6',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  hamburger: {
    color: '#ffffff',
    fontSize: 24,
    marginRight: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCEAF7',
    borderRadius: 16,
    marginBottom: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIconContainer: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: '#facc15',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#ffffff',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B3178',
  },
  cardText: {
    fontSize: 12,
    color: '#0B3178',
  },
  cardButton: {
    backgroundColor: '#0096D6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  cardButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
