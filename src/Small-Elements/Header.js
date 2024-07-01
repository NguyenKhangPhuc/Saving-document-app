import { useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo1 from "../Imgs/Trường.png"
import logo2 from "../Imgs/Khoa-trắng.png"
import logo3 from "../Imgs/Hội.png"

function Header() {
    const navigate = useNavigate()
    return (
        <div className="provide_header">
            <div className="introduction_header">
                <div className="logo">
                    <div className="first_logo" style={{ backgroundImage: `url("${logo1}")` }}></div>
                    <div className="second_logo" style={{ backgroundImage: `url("${logo3}")` }}></div>
                    <div className="third_logo" style={{ backgroundImage: `url("${logo2}")` }}></div>
                </div>
                <div className="introduction_text">
                    <div>TRƯỜNG ĐẠI HỌC SƯ PHẠM THÀNH PHỐ HỒ CHÍ MINH</div>
                    <div>LIÊN CHI HỘI KHOA TIẾNG TRUNG</div>
                </div>
            </div>
            <div className="pages">
                <div className="add_page" onClick={()=> navigate('/home ')}>Thêm hoạt động</div>
                <div className="summary_page" onClick={()=> navigate('/saving-page')}>Tổng hợp</div>
            </div>
        </div>
    );
}
export default Header