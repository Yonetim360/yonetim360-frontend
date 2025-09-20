import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

export default function ErrorModule({ error, setError }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        {error}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setError(null)}
          className="ml-2"
        >
          Kapat
        </Button>
      </AlertDescription>
    </Alert>
  );
}
