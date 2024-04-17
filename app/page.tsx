"use client";

import { useState, useEffect } from "react";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
};

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex justify-center items-center h-24 bg-gray-800 w-1/2 rounded-md">
          <div className="text-white text-xl">Cars dealership</div>
        </div>
      </div>
      <div className="px-20 py-4">
        {data.map((car: Car) => (
          <div
            key={car.id}
            className="text-center py-4 my-2 bg-gray-700 rounded"
          >
            <div className="text-white text-xl">
              {car.brand} {car.model} ({car.year})
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
