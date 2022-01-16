import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addActiveTrip } from "../reducers/ActiveTrip/ActiveTrip";
import Footer from "./Footer";
import NavBar from "./Navbar";

function ActiveTrip() {
    //   const dispatch = useDispatch();
    // const params = useParams();
    // let { slug } = useParams();
    // useEffect(() => {
    // let id = 56;
    // axios
    //   .get(`http://localhost:8080/trip/${id}`)
    //   .then(function (response) {
    //     // dispatch(addActiveTrip(response.data));
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
//   }, []);
  //   const state = useSelector((state) => {
  //     return {
  //       //   user: state.User.user,
  //       driverLocation: state.DriverLocation.DriverLocation,
  //       trips: state.Trips.trips,
  //     };
  //   });
  //   console.log(state.trips);
  return (
    <div>
      <NavBar />
      {/* <div>{state.trips}</div> */}
      {/* <h1>{params.id}</h1> */}
      <button>Click me</button>
      <Footer/>
    </div>
  );
}

export default ActiveTrip;
