// src/components/StockTable.tsx

import { StockTable } from "@/types/types";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StockTables({ data, symbol, onRowClick }: StockTable) {
  const timestamps = Object.keys(data).slice(0, 20); // Display the latest 20 entries

  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Open</TableHead>
            <TableHead>High</TableHead>
            <TableHead>Low</TableHead>
            <TableHead>Close</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timestamps.map((timestamp) => {
            const entry = data[timestamp];
            return (
              <TableRow
                key={timestamp}
                className="cursor-pointer"
                onClick={() => onRowClick(timestamp)}
              >
                <TableCell>
                  {format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss")}
                </TableCell>
                <TableCell>{parseFloat(entry["1. open"]).toFixed(2)}</TableCell>
                <TableCell>{parseFloat(entry["2. high"]).toFixed(2)}</TableCell>
                <TableCell>{parseFloat(entry["3. low"]).toFixed(2)}</TableCell>
                <TableCell>{parseFloat(entry["4. close"]).toFixed(2)}</TableCell>
                <TableCell>{entry["5. volume"]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}