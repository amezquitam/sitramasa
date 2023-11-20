import { useState, FormEvent, ChangeEvent } from "react";


export function useForm<T>(initialState?: T) {
    const [data, setData] = useState<T | undefined>(initialState);

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = target;
        setData({ ...data, [name]: value } as T);
    }

    const handleSubmit = (customHandler: (o: T) => void) => {
        return (ev: FormEvent<HTMLFormElement>) => {
            ev.preventDefault()
            customHandler(data as T)
        }
    }

    return {data, handleChange, handleSubmit};
}

