import React, {Component} from "react"
import {View, Image, Text, Dimensions} from "react-native"
import {pxToPo} from "../../util"

const {width} = Dimensions.get("window");

class HeaderLeft extends Component {

    render() {
        const {avatar, HeadeBox, ItemBox, UserName} = styles;
        return (
            <View style={HeadeBox}>
                <View><Image style={avatar} source={require("../../static/avatar.jpeg")}/></View>
                <View style={ItemBox}><Text style={UserName}>尹敏乾</Text></View>
            </View>
        )
    }
}

const styles = {
        ItemBox: {
            marginLeft: pxToPo(width * 0.03),
        },
        HeadeBox: {
            marginLeft: pxToPo(width * 0.03),
            flexDirection: "row",
            alignItems: "center",
            marginBottom: pxToPo(13)
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
        },
        UserName: {
            color: "#fff"
        }
    }
;

export default HeaderLeft