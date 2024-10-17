// src/components/StockDetailsCard.tsx
import { StockDetailsCardProps } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { format } from "date-fns";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function StockDetailsCard({
  symbol,
  timestamp,
  data,
  onClose,
}: StockDetailsCardProps) {
  return (
    <div
    className={cn(
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    )}
  >
    <div className="relative w-full max-w-md mx-auto">
      <Card className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <CardHeader>
          <CardTitle>
            {symbol} - {format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Open: {parseFloat(data["1. open"]).toFixed(2)}</p>
          <p>High: {parseFloat(data["2. high"]).toFixed(2)}</p>
          <p>Low: {parseFloat(data["3. low"]).toFixed(2)}</p>
          <p>Close: {parseFloat(data["4. close"]).toFixed(2)}</p>
          <p>Volume: {data["5. volume"]}</p>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}
