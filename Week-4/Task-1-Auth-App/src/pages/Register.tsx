import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../schemas/authSchemas";
import type { RegisterFormValues } from "../schemas/authSchemas";
import { supabase } from "../lib/supabaseClient";

export default function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    setSuccessMessage(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.fullName },
      },
    });

    setLoading(false);

    if (error) {
      setServerError(error.message);
      return;
    }

    setSuccessMessage("Account created! Check your email to confirm, then log in.");
    setTimeout(() => navigate("/login"), 2500);
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Create an account</h1>

        <label htmlFor="fullName">Full name</label>
        <input id="fullName" type="text" {...register("fullName")} />
        {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}

        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && <p className="field-error">{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} />
        {errors.password && <p className="field-error">{errors.password.message}</p>}

        <label htmlFor="confirmPassword">Confirm password</label>
        <input id="confirmPassword" type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p className="field-error">{errors.confirmPassword.message}</p>
        )}

        {serverError && <p className="banner banner-error">{serverError}</p>}
        {successMessage && <p className="banner banner-success">{successMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="switch-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}