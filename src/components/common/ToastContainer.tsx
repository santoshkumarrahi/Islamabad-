import React from 'react';
import { useCms } from '../../context/CmsContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCms();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 max-w-md pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border text-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
            toast.type === 'success'
              ? 'bg-[#133826] text-[#FAF8F5] border-[#2D6A4F]'
              : toast.type === 'error'
              ? 'bg-[#4A151B] text-[#FFF0F2] border-[#7F262F]'
              : 'bg-[#1E2922] text-[#F4F0E8] border-[#36493D]'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D4A373] shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#FF858D] shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#9EC5FE] shrink-0 mt-0.5" />}

          <div className="flex-1 font-medium leading-snug">{toast.message}</div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
