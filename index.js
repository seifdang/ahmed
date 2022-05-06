import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {HeroBg,Img} from "./ReuElem"
import humanrights from "../images/humanrights.jpg"
import { Button1 } from "../ButtonElements"


	
	
    const Signup = () => {

        const [firstName,setFirstName] = useState("");
        const [lastName,setLastName] = useState("");
        const [position,setPosition] = useState("");
        const [file,setFile] = useState(null);
    

       
        const [error, setError] = useState("");
        const navigate = useNavigate();
    
       
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(file)
           let data={firstName:firstName,
                lastName:file,
                position:position,
                
        }
            try {
                const url = "http://localhost:8080/api/reunions/reunion ";
                const { data: res } = await axios.post(url, data);
                // navigate("/reunion");
                console.log(res.message);
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message);
                }
            }
        };
    
        return (
            <>
            
            
            
            
            
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>
                   
                    <div className={styles.right}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1>اضف اجتماع</h1>
                            <input
                                type="text"
                                placeholder="عنوان الاجتماع"
                                name="firstName"
                                onChange={(x)=>setFirstName(x.target.value)}
                                value={firstName}
                                required
                                className={styles.input}
                            />
                           
                            <input
                                type="date"
                                placeholder="المصلحة"
                                name="المصلحة"
                                onChange={(x)=>setPosition(x.target.value)}
                                value={position}
                                required
                                className={styles.input}
                            />
                             <input
                                type="file"
                                placeholder="التقرير"
                                name="file"
                                onChange={(x)=>setFile(x.target.value)}
                                value={file}
                                required
                                className={styles.input}
                                
                            />
                           

                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button type="submit" className={styles.green_btn}>
						التسجيل
						</button>
                        </form>
                    </div>
                </div>
            </div>
            </>
        );
    };
    
    export default Signup;