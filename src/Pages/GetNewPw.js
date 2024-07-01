import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { url } from './ProvidePage'
function GetNewPw() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [code, setCode] = useState(0)
    const [newPw, setNewPw] = useState('')
    const [showCode, setShowCode] = useState(false)
    const [checkCode, setCheckCode] = useState(false)
    const [showPw, setShowPw] = useState(false)
    const [disable, setDisable] = useState(false)

    const Submitting = async () => {
        if (!email) {
            alert('Please enter your email')
        } else {
            await axios.post(url + '/find-email', { email })
                .then(res => {
                    if (res.data == 'Wrong email information') {
                        alert('Wrong email information')
                    } else {
                        setShowCode(true)
                        setCheckCode(true)
                    }
                })
                .catch(err => console.log(err))
        }

    }
    const SubmitCode = async () => {
        await axios.post(url + '/check-verifyCode', { code })
            .then(res => {
                if (res.data == 'success') {
                    setCheckCode(false)
                    setShowPw(true)
                    setDisable(true)

                } else if (res.data == 'Wrong verification code') {
                    alert('Wrong verification code')
                }
            })
            .catch(err => console.log(err))

    }
    const ResetPw = async () => {
        if (newPw.length < 9) {
            alert('Password too weak')
        } else {
            await axios.post(url + '/', { email, newPw })
                .then(res => {
                    console.log(res)
                    navigate('/')
                })
                .catch(err => console.log(err))
        }

    }
    return (
        <div className='getnewpw_layout'>

            <div className='getpw_center'>
                <div className='reset_pw_form'>
                    <div className='reset_pw_title'>Reset your password</div>
                    {showCode == false && <div>Enter your email address</div>}
                    {showCode == false && <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='reset_pw_email' />}
                    {showCode == true && <div>Check your email to enter the code</div>}
                    {showCode == true && <input type='password' disabled={disable} placeholder='Code' onChange={(e) => setCode(e.target.value)} className='reset_pw_email' />}
                    {showCode == false && <div className='button_position'><button className='submit_button' onClick={() => Submitting()} onKeyDown={(e) => { if (e.key == "Enter") { Submitting() } }} >Submit</button></div>}
                    {checkCode == true && <div className='button_position'><button className='submit_button' onClick={() => SubmitCode()} onKeyDown={(e) => { if (e.key == "Enter") { SubmitCode() } }}>Verify</button></div>}
                    {showPw == true && <div>Enter your new password</div>}
                    {showPw == true && <input type='password' placeholder='password' onChange={(e) => setNewPw(e.target.value)} className='reset_pw_email' />}
                    {showPw == true && <div className='button_position'><button className='submit_button' onClick={() => ResetPw()} onKeyDown={(e) => { if (e.key == "Enter") { ResetPw() } }} >Reset your password</button></div>}
                </div>
            </div>

        </div>
    )
}

export default GetNewPw