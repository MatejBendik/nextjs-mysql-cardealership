"use client";

import { useState, useEffect } from "react";
import HomeCard from "../components/HomeCard";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
};

let links = [
  { title: "Cars", link: "/cars" },
  { title: "Employees", link: "/employees" },
  { title: "Services", link: "/services" },
  { title: "Travellers", link: "/travellers" },
];

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
    <main>
      <div className="flex flex-row justify-center py-16">
        <h1 className="text-3xl font-medium">
          Welcome to ultra car dealership
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-6 w-2/3 bg-blue-200 mx-auto p-8">
        {links.map((link) => (
          <HomeCard key={link.title} title={link.title} link={link.link} />
        ))}
      </div>
    </main>
  );
}
