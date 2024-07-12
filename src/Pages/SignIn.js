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
    let [data, setData] = useState(null)
    const navigate = useNavigate()
    let { id, setId } = useContext(Container)
    let { list, setList } = useContext(Container)
    let [signInEmail, setSignInEmail] = useState('')
    let [signInPassword, setSignInPassword] = useState('')
    useEffect(() => {
        axios.get(url)
            .then(res => {
                data = res.data
                setData(data)
               
            })
            .catch(err => console.log(err))
    }, [])
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
            {data ? <div className="sign_in_details_place">
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
                        <div className="email_input_place">
                            <input className="email_input" placeholder="Tên đăng nhập" type="text" onChange={(e) => setSignInEmail(e.target.value)}></input>
                        </div>
                        <div className="password_input_place">
                            <input className="password_input" placeholder="Mật khẩu" type="password" onChange={(e) => setSignInPassword(e.target.value)} />
                        </div>
                        <div className="change_password" onClick={() => navigate('/change-password')}>Quên mật khẩu ?</div>
                        <button class='sign_in_button' onKeyDown={(e) => { if (e.key == "Enter") { signIn() } }} onClick={(e) => signIn(e)} >
                            <span>Đăng nhập</span>
                        </button>
                    </div>
                </div>
            </div>
                :

                <div class="loader">
                    <p class="text">
                        <span class="letter letter1">L</span>
                        <span class="letter letter2">o</span>
                        <span class="letter letter3">a</span>
                        <span class="letter letter4">d</span>
                        <span class="letter letter5">i</span>
                        <span class="letter letter6">n</span>
                        <span class="letter letter7">g</span>
                        <span class="letter letter8">.</span>
                        <span class="letter letter9">.</span>
                        <span class="letter letter10">.</span>
                    </p>
                </div>}
        </div>
    )
}
export default SignIn