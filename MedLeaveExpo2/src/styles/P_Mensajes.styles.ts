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
        fontSize: 22,
        fontWeight: "700",
        marginTop: 30,
    },
    content: {
        marginTop: 10,
        padding: 16,
        marginBottom: 100,
    },
    card: {
        backgroundColor: "#CEEDFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
    },
    blackCard: {
        backgroundColor: "#1e293b",
        
    },
    cardNoLeido: {
        borderColor: "#475569",
    },

    blackCardNoLeido: {
        borderColor: "#3b82f6",
    },

    cardLeido: {
        borderColor: "#9ac7dd",
        opacity: 0.7,
    },
    smallButton: {
        backgroundColor: "#048ED4",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        minWidth: 70,
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#D9534F",
    },
    smallButtonText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "600",
    },
    titulo: {
        fontSize: 16,
        fontWeight: "700",
        color: "#048ED4",
        marginBottom: 4,
    },
    blackTitulo: {
        color: "white",
    },
    mensaje: {
        fontSize: 14,
        color: "#048ED4",
        marginBottom: 8,
    },
    blackMensaje: {
        color: "white",
    },
    fecha: {
        marginTop: 6,
        fontSize: 12,
        color: "#3b82f6",
        textAlign: "right",
    },
    blackFecha: {
        color: "white",
    },
});
