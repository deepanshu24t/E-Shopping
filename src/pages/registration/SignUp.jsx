import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { myContext } from '../../context/data/myContext'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../Firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/Loader';
import Swal from 'sweetalert2'
import Layout from '../../components/Layout';

function Signup() {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const context = useContext(myContext);
   const {loading,setLoading}=context;
   const navigate = useNavigate();

   const signup = async () =>
   {
    setLoading(true);
   // console.log(name,email,password);
    if(name===''||email===''||password==='')
    {
        Swal.fire("All field are required");
    }
    try {
        const users =  await createUserWithEmailAndPassword(auth,email,password)
        //console.log(users);
        var user = {
            name:name,
            uid:users.user.uid,
            email :users.user.email,
            time:Timestamp.now()
        }

        const userRef = collection(fireDB,"users");
            await addDoc(userRef,user);
            Swal.fire({
                title: "Signup Succesful",
                icon: "success"
              });
              
            setName('')
            setEmail('')
            setPassword('')
            setLoading(false);
            navigate('/login');

            
        
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
   }


    return (
        <Layout>
        <div className=' flex justify-center items-center h-screen'>
            {loading &&<Loader></Loader>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        name='name' value={name} onChange={(e)=>setName(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input type="email"
                        name='email' value={email} onChange={(e)=>setEmail(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'/>
                </div>
                <div>
                    <input
                        type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link to='/login' className=' text-red-500 font-bold'>Login</Link></h2>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default Signup;