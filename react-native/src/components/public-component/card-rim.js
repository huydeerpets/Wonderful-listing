import React, {Component} from "react"
import {View, Dimensions} from "react-native"
import {pxToPo} from "../../util"

const {width, height} = Dimensions.get("window");


const CardRim = ({children, style = {}}) => {
    const {BoxFim} = styles;
    return (
        <View style={[BoxFim, style]}>
            {children}
        </View>
    )
};
const styles = {
    BoxFim: {
        paddingLeft: pxToPo(width * 0.03),
        paddingRight: pxToPo(width * 0.03)
    }
};
export default CardRim
