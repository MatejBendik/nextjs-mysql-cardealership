"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

const addCarSchema = z.object({
  brand: z.string().nonempty({ message: "Brand must be filled" }),
  model: z.string().nonempty({ message: "Model must be filled" }),
  year: z.coerce.number().int(),
});

type FormData = z.infer<typeof addCarSchema>;

const AddCarModal = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(addCarSchema),
  });

  async function onSubmit(data: FormData) {
    console.log(isSubmitting);
    console.log(data);

    try {
      const response = await axios
        .post("/api/cars", {
          brand: data.brand,
          model: data.model,
          year: data.year,
        })
        .then((response) => {
          console.log(response);
        });

      console.log(response);
    } catch (error) {
      console.error(error);
    }

    history.back();
  }

  return (
    <div className="fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)">
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg border">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">Add Car</h3>
            <Link
              href="/cars"
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
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Brand
                </label>
                <input
                  {...register("brand")}
                  type="text"
                  name="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.brand && (
                  <p className="text-red-600 text-sm">
                    {errors?.brand?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Model
                </label>
                <input
                  {...register("model")}
                  type="text"
                  name="model"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.model && (
                  <p className="text-red-600 text-sm">
                    {errors?.model?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Year
                </label>
                <input
                  {...register("year")}
                  type="number"
                  name="year"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors?.year && (
                  <p className="text-red-600 text-sm">
                    {errors?.year?.message}
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

export default AddCarModal;
