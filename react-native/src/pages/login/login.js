import React, {Component} from "react"
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert, AsyncStorage} from "react-native"
import {ImgBgc} from "../../components/login"
import {pxToPo, FechUrl} from "../../util"

class Login extends Component {
    state = {
        email: "",
        password: "",
    };

    login() {
        if (this.state.email === "" || this.state.password === "") {
            Alert.alert("请填写完整的信息");
            return;
        }
        let me = this;
        FechUrl(`/login`, "POST", {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if (res.state) {
                me.setToken(res.data.token).then(res => {
                    me.props.navigation.navigate("Home");
                    // me.props.navigation.navigate("SelectList");
                    console.log("me.props:", me.props);
                })
            } else {
                Alert.alert(res.data.message)
            }
            console.log("res:", res);
        }).catch(error => {
            console.log("error:", error);
        })
    }

    async setToken(token) {
        try {
            await AsyncStorage.setItem("token", token);
            console.log("1:", 1);
        } catch (e) {
            console.log("e:", e);
        }
    }


    render() {
        const {
            loginBox, cancel, cancelBtn, waringText, inputTextBox, inputSelf, btnLogin,
            loginTodoTitle,
            loginSelfText,
            waringTextContent
        } = styles;
        return (
            <ImgBgc>
                <SafeAreaView style={{flex: 1}}>
                    <View style={loginBox}>
                        <TouchableOpacity style={cancelBtn} onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Text style={cancel}>&#xe731;</Text>
                        </TouchableOpacity>
                        <View style={waringText}>
                            <Text style={loginTodoTitle}>登录到奇妙清单</Text>
                            <Text style={waringTextContent}>使用你的电子邮件地址和创建账户时的密码</Text>
                        </View>
                        <View style={inputTextBox}>
                            <TextInput style={[inputSelf]}
                                       autoCorrect={false}
                                       clearButtonMode={"while-editing"}
                                       autoFocus={true}
                                       autoCapitalize={"none"}
                                       placeholder={"电子邮件地址"}
                                       onChangeText={(e) => {
                                           console.log("e:", e);
                                           this.setState({email: e})
                                       }}/>
                            <TextInput style={[inputSelf]}
                                       autoCorrect={false} clearButtonMode={"while-editing"}
                                       secureTextEntry={true}
                                       placeholder={"密码"}
                                       onChangeText={(e) => {
                                           console.log("e:", e);
                                           this.setState({password: e})
                                       }}/>
                        </View>
                        <View>
                            <TouchableOpacity style={btnLogin} onPress={() => {
                                this.login()
                            }}>
                                <Text style={loginSelfText}>登录</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImgBgc>
        )
    }
}

const styles = {
    loginTodoTitle: {
        fontWeight: "600",
        fontSize: pxToPo(16),
    },
    waringTextContent: {
        color: "rgba(0,0,0,.5)",
        fontSize: pxToPo(13),
        marginTop: pxToPo(5)
    },
    btnLogin: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#409EFF",
        marginTop: pxToPo(10),
        marginBottom: pxToPo(10),
        padding: pxToPo(10),
        borderRadius: pxToPo(5),
    },
    loginSelfText: {
        color: "#fff",
    },
    inputSelf: {
        borderBottomWidth: pxToPo(0.5),
        borderColor: "#f6f6f6",
        padding: pxToPo(13),
        paddingLeft: pxToPo(10)
    },
    inputTextBox: {
        backgroundColor: "#fff",
        marginTop: pxToPo(5),
        flexDirection: "column",
        borderWidth: pxToPo(1),
        borderColor: "rgba(0,0,0,.1)",
        borderRadius: pxToPo(5),
    },
    waringText: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: pxToPo(15)
    },
    cancelBtn: {},
    cancel: {
        fontFamily: "iconfont",
        fontSize: pxToPo(22),
        alignItems: "flex-start",
        marginLeft: pxToPo(-5),
        color: "#707070"
    },
    loginBox: {
        backgroundColor: "rgb(242,240,237)",
        borderRadius: pxToPo(5),
        flexDirection: "column",
        padding: pxToPo(10)
    },
};

export default Login;