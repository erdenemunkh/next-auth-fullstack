"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const userSchema = yup.object({
    email: yup
        .string()
        .email("Цахим шуудангийн хаягаа зөв бичнэ үү")
        .required("Цахим шуудангийн хаягаа оруулна уу"),
    password: yup.string().required("Нууц үгээ оруулна уу"),
});

export const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/UserPost";

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
            console.log(values);
            try {
                setLoading(true);
                const res = await signIn("credentials", {
                    redirect: false,
                    username: values.email,
                    password: values.password,
                    callbackUrl,
                });

                setLoading(false);

                // console.log(res);
                if (!res?.error) {
                    router.push(callbackUrl);
                } else {
                    setError("invalid email or password");
                }
            } catch (error) {
                setLoading(false);
            }
        },
        enableReinitialize: true,
    });

    return (
        <Box noValidate sx={{ mt: 1 }}>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? "loading..." : "Sign In"}
                    </Button>
                </form>
            </div>
            {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">
                    {error}
                </p>
            )}
        </Box>
    );
};
