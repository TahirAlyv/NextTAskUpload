'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = ((e)=> {
     e.preventDefault();
    document.cookie = "access=true; path=/";
    router.push('/upload');

  })  


  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <button style={{width: '75px',  padding: '10px', background: 'green', marginTop: '20px'}} type="submit">Login</button>
      </form>
    </div>
  );
}
