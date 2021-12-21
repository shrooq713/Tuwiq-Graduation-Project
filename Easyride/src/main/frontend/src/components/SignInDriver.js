// import axios from "axios";
// import { useNavigate } from "react-router";
// import jwt_decode from "jwt-decode";
// import { useState } from "react";

// function SignInDriver() {
//   const navigate = useNavigate();
//   const signInClicked = () => {
//     const data = {
//       userName,
//       password,
//     };

//     axios
//       .post("http://localhost:8080/login", data)
//       .then((res) => {
//         console.log("Data::");
//         console.log(res.data);
//         const token = res.data.access_token;
//         const decode = jwt_decode(token);
//         console.log(decode);
//       })
//       .catch((err) => {
//         console.log("Error::");
//         console.log(err);
//       });
//     // navigate("/driver");
//   };
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <div className="align container h-100">
//       <div className="">
//         <div className="user_card">
//           <div className="brand_logo_container">
//             <img
//               src="https://cdn-icons.flaticon.com/png/512/1916/premium/1916788.png?token=exp=1639550670~hmac=09861a67572e4df4a26dceca0d51538c"
//               className="brand_logo"
//               alt="Logo"
//             />
//           </div>
//           <div className="form">
//             <form>
//               <h1 className="SignHeader">Sign In</h1>
//               <div className="flexForm">
//                 <div>
//                   <label>Driver Name: </label>
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     className="input-group-text"
//                     placeholder="driver name"
//                     required
//                     onChange={(e) => {
//                       setUserName(e.target.value);
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <label>Password: </label>
//                 </div>
//                 <div>
//                   <input
//                     type="password"
//                     className="input-group-text"
//                     placeholder="password"
//                     required
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                     }}
//                   />
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="flexForm">
//             <div className="login_container">
//               <button
//                 type="button"
//                 name="button"
//                 className="login_btn gap"
//                 onClick={signInClicked}
//               >
//                 Sign In
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignInDriver;
