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
  userBox: {
    backgroundColor: "#CEEDFF",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  userBoxDark: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
    borderWidth: 1,
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
    color: "#048ED4",
  },
  blackUserName:{
    color: "white",
  },
  userRole: {
    fontSize: 13,
    color: "#048ED4",
  },
  blackUserRole: {
    color: "white",
  },
  centerDataBox: {
    backgroundColor: "#CEEDFF",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  centerDataText: {
    color: "#048ED4",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
  blackCenterDataText: {
    color: "white",
  },
  colorCard: {
    backgroundColor: "#CEEDFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  darkBox: {
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#475569",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    color: "#048ED4",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    color: "#048ED4",
  },
  textDarkPrimary: {
    color: "#e5e7eb",
  },
  textDarkSecondary: {
    color: "#9ca3af",
  },
});