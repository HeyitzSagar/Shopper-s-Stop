import React, { useState, useEffect } from "react";
import MyContext from "./myContext";
import { toast } from "react-toastify";
import {
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const myState = (props) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.backgroundColor = "white";
    }
  };

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  
  const addProduct = async () => {
    debugger
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("Please fill all fields");
    } else {
      const productRef = collection(fireDB, "products");
      setLoading(true);
      try {
        await addDoc(productRef, products);
        toast.success("Product Add successfully");
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1000);
        getProductData();
        // closeModal();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setProducts("");
    }
  };

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
    getOrderData();
  }, []);

  // update  product function

  const edithandle = (item) => {
    setProducts(item);
  }

  const updateProduct = async() => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated Successfully !!");
      getProductData();
      setTimeout(() => {
        window.location.href ='/dashboard'
      }, 1000);
      setLoading(false)
      
    } catch (error) {
      setLoading(false);
      toast.error("Something wrong !!");
      console.log(error);
    }
    setProducts("")
  }
  //  delete product function

  const deleteProduct = async(item) => {
    setLoading(true)
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
      
    } catch (error) {
      console.log(error);
      toast.error("Product Deleted Failed");
      setLoading(false);
    }
  }

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        updateProduct,
        deleteProduct,
        order
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default myState;
