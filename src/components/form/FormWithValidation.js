import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup.string("the type is string").required("your own message"),
    age: yup.number().positive().integer().required(),
    email: yup.string().email().required(),
    // password: yup.string().min(8).max(15).required(),
    password: yup
      .string()
      .required()
      .matches(
        /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  })
  .required();

export default function FormWithValidation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <h1>FormWithValidation </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label> FirstName</label>
        <input {...register("firstName")} />
        <p>{errors.firstName?.message}</p>

        <label> Age</label>
        <input {...register("age")} />
        <p>{errors.age?.message}</p>

        <label> Email</label>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>

        <label> Password</label>
        <input {...register("password")} />
        <p>{errors.password?.message}</p>

        <input type="submit" />
      </form>
    </div>
  );
}
