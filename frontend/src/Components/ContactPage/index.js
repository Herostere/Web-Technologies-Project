import React, { useState } from "react";
import './ContactPage.css'
import axios from 'axios';


const ContactPage = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [message, setMessage] = useState("")
    const SendMessage = () => {
        console.log("test")
    }
    return (
        <div className="contactpage">
            <div className="contactus-container">
                <div className="firstinner-container">
                    <div className="firstnamelabel">
                        FIRST NAME 
                    </div>
                    <div className="lastnamelabel">
                        LAST NAME 
                    </div>
                </div>
                <div className="secondinner-container">
                    <input class="inputfield1" type="text" id="firstname" name="firstnamefield"  onChange={(e) => setFirstname(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>
                    <input class="inputfield2" type="text" id="lastname" name="lastnamefield"  onChange={(e) => setLastname(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>
                </div>
                <div className="label">
                        EMAIL
                </div>
                <input type="text" id="username" name="usernamefield"  onChange={(e) => setUsername(e.target.value)} requiredminlength="4" maxlength="15" size="17"/>

                <div className="label">
                        MESSAGE
                </div>
                <textarea class="messageinputfield" type="text" name="messagefield"  onChange={(e) => setMessage(e.target.value)} requiredminlength="0" maxlength="1000" size="1000"/>
                
                <button class='sendmessage' type='button' onClick={SendMessage}>
                    Send Message
                </button>
            </div>
        </div>
      );

};

export default  ContactPage;