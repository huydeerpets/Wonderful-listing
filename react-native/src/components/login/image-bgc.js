import React, {Component} from "react"
import {ImageBackground, View} from "react-native"
import {pxToPo} from "../../util"


const ImgBgc = ({children}) => {
    return (
        <ImageBackground source={require("../../static/backgrounds/wlbackground06_mobile.jpg")} resizeMode={"cover"}
                         style={{flex: 1, padding: pxToPo(15), paddingTop: pxToPo(0)}}>
            {/*<View*/}
            {/*style={{flex: 1, backgroundColor: "rgba(255,255,255,.2)", padding: pxToPo(15), paddingTop: pxToPo(0)}}>*/}
            {/*{children}*/}
            {/*</View>*/}
            {children}
        </ImageBackground>
    )
};
export default ImgBgc;
