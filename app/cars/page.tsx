"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import AddCarModal from "../../components/AddCarModal";
import axios from "axios";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
};

type SearchProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Cars({ searchParams }: SearchProps) {
  const [data, setData] = useState(null);
  const showAddCarModal = searchParams?.add_car_modal;

  useEffect(() => {
    axios.get("/api/cars").then((response) => {
      setData(response.data);
    });
  }, [showAddCarModal]);

  if (!data) {
    return <Spinner />;
  }

  return (
    <section>
      {showAddCarModal && <AddCarModal />}
      <div className="py-16">
        <Link
          href="/"
          className="fixed top-0 left-5 top-5 md:left-10 md:top-10 hover:-translate-y-1.5 transition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </Link>
        <div className="flex flex-row justify-center">
          <h1 className="text-lg md:text-2xl font-medium">
            Check out all the available cars
          </h1>
        </div>
      </div>

      <div className="mx-6 md:mx-24">
        {/* Add car button */}
        <div className="flex justify-left">
          <Link
            href="/cars?add_car_modal=true"
            type="button"
            className="py-1.5 px-4 md:py-2.5 md:px-5 text-sm md:text-lg font-medium text-gray-900 rounded-lg border-2 border-gray-200 bg-white hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            Add Car
          </Link>
        </div>

        {/* Table */}
        <div className="lg:mx-48 overflow-x-auto shadow-md sm:rounded-lg 2xl:mt-16 mt-10 mb-20">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Model
                </th>
                <th scope="col" className="px-6 py-3">
                  Year
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((car: Car) => (
                <tr key={car.id} className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {car.id}
                  </th>
                  <td className="px-6 py-4">{car.brand}</td>
                  <td className="px-6 py-4">{car.model}</td>
                  <td className="px-6 py-4">{car.year}</td>
                  <td className="flex items-center px-6 py-4">
                    <a href="#" className="font-medium text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 hover:text-blue-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </a>
                    <a href="#" className="font-medium text-red-500 ms-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 hover:text-red-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
