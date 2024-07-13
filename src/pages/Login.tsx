import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useAuthStore } from "../hooks";

import styles from './Login.module.css';

const schema = z.object({
    email: z.string().min(3, "The email is required").email("Invalid email format"),
    password: z.string({required_error: "The password is required"})
});

type FormValues = z.infer<typeof schema>;

export function Login() {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = ({email, password}) => {
        login(email, password);
        navigate('/blog');
    };

    return (
        <div className={styles.formContainer}>
            <Card
                title="Login"
                subTitle="Input your email and password down below"
                className={styles.formInner}
                pt={{
                    body: {style: {width: '100%'}},
                    title: {style: {textAlign: 'center'}},
                    subTitle: {style: {textAlign: 'center'}},
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formSection}>
                        {errors.email && <span>{errors.email.message}</span>}
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-envelope"></InputIcon>
                            <InputText
                                {...register("email")}
                                placeholder="Email"
                            />
                        </IconField>
                    </div>
                    <div className={styles.formSection}>
                        {errors.password && <span>{errors.password.message}</span>}
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-key"></InputIcon>
                            <InputText
                                {...register("password")}
                                placeholder="Password"
                                type="password"
                            />
                        </IconField>
                    </div>
                    <div className={styles.formSection}>
                        <Button label="Login" type="submit" />
                    </div>
                </form>
                <Link to={"/auth/register"}>I don't have an account yet.</Link>
            </Card>
        </div>
    );
};
