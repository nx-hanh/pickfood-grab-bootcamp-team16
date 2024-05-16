import SignInForm from '@/components/form/SignInForm';

const page = () => {
  return (
    <div className='w-full items-center'>
      <SignInForm />
    </div>
  );
};

export default page;

// 'use client'
// import SignInForm from '@/components/form/SignInForm';
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// // import { useSession, signIn } from 'next-auth/client'

// // const LoginPage = () => {
// //   const router = useRouter()
// //   // const [session, loading] = useSession()
// //   const [username, setUsername] = useState('')
// //   const [password, setPassword] = useState('')

// //   const handleSubmit = async (event) => {
// //     event.preventDefault()
// //     // signIn('credentials', { username, password, redirect: false })
// //   }

// //   // if (session) {
// //   //   router.push('/dashboard')
// //   //   return null
// //   // }

// const page = () => {
//   // const router = useRouter()
//   // // const [session, loading] = useSession()
//   // const [username, setUsername] = useState('')
//   // const [password, setPassword] = useState('')

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault()
//   //   // signIn('credentials', { username, password, redirect: false })
//   // }

//   return (
//     <div className=''>
//       {/* <SignInForm /> */}
//       <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </label>
//       <br />
//       <button type="submit">Login</button>
//     </form>
//     </div>
//   );
// };

// export default page;