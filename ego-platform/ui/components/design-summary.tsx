"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DesignSummaryProps {
  bagModel: string;
  materials: string[];
}

export default function DesignSummary({ bagModel, materials }: DesignSummaryProps) {
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      setIsLoading(true);
      setError(null);

      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/price?bagModel=${bagModel}&materials=${materials.join(",")}`);
        if (!response.ok) {
          throw new Error("Failed to fetch price: " + response.status);
        }
        const data = await response.json();
        setPrice(data.price);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPrice();
  }, [bagModel, materials]);

  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-2">Design Summary</h2>
        {isLoading && <p>Loading price...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {price !== null && (
          <>
            <p>Bag Model: {bagModel}</p>
            <p>Materials: {materials.join(", ")}</p>
            <p className="text-xl font-bold">Price: ${price.toFixed(2)}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}