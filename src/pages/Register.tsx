import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from 'primereact/card';
import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { useAuthStore, useUIStore } from '../hooks';

import styles from './Login.module.css';

const urlSchema = z.string().max(255, "The URL is too long, it must contain less than 256 characters").url("Invalid URL format");

const schema = z.object({
    name: z.string()
        .trim().toLowerCase()
        .min(3, "The name must have at least 3 letters")
        .max(64, "The name cannot have more than 64 letters"),
    email: z.string({ required_error: "The email is required" })
        .min(5, "This email seems to be too short for a real email")
        .email("Invalid email format"),
    password: z.string({ required_error: "The password is required" })
        .min(5, "The password is too short, it must have at least 5 characters")
        .max(64, "The password is too long, it must have no more than 64 characters"),
    picture: z.union([urlSchema, z.literal('')])
        .transform((value) => (value === "" ? undefined : value))
        .optional()
});

type FormValues = z.infer<typeof schema>;

export function Register() {
    const { register:registerAction } = useAuthStore();
    const { pushMessage, setMessages } = useUIStore();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const errorStrings: string[] = [];
    for (const [key,value] of Object.entries(errors)) {
            errorStrings.push(key + value.message);
        }

    const onSubmit: SubmitHandler<FormValues> = ({name, email, password, picture }) => {
        try {
            registerAction(name, email, password, picture);
            navigate("/blog");
        } catch (error) {
            if(error instanceof Error) pushMessage('error', error.message);
            return;
        }
    };

    useEffect(() => {
        const error: string[] = [];
        if(errors.name?.message) error.push(errors.name.message);
        if(errors.email?.message) error.push(errors.email.message);
        if(errors.password?.message) error.push(errors.password.message);
        if(errors.picture?.message) error.push(errors.picture.message);
        setMessages({error});
    }, [errors]);

    return (
        <div className={styles.formContainer}>
            <Card
                title="Register"
                subTitle="Make your new account!"
                className={styles.formInner}
                pt={{
                    body: {style: {width: '100%'}},
                    title: {style: {textAlign: 'center'}},
                    subTitle: {style: {textAlign: 'center'}},
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formSection}>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-user"></InputIcon>
                            <InputText
                                {...register("name")}
                                placeholder="Name"
                            />
                        </IconField>
                    </div>
                    <div className={styles.formSection}>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-envelope"></InputIcon>
                            <InputText
                                {...register("email")}
                                placeholder="Email"
                            />
                        </IconField>
                    </div>
                    <div className={styles.formSection}>
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
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-image"></InputIcon>
                            <InputText
                                {...register("picture")}
                                placeholder="Picture URL"
                            />
                        </IconField>
                    </div>
                    <div className={styles.formSection}>
                        <Button label="Register" type="submit" />
                    </div>
                </form>
                <Link to={"/auth/login"}>I already have an account.</Link>
            </Card>
        </div>
    )
};
