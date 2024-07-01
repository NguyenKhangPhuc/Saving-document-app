import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import logo1 from "../Imgs/Trường.png"
import logo3 from "../Imgs/Khoa-xanh.png"
import logo2 from "../Imgs/Hội.png"
import Introduction from "../Small-Elements/Introduction";
import { url } from "./ProvidePage";
import { Container } from "../App";
function SignIn() {
    const navigate = useNavigate()
    let { id, setId } = useContext(Container)
    let { list, setList } = useContext(Container)
    let [signInEmail, setSignInEmail] = useState('')
    let [signInPassword, setSignInPassword] = useState('')
    const signIn = async (e) => {

        if (!signInEmail || !signInPassword) {
            alert("please fill in the blanks")
        } else {
            await axios.post(url + '/sign-in', { signInEmail, signInPassword })
                .then(result => {
                    console.log(result.data)
                    if (result.data.mssg == 'success') {
                        id = result?.data.user._id
                        setId(id)
                        console.log(id)
                        navigate('/home')
                    } else if (result.data == 'Wpw') {
                        alert('Wrong password')
                    } else {
                        alert('Not existed user')
                    }

                })
                .catch(err => console.log(err))

        }
    }
    return (
        <div className="sign_in_layout">
            <div className="sign_in_details_place">
                <div className="sign_in_img"></div>
                <div className="sign_in_place">
                    <div className="sign_in_logo">
                        <div className="logo1" style={{ backgroundImage: `url("${logo1}")` }}></div>
                        <div className="logo2" style={{ backgroundImage: `url("${logo2}")` }}></div>
                        <div className="logo3" style={{ backgroundImage: `url("${logo3}")` }}></div>
                    </div>
                    <div className="Web_title">
                        <div>TRƯỜNG ĐẠI HỌC SƯ PHẠM THÀNH PHỐ HỒ CHÍ MINH</div>
                        <div>LIÊN CHI HỘI KHOA TIẾNG TRUNG</div>
                        <div style={{ fontSize: '170%', fontWeight: 'bold' }}>TRANG BÁO CÁO HOẠT ĐỘNG</div>
                    </div>
                    <div className="sign_in_position">
                        <div className="sign_in_title">ĐĂNG NHẬP</div>
                        <input className="email_input" placeholder="Tên đăng nhập" type="text" onChange={(e) => setSignInEmail(e.target.value)}></input>
                        <input className="password_input" placeholder="Mật khẩu" type="password" onChange={(e) => setSignInPassword(e.target.value)} />
                        <div className="change_password" onClick={() => navigate('/change-password')}>Quên mật khẩu ?</div>
                        <button class='sign_in_button' onKeyDown={(e) => { if (e.key == "Enter") { signIn() } }} onClick={(e) => signIn(e)} >
                            <span>Đăng nhập</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default SignIn