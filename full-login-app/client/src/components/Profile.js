import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from "../assests/profile.png"
import styles from "../styles/Username.module.css"
import { Toaster, toast } from "react-hot-toast"
import { useFormik } from "formik"
import { profileValidation } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import extend from "../styles/Profile.module.css"
import useFetch from '../hooks/fetch.hook'
import { useAuthStore } from '../store/store'
import { updateUser } from '../helper/helper'

export default function Profile() {

    const navigate = useNavigate()
    const [file, setFile] = useState()
    // const { username } = useAuthStore(state => state.auth)
    const [{ isLoading, apiData, serverError }] = useFetch()


    const formik = useFormik({
        initialValues : {
            firstName : apiData?.firstName ||  "",
            lastName : apiData?.lastName ||  "",
            email : apiData?.email ||  "",
            mobile : apiData?.mobile ||  "",
            address : apiData?.address ||  ""
        },
        enableReinitialize : true,
        validate : profileValidation,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async values => {
            values = await Object.assign(values, { profile : file || apiData?.profile || "" })
            let updatePromise = updateUser(values)

            toast.promise(updatePromise, {
                loading : "Updating Your Details",
                success : <b>Profile Updated Successfuly!!!</b>,
                error : <b>Could Not Update Profile</b>
            })

            // console.log(values)

        }
    })

    // formik does not support file upload
    const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
    }

    // logout user

    function userLogout() {
        localStorage.removeItem("token")
        navigate("/")
    }

    if (isLoading) {
    return <h1 className='text-2xl font-bold'>isLoading</h1>
    }
    if (serverError) {
        return <h1 className='text-xl text-red-500'>{ serverError.message }</h1>
    }

    return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={`${styles.glass} ${extend.glass}`} style={{width : "45%", paddingTop : "3em"}}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Profile</h4>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        You can update the details!
                    </span>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <label htmlFor='profile'>
                        <img className={`${styles.profile_img} ${extend.profile_img}`} src={apiData?.profile || file || avatar} alt='avatar' />
                        </label>

                        <input onChange={onUpload} type="file" id='profile' name='profile' />                        
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <div className='name flex w-3/4 gap-10'>
                          <input {...formik.getFieldProps("firstName")} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Firstname' />
                          <input {...formik.getFieldProps("lastName")} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Lastname' />
                        </div>
                        <div className='name flex w-3/4 gap-10'>
                          <input {...formik.getFieldProps("mobile")} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No' />
                          <input {...formik.getFieldProps("email")} className={`${styles.textbox} ${extend.textbox}`} type="email" placeholder='Email*' /> 
                        </div>
                        
                          <input {...formik.getFieldProps("address")} className={styles.textbox} type="text" placeholder='Address' />
                          <button className={styles.btn} type='submit'>Update!</button>
                        </div>

                        
                        
                    

                    <div className='text-center py-4'>
                        <span className='text-gray-500'>Come Back Later! <button className='text-red-500' to='/' onClick={userLogout}>Logout!</button></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}
