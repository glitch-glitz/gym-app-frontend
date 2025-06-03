import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const validationSchema = z.object({
  full_name: z.string().nonempty({ message: "Member name is required" }),
  weight: z.string().nonempty({ message: "Weight is required" }),
  passport: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Passport is required",
  }),
  subscription_id: z.string().nonempty({ message: "Subscription is required" }),
});

export const AddMemberPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/subscription")
      .then((res) => res.json())
      .then((data) => setSubscriptions(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      full_name: "",
      weight: "",
      passport: "",
      subscription_id: "",
    },
  });
  console.log(errors);

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white rounded shadow-md"
    >
      <input
        type="text"
        placeholder="Full Name"
        {...register("full_name")}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Weight"
        {...register("weight")}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="file"
        accept="image/*"
        {...register("passport")}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* <input
        type="number"
        placeholder="Subscription"
        {...register("subscription_id")}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}
      <select
        {...register("subscription_id")}
        className="w-full p-3 mt-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="">Select a subscription</option>
        {subscriptions.map((subscription) => (
          <option key={subscription.id} value={subscription.id}>
            {subscription.plan_name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
      >
        Submit
      </button>
    </form>
  );
};


//post request to store values, set up toaster, 