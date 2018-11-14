import React, {Component} from "react"
import {View, Text, StatusBar, SafeAreaView, TouchableOpacity, Dimensions} from "react-native"
import {pxToPo} from "../../util"
import {ImgBgc} from "../../components/login"

const {width, height} = Dimensions.get("window");

class LoginHome extends Component {
    componentWillMount() {
        // this.props.navigation.navigate("SelectList");
    }

    render() {
        const {
            loginViewBox, loginImg, loginBtn, createUser, createUserText, loginText, loginBtnSlef,
            btnStyle,
        } = styles;
        return (
            <ImgBgc>
                <StatusBar
                />
                <SafeAreaView style={{flex: 1}}>
                    <View style={loginViewBox}>
                        <View style={loginImg}>
                            <Text style={{color: "#000"}}>登录</Text>
                        </View>
                        <View style={loginBtn}>
                            <TouchableOpacity style={[btnStyle, createUser]} onPress={() => {
                                this.props.navigation.navigate("CreateUser")
                            }}>
                                <Text style={createUserText}>创建免费账户</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[loginBtnSlef, btnStyle]} onPress={() => {
                                this.props.navigation.navigate("Login")
                            }}>
                                <Text style={loginText}>登录</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImgBgc>
        )
    }
}

const styles = {
    loginViewBox: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,.95)",
        borderRadius: pxToPo(5),
        flexDirection: "column"
    },
    loginImg: {
        flexGrow: 1,
    },
    loginBtn: {
        flexGrow: 0,
    },
    createUser: {
        backgroundColor: "#409EFF",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.5)"
    },
    createUserText: {
        color: "#fff"
    },
    loginText: {},
    btnStyle: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: pxToPo(width * 0.05),
        marginRight: pxToPo(width * 0.05),
        padding: pxToPo(10),
        borderRadius: pxToPo(3),
    },
    loginBtnSlef: {
        marginTop: pxToPo(10),
        marginBottom: pxToPo(10),
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.5)"
    }
};

export default LoginHome