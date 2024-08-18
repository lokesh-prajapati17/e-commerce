import React, { useEffect, useState } from "react";
import bgimg from "./Assets/menscarousel.jpg";
import { NavLink } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { toast, ToastContainer } from "react-toastify";
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const MensProductCarousel = () => {
  const localData = localStorage.getItem("ecommerceUser");
  const userData = JSON.parse(localData);
  const [fetchedData, setFetchedData] = useState([]);
  const getApi = async () => {
    const response = await fetch("http://localhost:5000/api/menscarousel");
    if (response.status === 200) {
      console.log("success 200 mens carousel");
      const responseJson = await response.json();
      setFetchedData(responseJson);
    } else if (response.status === 400) {
      console.log("error 400 mens carousel");
    } else if (response.status === 500) {
      console.log("error 500 mens carousel");
    }
  };

  const images = fetchedData.map((item, index) => {
    return (
      <div key={index} className="card m-2">
        <img
          style={{ maxHeight: "60%", maxWidth: "60%" }}
          src={item.image}
          className="card-img-top d-flex mx-auto my-auto"
          alt="Fissure in Sandstone"
        />
        <div className="card-body">
          <p className="card-title d-inline" style={{}}>
            {item.title}
          </p>
          
          <div
            className="overflow-y-scroll"
            style={{ maxHeight: "8vh", width: "100%" }}
          >
            <p>{item.description}</p>
          </div>
          <p className="card-text text-danger " style={{ fontSize: "10px" }}>
              Item Left: {item.count}
            </p>
          <div className="d-flex justify-content-between">
          <p>Price: {item.price}</p>

          <button
            className="btn btn-dark rounded-0 text-warning"
            onClick={async (event) => {
              event.preventDefault();
              const requestData = {
                title: item.title,
                price: item.price,
                description: item.description,
                category: item.category,
                image: item.image,
                rate: item.price,
                count: item.count,
                userId: userData._id,
                user: userData.fname,
              };
              try {
                const response = await fetch("http://localhost:5000/api/Cart", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(requestData),
                });
                if (response.status == 201) {
                  console.log("201 created cart");
                  toast.success("Item Added To Cart");
                } else if (response.status == 200) {
                  toast.success("successfully added");
                } else if (response.status == 500) {
                  console.log("500");
                  toast("error added");
                } else if (response.status == 400) {
                  console.log("400");
                  toast("error added");
                }

                const responseData = await response.json();
                console.log("cart created:", responseData);
              } catch (error) {
                console.error("Error creating cart:", error.message);
              }
            }}
          >
            ADD TO CART
          </button>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <ToastContainer />
      <div
        className="container-fluid d-none d-lg-flex d-xxl-none justify-content-center  mt-4 float-end"
        style={{ width: "20vw", height: "10vh", backgroundColor: "skyblue" }}
      >
        <h3 className="text-white  my-auto">Mens Wear</h3>
      </div>
      <br />
      <br />

      <div className="container-fluid mt-5 ">
        <div className="row">
          <div className="col-lg-8 col-12 d-flex align-items-center">
            <AliceCarousel
              style={{ height: "50vh" }}
              responsive={responsive}
              controlsStrategy="responsive"
              autoPlay={true}
              autoPlayInterval={3000}
              infinite={true}
              disableDotsControls
              animationType="fadeout"
              mouseTracking
              items={images}
            />
          </div>
          <div className="col-lg-4 col-12">
            <div className="p-3">
              <div
                className="img-fluid img-fluid d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundImage: `url(${bgimg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "75vh",
                }}
              >
                <h2 className="text-white">Men's</h2>
                <p style={{ fontSize: "large" }}>
                  <NavLink
                    className="text-white text-decoration-none border-bottom"
                    to={"/categories/Mens"}
                  >
                    Discover More
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MensProductCarousel;
