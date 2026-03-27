import { Loader2, RotateCcw } from "lucide-react";

export interface ReloadProps {
  isLoading: boolean;
  onReload?: () => void;
  errorMessage?: string;
}

export function Reload ({
  isLoading,
  onReload,
  errorMessage,
}: ReloadProps){
  if (!isLoading && !errorMessage) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-md rounded-lg transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        {isLoading ? (
          <div className="bg-background/80 p-6 rounded-2xl shadow-xl border border-border/50 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
            <Loader2 size={48} className="text-primary animate-spin" />
          </div>
        ) : (
          <div className="bg-background/80 p-4 rounded-full shadow-lg border border-border/50 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={onReload}
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all text-primary hover:scale-110 active:scale-95"
              title={errorMessage || "Reload Data"}
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// export default Reload;
