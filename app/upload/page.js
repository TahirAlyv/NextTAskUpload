'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function UploadPage() {

    const [fileUrl, setFileUrl] = useState(null);
    const router = useRouter();

    const handleUpload = async (e) => {

    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const input = e.target.elements.file;
    const file = input.files[0];

    const formData=new FormData();

    formData.append('file', file);
    formData.append('name', name);
    formData.append('email', email);


    const res = await fetch('/api/portfolio',{
        method:'POST',
        body: formData,    
    });
     const data=await res.json();
     setFileUrl(data.path);


     if(res.ok){
        const pastDate = new Date(Date.now() - 10000).toUTCString();
        document.cookie = `access=; path=/; expires=${pastDate}`;
        router.push('/welcome');
        localStorage.setItem("uploadedUser", JSON.stringify({
            name,
            email,
            path: data.path
        }));
    } 
    
}
    return(

        <div style={{ textAlign: 'center', marginTop: '50px', }}>
            <h2>Fill out the form below.</h2>
            <form style={{display:'flex', flexDirection:'column', alignItems: 'center',}} onSubmit={handleUpload}>
                <input type='text' name='name' placeholder='Enter Name...' style={{width: '200px',padding: '5px',marginTop: '10px'} }/> 
                <input type='text' name='email' placeholder='Enter Email...' style={{width: '200px',padding: '5px',marginTop: '10px'}}/> 
                <input type='file' name='file' accept='image/*' required style={{padding: '10px', marginLeft: '100px'}} />
                <button style={{width: '200px', background: 'green'}} type='submit'>submit</button> 
            </form>

        </div>
    )

    
    
 
}