
'use client';
import { useEffect,useState } from "react";

export default function ProfilePage() {

    const [imageUrl, setImageUrl] = useState(null);
    const [content, setContent] = useState(null);



   useEffect(() => {
    fetch('/api/portfolio')
    .then((res) => res.json())
    .then(data => {
      setImageUrl(data.url);
      setContent(data.txt);
    })

    .catch(err => console.error('Error fetching data:', err)); 
    }, []);
 

    if (!content || !imageUrl) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
    }

     const [nameLine, emailLine] = content.split('\n');
     const name = nameLine?.replace('Name: ', '') || '';
     const email = emailLine?.replace('Email: ', '') || '';

    return (
        
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px'}}>
            <h1>User info</h1>
            <br/>
            <h1>Name: {name}</h1>
            <h2>Email: {email}</h2>
          <img src={imageUrl} width={150} height={150}style={{borderRadius: '50%',objectFit: 'cover', padding:"10px", marginTop: '10px'}}/>
        </div>
    );
}