import { Loader2 } from "lucide-react";

interface LoadingMaskProps {
  isLoading: boolean;
  text?: string;
}

export default function LoadingMask({
  isLoading,
  text = "Loading...",
}: LoadingMaskProps) {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="flex flex-col items-center justify-center">
        <Loader2
          className="h-16 w-16 animate-spin text-primary"
          aria-hidden="true"
        />
        {text && (
          <p className="mt-4 text-lg font-medium text-foreground">{text}</p>
        )}
      </div>
    </div>
  );
}
