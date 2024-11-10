import { Button } from "@/components/ui/button";
import loadingErrorImg from "../../assets/loading_error.png";

type QueryErrorProps = {
  message?: string;
  onRetry?: () => void;
};

export default function QueryError({
  message = "Oops! Something went wrong while loading the data.",
  onRetry,
}: QueryErrorProps = {}) {
  return (
    <div className="w-full flex justify-center items-center" style={{height:"calc(100vh - 90px)"}}>
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <div className="mb-6 relative w-72 h-48">
          <img
            src={loadingErrorImg}
            alt="Error illustration"
            style={{ objectFit: "contain" }}
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Data Loading Error
        </h2>
        <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} className="flex items-center space-x-2">
            <span>Try Again</span>
          </Button>
        )}
      </div>
    </div>
  );
}
