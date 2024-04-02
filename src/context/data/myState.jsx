import React, { useState,useEffect } from 'react'
import { myContext } from './myContext';
import Swal from 'sweetalert2';
import {  Timestamp, addDoc, collection, onSnapshot, orderBy, query,deleteDoc,doc ,setDoc} from 'firebase/firestore';
import { fireDB } from '../../Firebase/FirebaseConfig';
function myState(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = ()=>
  {
     if(mode==="light")
     {
        setMode('dark');
        document.body.style.backgroundColor = 'rgb(17, 24, 39)';
     }
     else
     {
        setMode('light');
        document.body.style.backgroundColor = 'white';
     }
  }

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
   title: null,
   price: null,
   imageUrl: null,
   category: null,
   description: null,
   time: Timestamp.now(),
   date: new Date().toLocaleString(
     "en-US",
     {
       month: "short",
       day: "2-digit",
       year: "numeric",
     }
   )
 })

 const addProduct = async ()=>
 {
      if(products.title==null||products.price==null||products.imageUrl==null||products.category==null||products.description==null)
      {
         return  Swal.fire("All field are required");
      }
      setLoading(true);
      try {
        const productRef = collection(fireDB,"products")
         await  addDoc(productRef,products);
         Swal.fire({
            title: "Add Product Sucessfully",
            icon: "success"
          });
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 800);
          getProductData();
          setLoading(false);
      } 
      catch (error) {
         setLoading(false);
      }
      setProducts("")
 }

 const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    
  }

  useEffect(() => {
    getProductData();
  }, []);

  //edit product
  const edithandle = (item) => {
    setProducts(item)
  }
  // update product
  const updateProduct = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      Swal.fire({
        title: "Product Updated successfully",
        icon: "success"
      });
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 800);
      getProductData();
      setLoading(false); 
    }
     catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const deleteProduct = async (item) => {
    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      Swal.fire({
        title: "Product Deleted successfully",
        icon: "success"
      });
      setLoading(false)
      getProductData()
    } catch (error) {
      
      setLoading(false)
    }
  }


  const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
      
      getUserData();
  }, []);
  
    const [searchkey, setSearchkey] = useState('')

  return (
    <myContext.Provider value={{mode,toggleMode,loading,setLoading, products, setProducts,addProduct ,product,updateProduct,edithandle,deleteProduct,user, searchkey, setSearchkey}}>
        {props.children}
    </myContext.Provider>
  )
}

export default myState