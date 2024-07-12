import { SubmitHandler, useForm } from "react-hook-form";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import styles from './Login.module.css';
import { Link } from "react-router-dom";

type FormValues = {
    email: string;
    password: string;
}

export function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => {
        console.log(data);
    };
    return (
        <div className={styles.formContainer}>
            <Card
                title="Login"
                subTitle="Input your email and password down bellow"
                className={styles.formInner}
                pt={{
                    body: {style: {width: '100%'}},
                    title: {style: {textAlign:'center'}},
                    subTitle: {style: {textAlign:'center'}},
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formSection}>
                        {errors.email && <span>{errors.email.message}</span> }
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-envelope"></InputIcon>
                            <InputText
                                {...register("email", {required: "The email is required"})}
                                placeholder="Email"
                            />
                        </IconField>
                    </div>
                    <div className={styles.formSection}>
                        {errors.password && <span>{errors.password.message}</span> }
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-key"></InputIcon>
                            <InputText
                                {...register("password", {required: "The password is required"})}
                                placeholder="Password"
                                type="password"
                            />
                        </IconField>
                    </div>
                    <div className={styles.formSection}>
                        <Button label="Login" type="submit" />
                    </div>
                </form>
                <Link to={"/register"}>I don't have an account yet.</Link>
            </Card>
        </div>
    );
};
