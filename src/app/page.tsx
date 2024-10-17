"use client"
import { useState }from "react";
import { cn } from "../lib/utils";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { StockData } from "@/types/types";
import { ModeToggle } from "@/components/ModeToggle";
import React from "react";
import { StockTables } from "@/components/StockTable";
import { StockDetailsCard } from "@/components/StockDetailsCard";


export default function Home() {
  const [symbol, setSymbol] = useState("IBM");
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTimestamp, setSelectedTimestamp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = async () => {
    if (!symbol.trim()) {
      setError("Please enter a valid stock symbol.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/stock?symbol=${symbol}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data.", error);
      setError("Failed to fetch data. Please try again.");
    }
    setLoading(false);
  };
  
  const handleRowClick = (timestamp: string) => {
    setSelectedTimestamp(timestamp);
  };

  const handleCloseDetails = () => {
    setSelectedTimestamp(null);
  };
  
  return (
    <React.Fragment>
      <header className={cn("flex justify-between items-center mb-4")}>
      <h1 className={cn("text-3xl font-bold mb-4")}>{symbol} Stock Data</h1>
      <ModeToggle />
      </header>
    <div className={cn("p-6")}>
       <div className={cn("flex space-x-2 mb-4")}>
        <Input 
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol"
          />
        <Button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
        </Button>
      </div>
      {loading && <div className="text-center mt-20">Loading...</div>}
      {data && !loading && (
        <>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <StockTables
            data={data["Time Series (5min)"]}
            symbol={symbol}
            onRowClick={handleRowClick}
          />
          {selectedTimestamp && (
            <StockDetailsCard
              symbol={symbol}
              timestamp={selectedTimestamp}
              data={data["Time Series (5min)"][selectedTimestamp]}
              onClose={handleCloseDetails}
            />
          )}
        </>
      )}
    </div>
  </React.Fragment>
  );
}
