import React from 'react'
import AboutNavBar from '../components/AboutNavBar'
import Footer from '../components/Footer'
import { apiRequestHandler } from '../apiConfig/service'
import ApiConfig from '../apiConfig/ApiConfig'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function PrivacyPolicy() {
    const [staticContent, setStaticContent] = useState({})
     const getStaticContent = async () => {
        try {
                const res = await apiRequestHandler({ endPoint: ApiConfig.getByType("PRIVACY_POLICY"), method: "GET" })
            if (res?.success) {
                setStaticContent(res?.data || {})
            }
            else {
                toast.error("Somthing went wrong while getting satic content")
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong while getting satic content")
        }
    }
    useEffect(() => {
        getStaticContent()
    }, [])
    return (
        <div>
            <AboutNavBar />
            <div className='container outfit-fonts lineheight' 
            style={{paddingLeft:"5rem", paddingRight:"5rem"}}
            dangerouslySetInnerHTML={{__html:staticContent.description}}
            >

            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy