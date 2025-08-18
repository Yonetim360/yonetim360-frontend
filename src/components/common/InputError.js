import { AlertCircle } from "lucide-react";

export default function InputError({ message }) {
  return (
    <div className="flex items-center mt-1 bg-red-50 border border-red-200 rounded px-2 py-1 text-red-600 text-xs">
      <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
      {message}
    </div>
  );
}
