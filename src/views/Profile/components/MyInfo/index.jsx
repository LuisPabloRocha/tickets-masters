import { useForm } from "react-hook-form"; //dependencia 

import styles from './MyInfo.module.css';
import { useEffect } from "react";
const USER_DATA = 'userData'

const MyInfo = () => {
    const { handleSubmit, register, setValue, formState: { errors } } = useForm();

    useEffect(()=>{
        try{
            const userData = JSON.parse(localStorage.getItem(USER_DATA)) || {};
            setValue('name', userData?.name);
            setValue('email', userData?.email);
            setValue('age',userData?.age)
        }catch(error){
            console.error(error);

        }
    }, [setValue])

    const handleFormSubmit = (data) => {
        try {
            localStorage.setItem(USER_DATA, JSON.stringify(data));
            alert('Usuario actualizado');
        } catch (error) {
            alert('Ha ocurrido un error');
        }


    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
            <label className={styles.label}>
                Name
                <input {...register('name', { required: true, minLength: 1, maxLength: 120 })}
                    className={styles.input}  /*value={name} onChange={(evt) => setName(evt.target.value)} required*/></input>
            </label>
            <label className={styles.label}>
                Email
                <input {...register('email', { required: true, minLength: 5, maxLength: 120 })}
                    className={styles.input}  /*value={name} onChange={(evt) => setName(evt.target.value)} required*/></input>
            </label>
            <label className={styles.label}>
                Age
                <input {...register('age', { required: true, min: 1, max: 120, valueAsNumber: true })}
                    className={styles.input} type="number" /*value={name} onChange={(evt) => setName(evt.target.value)} required*/></input>
            </label>
            <button type="submit" className={styles.submitButton}>Save</button>


        </form>
    )

};

export default MyInfo;