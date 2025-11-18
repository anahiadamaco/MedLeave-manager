import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerDark: {
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
  headerDark: {
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
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },


  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#048ED4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  blackAvatarCircle: {
    backgroundColor: "#1e293b",
    borderColor: "#475569",
    borderWidth: 1,
  },
  

  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  userRole: {
    fontSize: 13,
    color: "#6b7280",
  },

  // Tarjetas
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#475569",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    color: "#0f172a",
  },

  row: {
    flexDirection: "row",
    marginBottom: 6,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  label: {
    width: 90,
    fontSize: 12,
    color: "#6b7280",
  },
  value: {
    flex: 1,
    fontSize: 13,
    color: "#0f172a",
  },

  infoText: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 10,
    marginBottom: 10,
  },

  webButton: {
    alignSelf: "flex-start",
    backgroundColor: "#048ED4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  webButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },

  // Textos para modo oscuro
  textDarkPrimary: {
    color: "#e5e7eb",
  },
  textDarkSecondary: {
    color: "#9ca3af",
  },
});
