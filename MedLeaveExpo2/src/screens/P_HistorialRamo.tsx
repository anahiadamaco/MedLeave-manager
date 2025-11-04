import { Menu, LogOut} from "lucide-react";
import Footer from "../components/Footer";
 
export default function P_HistorialRamo() { 
  return ( 
    <div className="min-h-screen flex flex-col bg-[#e6f1fb]"> 
      {/* Header */} 
      <header className="bg-[#1c75bc] text-white flex justify-between items-center px-4 py-3"> 
        <div className="flex items-center space-x-2"> 
          <Menu className="w-6 h-6" /> 
          <h1 className="font-semibold text-lg">MedLeave Manager</h1> 
        </div> 
        <div className="flex items-center space-x-2"> 
          <p className="text-sm">Cuenta: Juan Pérez</p> 
          <LogOut className="w-5 h-5 cursor-pointer" /> 
        </div> 
      </header> 
 
      <div className="relative bg-cover bg-center h-32 flex flex-col justify-center items-center text-white" 
           style={{ backgroundImage: "url('https://i.imgur.com/oG3aE1F.png')" }}> 
        <h2 className="text-2xl font-bold">Historial</h2> 
        <p className="text-lg font-semibold">INFO 1111</p> 
      </div> 
 
      <main className="flex-grow flex justify-center py-6"> 
        <div className="bg-[#cde2f8] w-[90%] max-w-md rounded-lg p-4 shadow-md"> 
          <table className="w-full text-sm text-gray-800"> 
            <thead className="border-b border-gray-400"> 
              <tr> 
                <th className="text-left py-1">Nombre alumno</th> 
                <th className="text-left py-1">Fecha inicio</th> 
                <th className="text-left py-1">Fecha fin</th> 
                <th className="text-center py-1">Pdf</th> 
              </tr> 
            </thead> 
            <tbody>
                {Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-300">
                    <td className="py-1 px-2">Juan Castro</td>
                    <td className="py-1 px-2">12-08-2025</td>
                    <td className="py-1 px-2">14-08-2025</td>
                    </tr>
                ))}
            </tbody>
          </table> 
        </div> 
      </main> 
 
      <Footer />
    </div> 
  ); 
}