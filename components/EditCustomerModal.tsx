"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditCustomerSchema = z.object({
  ZamestnanecID: z.coerce.number().int(),
  Meno: z.string().nonempty({ message: "Meno must be filled" }),
  Priezvisko: z.string().nonempty({ message: "Priezvisko must be filled" }),
  Kontakt: z.string().nonempty({ message: "Kontakt must be filled" }),
  Platba: z.coerce.number().int(),
});

type FormData = z.infer<typeof EditCustomerSchema>;

const EditCustomerModal = () => {
  const [customerData, setCustomerData] = useState(null);
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customer_id");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(EditCustomerSchema),
  });

  useEffect(() => {
    if (customerId) {
      axios.get(`/api/customers/${customerId}`).then((response) => {
        console.log("Response:", response.data);
        setCustomerData(response.data);
      });
    }
  }, [customerId]);

  useEffect(() => {
    setValue("ZamestnanecID", customerData?.[0].ZamestnanecID);
    setValue("Meno", customerData?.[0].Meno);
    setValue("Priezvisko", customerData?.[0].Priezvisko);
    setValue("Kontakt", customerData?.[0].Kontakt);
    setValue("Platba", customerData?.[0].Platba);
  }, [customerData]);

  async function onSubmit(data: FormData) {
    console.log(isSubmitting);
    console.log("more data", data);

    try {
      const response = await axios
        .put(`/api/customers/${customerId}`, {
          ZamestnanecID: data.ZamestnanecID,
          Meno: data.Meno,
          Priezvisko: data.Priezvisko,
          Kontakt: data.Kontakt,
          Platba: data.Platba,
        })
        .then((response) => {
          console.log(response);
        });

      console.log(response);
    } catch (error) {
      console.error(error);
    }

    toast.success("Customer edited successfully.");
    history.back();
  }

  return (
    <div className="fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)">
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg border">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              Edit Customer
            </h3>
            <Link
              href="/customers"
              className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition duration-300 ease-in-out"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </Link>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-10 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Zamestnanec ID
                </label>
                <input
                  {...register("ZamestnanecID")}
                  type="number"
                  name="ZamestnanecID"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.ZamestnanecID && (
                  <p className="text-red-600 text-sm">
                    {errors?.ZamestnanecID?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Meno
                </label>
                <input
                  {...register("Meno")}
                  type="text"
                  name="Meno"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.Meno && (
                  <p className="text-red-600 text-sm">
                    {errors?.Meno?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Priezvisko
                </label>
                <input
                  {...register("Priezvisko")}
                  type="text"
                  name="Priezvisko"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.Priezvisko && (
                  <p className="text-red-600 text-sm">
                    {errors?.Priezvisko?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Kontakt
                </label>
                <input
                  {...register("Kontakt")}
                  type="text"
                  name="Kontakt"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.Kontakt && (
                  <p className="text-red-600 text-sm">
                    {errors?.Kontakt?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Platba
                </label>
                <input
                  {...register("Platba")}
                  type="text"
                  name="Platba"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.Platba && (
                  <p className="text-red-600 text-sm">
                    {errors?.Platba?.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerModal;
