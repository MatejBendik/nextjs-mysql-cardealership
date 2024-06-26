"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Spinner from "../../components/Spinner";
import EditCustomerModal from "../../components/EditCustomerModal";
import AddCustomerModal from "../../components/AddCustomerModal";

type Customer = {
  CestujuciID: number;
  ZamestnanecID: string;
  Meno: string;
  Priezvisko: number;
  Kontakt: string;
  Platba: number;
};

type SearchProps = {
  searchParams: Record<string, string> | null | undefined;
};

const customerNameSchema = z.object({
  name: z.string(),
});

type FormData = z.infer<typeof customerNameSchema>;

export default function Cars({ searchParams }: SearchProps) {
  const [data, setData] = useState([]);
  const [searchBrand, setSearchBrand] = useState(searchParams?.brand || "");
  const showAddCustomerModal = searchParams?.add_customer_modal;
  const showEditCustomerModal = searchParams?.edit_customer_modal;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: searchBrand || "",
    },
    resolver: zodResolver(customerNameSchema),
  });

  useEffect(() => {
    axios.get("/api/customers").then((response) => {
      setData(response.data);
    });
  }, [showAddCustomerModal, showEditCustomerModal, searchBrand]);

  if (!data) {
    return <Spinner />;
  }

  console.log("isDirty", isDirty);

  async function onSubmit(data: FormData) {
    console.log(isSubmitting);
    console.log(data);

    // create new search params with the brand and push it to the URL
    const searchParams = new URLSearchParams();
    searchParams.append("Meno", data.name);
    window.history.pushState({}, "", `?${searchParams.toString()}`);
    setSearchBrand(data.name);

    try {
      const response = await axios.get(`/api/customers?Meno=${data.name}`);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("searchBrand", searchBrand);

  const deleteCar = async (id: number) => {
    try {
      const responseDelete = await axios.delete(`/api/customers/${id}`);
      console.log(responseDelete);
      const responseRefetch = await axios
        .get("/api/customers")
        .then((response) => {
          console.log(response);
          setData(response.data);
        });

      console.log(responseDelete);
      console.log(responseRefetch);

      toast.success("Customer deleted successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      {showAddCustomerModal && <AddCustomerModal />}
      {showEditCustomerModal && <EditCustomerModal />}
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
        <div className="flex flex-row justify-center items-center space-x-1">
          <h1 className="text-lg md:text-2xl font-medium">
            Check out all the customers
          </h1>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mx-6 md:mx-24">
        {/* Add car button */}
        <div className="flex flex-row justify-center items-center items-left space-x-10">
          <div>
            <Link
              href="/customers?add_customer_modal=true"
              type="button"
              className="py-1.5 px-4 md:py-2.5 md:px-5 text-sm md:text-lg font-medium text-gray-900 rounded-lg border-2 border-gray-200 bg-white hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              Add Customer
            </Link>
          </div>
          <div className="w-1/2 md:w-1/3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="md:w-4 md:h-4 w-3 h-3 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  {...register("name")}
                  className="block w-full p-2.5 md:p-2.5 ps-8 md:ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search customer name..."
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 end-0 text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-3 text-center"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg 2xl:mt-16 mt-10 mb-20">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Zamestnanec ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Meno
                </th>
                <th scope="col" className="px-6 py-3">
                  Priezvisko
                </th>
                <th scope="col" className="px-6 py-3">
                  Kontakt
                </th>
                <th scope="col" className="px-6 py-3">
                  Platba
                </th>
                <th scope="col" className="px-6 py-3">
                  Akcia
                </th>
              </tr>
            </thead>
            <tbody>
              {searchBrand
                ? data
                    .filter((customer: Customer) =>
                      customer.Meno.toLowerCase().includes(
                        searchBrand.toLowerCase()
                      )
                    )
                    .map((customer: Customer) => (
                      <tr
                        key={customer.CestujuciID}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {customer.CestujuciID}
                        </th>
                        <td className="px-6 py-4">{customer.ZamestnanecID}</td>
                        <td className="px-6 py-4">{customer.Meno}</td>
                        <td className="px-6 py-4">{customer.Priezvisko}</td>
                        <td className="px-6 py-4">{customer.Kontakt}</td>
                        <td className="px-6 py-4">{customer.Platba} €</td>
                        <td className="flex items-center px-6 py-4">
                          <Link
                            href={`/customers?customer_id=${customer.CestujuciID}&edit_customer_modal=true`}
                            className="font-medium text-blue-500"
                          >
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
                          </Link>
                          <button
                            onClick={() => deleteCar(customer.CestujuciID)}
                            className="font-medium text-red-500 ms-3"
                          >
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
                          </button>
                        </td>
                      </tr>
                    ))
                : data.map((customer: Customer) => (
                    <tr
                      key={customer.CestujuciID}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {customer.CestujuciID}
                      </th>
                      <td className="px-6 py-4">{customer.ZamestnanecID}</td>
                      <td className="px-6 py-4">{customer.Meno}</td>
                      <td className="px-6 py-4">{customer.Priezvisko}</td>
                      <td className="px-6 py-4">{customer.Kontakt}</td>
                      <td className="px-6 py-4">{customer.Platba} €</td>
                      <td className="flex items-center px-6 py-4">
                        <Link
                          href={`/customers?customer_id=${customer.CestujuciID}&edit_customer_modal=true`}
                          className="font-medium text-blue-500"
                        >
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
                        </Link>
                        <button
                          onClick={() => deleteCar(customer.CestujuciID)}
                          className="font-medium text-red-500 ms-3"
                        >
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
                        </button>
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
