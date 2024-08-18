import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
const YourOrders = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const navigate = useNavigate()
useEffect(()=>{
  if(!localStorage.getItem("ecommerceUser")){
    navigate('/login')
  }
})
const localData = localStorage.getItem('ecommerceUser');
const userData = JSON.parse(localData)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/order/${userData.fname}/${userData._id}`);
        if (response.status === 200) {
          console.log("success 200 orders");
          const responseJson = await response.json();
          setFetchedData(responseJson);
        } else if (response.status === 400) {
          console.log("error 400 order");
        } else if (response.status === 500) {
          console.log("error 500 orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [userData.fname]);

  console.log(fetchedData, "fetched data");

  return (
    <>
      <div className="bg-light container mt-5 pb-5 rounded-4">
        <div className="row">
            <p className="fs-4 m-3 text-success">Your Order:</p>
          {fetchedData.map((item, index) => (
            
            <div className="col-md-6" key={index}>
              <div
                className="row m-1 d-flex justify-content-center align-items-center p-1"
                style={{
                    border: "1px solid black",
                    borderRadius: "10px",
                    height: "240px",
                }}
              >

                <div className="col-3">
                  <img
                    className="img-fluid mx-auto my-auto d-flex"
                    style={{ width: "100%", height: "45%" }}
                    alt=""
                    src={item.image}
                  />
                </div>
                <div className="col-9">

                  <p>
                    <span className="fw-bold">Name:</span> {item.title}
                  </p>
                  <p>{item.rate}</p>
                  <p>
                    <span className="fw-bold">Price:</span> {item.price}
                  </p>
                  <div className="d-flex flex-row justify-content-between">
                  <p className="text-success">Order Placed!!!!</p>
                  <p  className="text-end">{item.date}</p>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default YourOrders;
