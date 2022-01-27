import React, {useState, useEffect} from 'react'
import './Login.css'
import { authenticate } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import axios from './axios'
import { useStateValue } from './stateProvider';
import User_info from './UserInfo';


function Login() {

    const [phone, setPhone] = useState();
    const [otp, setOTP] = useState("");
    const [response, setResponse] = useState([]);
    const navigate =useNavigate();
    const [{}, dispatch]= useStateValue();

    let generateRecaptch = ()=>{
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
          }, authenticate);
    }

    let sendOTP = (e)=>{
        e.preventDefault()
        generateRecaptch()
        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = "+251"+phone
        console.log(phoneNumber);
        signInWithPhoneNumber(authenticate, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // ...
          }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log(error)
          });
    }

   const verifyOTP = ()=>{
       if(otp.length==6){
           let confirmationResult = window.confirmationResult;
           confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            const uuid = user.uid;
            console.log('verfied')
            const userRedirect = async ()=>{
              console.log(uuid)
              await axios.get(`/get-data/${uuid}`)
              .then(res=> setResponse(res.data))
              console.log(response)
              if(response.length == 0){
                navigate("/users")
              }else {
                const uInfo = response.data.full_name
                dispatch({
                  type: "SET_USER_INFO",
                  user_info: uInfo,
                });
                navigate("/user-info")               
              }
            }
            userRedirect()
            
            // ...
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error)
          });
          
       }
   }


  //  const userRedirect = async ()=>{
  //    const response = await axios.get(`/get-data/${uuid}`)
  //    const uInfo = response.data
  //    console.log(uInfo)
  //  }

   verifyOTP()
    return (
        <div className="login">
          <h1>Welcome to Vintage Page</h1>
           <div className="login__form">
              <form>
                <h5>Phone number</h5>
                    <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />

                <button
                    type="submit"
                    onClick={sendOTP}
                    className="login__signInButton"
                    >
                        Sign In
                </button>    
                </form>


                <form>
                <h5>Enter OTP</h5>
                    <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    />
                </form>
                <div id="recaptcha-container"></div>
           </div>  
        </div>
    )
}


export default Login
