import React, {Component} from "react"
import {View, Text, Dimensions} from "react-native"
import {pxToPo} from "../../util"

const {width} = Dimensions.get("window");

class HeaderRight extends Component {

    render() {
        const {HeadeBox, ItemBox, IconFont} = styles;
        return (
            <View style={HeadeBox}>
                <View style={ItemBox}><Text style={IconFont}>&#xe677;</Text></View>
                <View style={ItemBox}><Text style={IconFont}>&#xe678;</Text></View>
                <View style={ItemBox}><Text style={IconFont}>&#xe673;</Text></View>
            </View>
        )
    }
}

const styles = {
        ItemBox: {
            marginRight:pxToPo(width * 0.03),
        },
        HeadeBox: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: pxToPo(13)
        },
        IconFont: {
            fontFamily: "iconfont",
            fontSize: 25,
            color: "#fff"
        }
    }
;

export default HeaderRight