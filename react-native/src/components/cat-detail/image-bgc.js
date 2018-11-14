import React, {Component} from "react"
import {View, ImageBackground, Dimensions} from "react-native"
import {pxToPo} from "../../util"

const {width, height} = Dimensions.get("window");
const ImgCatBgc = ({children}) => {
    return (
        <ImageBackground source={require("../../static/backgrounds/wlbackground06_mobile.jpg")}
                         style={{paddingRight: pxToPo(width * 0.02), flex: 1,paddingLeft: pxToPo(width * 0.02)}}>
            {children}
        </ImageBackground>
    )
};


export default ImgCatBgc;