import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [show, setShow] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const localData = localStorage.getItem("ecommerceUser");
  const userData = JSON.parse(localData);
  const logout = () => {
    localStorage.clear("ecommerceUser");
    navigate("/login");
  };
  const getOrdersApi = async () => {
    const response = await fetch(
      `http://localhost:5000/api/finalorders/${userData.fname}/${userData._id}`
    );
    console.log(response)
    if (response.status == 200) {
      console.log("success 200 all user orders");
      const responseJson = await response.json();
      console.log(responseJson);
      setUserOrders(responseJson);
    } else if (response.status == 400) {
      console.log("error 400 get all user orders");
    } else if (response.status == 500) {
      console.log("error 500 get all user orders");
    }
  };
  console.log(userOrders);
  useEffect(() => {
    getOrdersApi();
  }, [userData.fname]);
  return (
    <>
      <div className={styles["modal-right"]}>
        <Modal
          dialogClassName="modal-dialog"
          centered={false}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton><button className="btn btn-outline-danger" onClick={logout}>
              Logout
            </button></Modal.Header>
          <Modal.Body>
            <p>
              Name: {userData?.fname} {userData?.lname}
            </p>
            <p>Phone No.: {userData?.number}</p>
            <p>
              Address: {userData?.address},{userData?.pincode},
              {userData?.location}
            </p>
            <div className="row justify-content-center">
              <p className="fw-bold">Previous Orders:</p>
              {userOrders.map((order, index) => (
                <div key={index} className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Order {index + 1}</h5>
                  </div>
                  <div className="modal-body">
                    {order.itemName.map((itemName, i) => (
                      <div key={i} className="d-flex justify-content-between">
                        <p>{itemName}</p>
                        <p>{order.price[i]}</p>
                      </div>
                    ))}
                  </div>
                  <div className="modal-footer">
                    <p>Total: {order.total}</p>
                  </div>
                </div>
              ))}
            </div>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{
              navigate('/updateprofile')
              setShow(false)
              }} variant="success">Update</Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
