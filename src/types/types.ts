export type TimeSeriesData = {
  [timestamp: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
};

export type StockData = {
  "Meta Data": Record<string, string>;
  "Time Series (5min)": TimeSeriesData;
};

export type StockTable = {
  data: TimeSeriesData;
  symbol: string;
  onRowClick: (timestamp: string) => void;
}

export type StockDetailsCardProps = {
  symbol: string;
  timestamp: string;
  data: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
  onClose: () => void;
};