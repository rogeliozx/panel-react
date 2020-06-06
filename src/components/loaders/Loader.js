import React from "react";
import './loader.css'
const Loader = (props)=>(
    <div class="lds-roller" {...props}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
)
export default  Loader