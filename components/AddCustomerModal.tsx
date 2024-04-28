"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";

const addCustomerSchema = z.object({
  ZamestnanecID: z.coerce.number().int(),
  meno: z.string().nonempty({ message: "Meno must be filled" }),
  priezvisko: z.string().nonempty({ message: "Priezvisko must be filled" }),
  kontakt: z.string().nonempty({ message: "Kontakt must be filled" }),
  platba: z.coerce.number().int(),
});

type FormData = z.infer<typeof addCustomerSchema>;

const AddCustomerModal = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(addCustomerSchema),
  });

  async function onSubmit(data: FormData) {
    console.log(isSubmitting);
    console.log("dataaaaaaa", data);

    try {
      const response = await axios
        .post("/api/customers", {
          ZamestnanecID: data.ZamestnanecID,
          meno: data.meno,
          priezvisko: data.priezvisko,
          kontakt: data.kontakt,
          platba: data.platba,
        })
        .then((response) => {
          console.log("responseeeee", response);
        });

      console.log(response);
    } catch (error) {
      console.error(error);
    }

    toast.success("Customer added successfully.");
    history.back();
  }

  return (
    <div className="fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)">
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg border">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              Add Customer
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
                  {...register("meno")}
                  type="text"
                  name="meno"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.meno && (
                  <p className="text-red-600 text-sm">
                    {errors?.meno?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Priezvisko
                </label>
                <input
                  {...register("priezvisko")}
                  type="text"
                  name="priezvisko"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.priezvisko && (
                  <p className="text-red-600 text-sm">
                    {errors?.priezvisko?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Kontakt
                </label>
                <input
                  {...register("kontakt")}
                  type="text"
                  name="kontakt"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.kontakt && (
                  <p className="text-red-600 text-sm">
                    {errors?.kontakt?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Platba
                </label>
                <input
                  {...register("platba")}
                  type="text"
                  name="platba"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.platba && (
                  <p className="text-red-600 text-sm">
                    {errors?.platba?.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
