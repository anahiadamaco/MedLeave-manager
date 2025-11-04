import {Menu, LogOut} from "lucide-react";
import Footer from "../components/Footer";

export default function P_Historial() {
  return (
    <div className="min-h-screen flex flex-col bg-[#e6f1fb]">
      {/* Header */}
      <header className="bg-[#1c75bc] text-white flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-2">
          <Menu className="w-6 h-6" />
          <span className="font-semibold">MedLeave Manager</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Cuenta: Juan Pérez</span>
          <LogOut className="w-5 h-5" />
        </div>
      </header>

      {/* Fondo con título */}
      <div
        className="relative bg-cover bg-center h-32"
        style={{
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/d/d4/Licencia_medica_chile.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#1c75bc]/60 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            Historial
          </h1>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="flex-1 px-6 py-4 space-y-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-[#c9e0f7] p-4 rounded-lg shadow-md border border-[#a8c7e2]"
            >
              <h2 className="font-bold text-lg text-black">INFO 1111</h2>
              <p className="text-black font-semibold">Teoría de sistemas</p>
            </div>
          ))}
      </main>

      <Footer />
    </div>
  );
}