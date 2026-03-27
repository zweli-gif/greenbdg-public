import { useLocation } from "wouter";

export default function NotFound() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-[#002117] mb-4" style={{fontFamily:"'Libre Baskerville',serif"}}>404</div>
        <p className="text-[14px] text-[#6BAF8A] mb-6" style={{fontFamily:"'Work Sans',sans-serif"}}>Page not found</p>
        <button onClick={() => navigate("/")} className="px-5 py-2.5 bg-[#064E3B] text-white text-[13px] font-medium rounded hover:bg-[#003527] transition-colors" style={{fontFamily:"'Work Sans',sans-serif"}}>
          Back to home
        </button>
      </div>
    </div>
  );
}
