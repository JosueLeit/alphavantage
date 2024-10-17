// src/components/StockCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

type StockCardProps = {
  symbol: string;
  timestamp: string;
  data: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
};

export function StockCard({ symbol, timestamp, data }: StockCardProps) {
  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>{`${symbol} - ${timestamp}`}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Open: {data["1. open"]}</p>
        <p>High: {data["2. high"]}</p>
        <p>Low: {data["3. low"]}</p>
        <p>Close: {data["4. close"]}</p>
        <p>Volume: {data["5. volume"]}</p>
      </CardContent>
    </Card>
  );
}
