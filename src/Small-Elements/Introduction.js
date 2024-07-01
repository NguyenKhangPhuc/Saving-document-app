import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Introduction() {

    return (
        <div className="introduction_layout">
            <div className="introduction_title">Website developed by Nguyen Khang Phuc</div>
            <div style={{ fontSize: '70%' }}>Email: nkpnkpnkp2005@gmail.com</div>
        </div>
    )
}
export default Introduction;