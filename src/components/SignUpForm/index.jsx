import { useState } from "react"; //Hook, basicamente es un getter y un setter
import { useForm } from "react-hook-form"; //dependencia 


const SignUpForm = () => {
    const { register, handleSubmit, reset, formState: {errors} } = useForm();

    /*const [name, setName] = useState(' ');
    const [age, setAge] = useState(' ');
    const [address, setAddress] = useState(' ');
    const [zip, setZip] = useState(' ');
    const [phone, setPhone] = useState(' ');*/

    const handleClearClick = () => {
        reset();
        /*setName(' ');
        setAge(' ');
        setAddress(' ');
        setZip( ' ');
        setPhone(' ');*/
    };
    const handleSubmitForm = (data) => {
        /*evt.preventDefault();
        console.log('submit: ', {
            name,
            age,
            zip,
            address,
            phone
        });*/
        console.log(data);
    };
    console.log(errors);
    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <label>
                Name
                <input {...register('name', {required:true})} /*value={name} onChange={(evt) => setName(evt.target.value)} required*/></input>
            </label>
            <br></br>
            <label>
                Age
                <input {...register('age', {required:true})} ></input>
            </label>
            <br></br>
            <label>
                Address
                <input {...register('address', {required:true})} ></input>
            </label>
            <br></br>
            <label>
                Zip Code
                <input {...register('zip', {required:true})} ></input>
            </label>
            <br></br>
            <label>
                Phone Number
                <input {...register('phone', {required:true})} ></input>
            </label>
            <br></br>
            <button type='button' onClick={handleClearClick}>Clear</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default SignUpForm;