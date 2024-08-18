import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
const Mobiles = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const localData = localStorage.getItem('ecommerceUser');
  const userData = JSON.parse(localData)
  const getMobilesApi = async () => {
    const response = await fetch("http://localhost:5000/api/mobile");
    if (response.status === 200) {
      console.log("success 200 mobiles");
      const responseJson = await response.json();
      setFetchedData(responseJson);
    } else if (response.status === 400) {
      console.log("error 400 mobiles");
    } else if (response.status === 500) {
      console.log("error 500 mobiles");
    }
  };
  useEffect(() => {
    getMobilesApi();
  }, []);

  const handleCardClick = (index) => {
    setSelectedItem(fetchedData[index]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      <div className="row">
        {fetchedData.map((item, index) => (
          <div
            key={item.id}
            className="col-lg-4 col-md-4 col-sm-12 col-xl-4 col-xxl-3 d-flex justify-content-center"
            style={{ height: "65vh" }}
          >
            <div
              className="card mt-4 border-0 rounded-0 shadow"
              style={{ width: "18rem" }}
            >
              <img
                src={item.thumbnail}
                className="card-img-top rounded-2 mx-auto"
                style={{ width: "70%", height: "40%" }}
                alt="..."
              />
              <div className="card-body m-0" style={{ marginBottom: "-1rem" }}>
                <div className="d-flex flex-row justify-content-between">
                  <h6 className="card-title">{item.title}</h6>
                  <p className="card-text" style={{ fontSize: "0.7rem" }}>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i> {item.rate}
                  </p>
                </div>
                <div className="d-flex flexDirection-row justify-content-between">
                  <p>{item.brand}</p>
                  <p style={{ fontSize: "0.8rem" }}>{item.category}</p>
                </div>
                <div style={{ height: "10vh", overflowY: "scroll" }}>
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="row align-items-center text-center g-0 mt-0">
                <div className="col-4">
                  <h5>${item.price}</h5>
                  <p
                    className="text-danger text-end me-1"
                    style={{
                      fontSize: "0.5rem",
                      marginBottom: 0,
                      fontWeight: "bold",
                    }}
                  >
                    Left: {item.count}
                  </p>
                </div>
                <div className="col-8">
                  <button
                    onClick={() => handleCardClick(index)}
                    className="btn btn-dark w-100 p-3 rounded-0 text-warning"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={isModalOpen} size="xl" onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem ? selectedItem.title : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "65vh" }}>
          <div className="row">
            {selectedItem && (
              <>
                <div className="col-lg-6 col-sm-12 col-md-6">
                  <img
                    src={selectedItem.thumbnail}
                    className="card-img-top rounded-2 mx-auto"
                    style={{ width: "65%", height: "50%" }}
                    alt="..."
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="me-5">
                    <p>{selectedItem.title}</p>
                    <div className="d-flex justify-content-between">
                      <p>{selectedItem.category}</p>

                      <p>{selectedItem.rate}</p>
                    </div>
                    <p>{selectedItem.description}</p>
                    <p className="text-danger d-flex align-items-end">
                      Items Left {selectedItem.count}
                    </p>
                    <p className="fs-5 fw-bold">${selectedItem.price}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{ width: "12rem" }}
            onClick={async (event) => {
              event.preventDefault();
              const requestData = {
                title: selectedItem.title,
                price: selectedItem.price,
                description: selectedItem.description,
                category: selectedItem.category,
                image: selectedItem.image,
                rate: selectedItem.rate,
                count: selectedItem.count,
                userId:userData._id,
                user:userData.fname
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
                  setIsModalOpen(false)
                  toast.success("item added to cart");
                } else if (response.status == 200) {
                  setIsModalOpen(false)
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
            className="btn btn-dark rounded-0"
          >
            <span className="text-warning">Add to Cart</span>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Mobiles;
