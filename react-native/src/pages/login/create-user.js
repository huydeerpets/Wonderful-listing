import React, {Component} from "react"
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    AsyncStorage
} from "react-native"
import {ImgBgc} from "../../components/login"
import {pxToPo, FechUrl} from "../../util"
import ImageCropPicker from "react-native-image-crop-picker"

const {width, height} = Dimensions.get("window");

class CreateUser extends Component {
    state = {
        ImageUrl: require('../../static/photo.png'),
        username: "",
        email: "",
        password: "",
        avatar: ""
    };

    createUser() {
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        let pas = new RegExp("^[0-9a-zA-Z]+$");
        if (this.state.username === "" || this.state.email === "" || this.state.password === "") {
            Alert.alert("请填写完整的信息");
            return;
        }
        if (!reg.test(this.state.email)) {
            Alert.alert("请填写正确的邮箱");
            return;
        }
        if (!pas.test(this.state.password)) {
            Alert.alert("密码只能是纯英文或者数字");
            return;
        }
        let me = this;
        FechUrl(`/registered`, "POST", {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            avatar: this.state.avatar
        }).then(res => {
            if (res.state) {
                me.setToken(res.data.token).then(res => {
                    me.props.navigation.navigate("SelectList")
                });
            } else {
                Alert.alert(res.data.message)
            }
        }).catch(error => {
            console.log("error:", error);
        })
    }

    async setToken(token) {
        try {
            await AsyncStorage.setItem("token", token);
        } catch (e) {
            console.log("e:", e);
        }
    }


    //选择图片
    selectImg() {
        let me = this;
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            console.log("image[\"data\"]:", image["data"]);
            me.setState({
                ImageUrl: {uri: image['path']},
                avatar: image["data"]
            })
        })
    }

    render() {
        const {
            createUserBox, cancelIcon, avatarBox, avatarSelect, avatarBoxBorder,
            textTitle,
            textContent,
            warningText,
            InputBox,
            userName,
            inputCreate,
            btnCreate,
            createUserBtn,
            avatarBoxBorderSelf
        } = styles;
        return (
            <ImgBgc>
                <SafeAreaView style={{flex: 1}}>
                    <View style={createUserBox}>
                        <StatusBar barStyle="light-content"/>
                        <View>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.goBack();
                            }}>
                                <Text style={cancelIcon}>
                                    &#xe731;
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={avatarBox}>
                            <View style={avatarBoxBorderSelf}>
                                <TouchableOpacity style={avatarBoxBorder} onPress={this.selectImg.bind(this)}>
                                    <Image style={avatarSelect} source={this.state.ImageUrl}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={warningText}>
                            <Text style={textTitle}>创建账户</Text>
                            <Text style={textContent}>创建账户,在所有设备上同步你的清单并与你的好友分享</Text>
                        </View>

                        <View style={InputBox}>
                            <TextInput style={[userName, inputCreate]} autoCorrect={false}
                                       clearButtonMode={"while-editing"}
                                       autoFocus={true}
                                       autoCapitalize={"none"} placeholder={"名称"} onChangeText={(e) => {
                                this.setState({username: e})
                            }}/>
                            <TextInput style={[inputCreate]} autoCorrect={false}
                                       clearButtonMode={"while-editing"}
                                       autoCapitalize={"none"} placeholder={"电子邮件地址"} onChangeText={(e) => {
                                this.setState({email: e})
                            }}/>
                            <TextInput style={[inputCreate]} autoCorrect={false} clearButtonMode={"while-editing"}
                                       secureTextEntry={true} placeholder={"密码"} onChangeText={(e) => {
                                this.setState({password: e})
                            }}/>
                        </View>
                        <View>
                            <TouchableOpacity style={btnCreate} onPress={
                                () => {
                                    this.createUser()
                                }}>
                                <Text style={createUserBtn}>创建账户</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImgBgc>
        )
    }
}

const styles = {
    createUserBtn: {
        color: "#fff",
        fontWeight: "600"
    },
    btnCreate: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#409EFF",
        marginTop: pxToPo(10),
        marginBottom: pxToPo(10),
        padding: pxToPo(10),
        borderRadius: pxToPo(5),
    },
    inputCreate: {
        borderBottomWidth: pxToPo(0.5),
        borderColor: "#f6f6f6",
        padding: pxToPo(13),
        paddingLeft: pxToPo(10)
    },
    userName: {},
    createUserBox: {
        backgroundColor: "rgb(242,240,237)",
        borderRadius: pxToPo(5),
        flexDirection: "column",
        padding: pxToPo(10)
    },
    cancelIcon: {
        fontFamily: "iconfont",
        fontSize: pxToPo(22),
        alignItems: "flex-start",
        marginLeft: pxToPo(-5),
        color: "#707070"
    },
    avatarBoxBorderSelf: {
        borderColor: "rgb(215,215,215)",
        borderWidth: pxToPo(1),
        width: pxToPo(40),
        height: pxToPo(40),
        borderRadius: pxToPo(20),
    },
    avatarBox: {
        alignItems: "center",
        justifyContent: "center",
    },
    avatarSelect: {
        width: pxToPo(34),
        height: pxToPo(34),
        borderRadius: pxToPo(16),
    },
    avatarBoxBorder: {
        borderColor: '#fff',
        borderWidth: pxToPo(1.5),
        width: pxToPo(38),
        height: pxToPo(38),
        borderRadius: pxToPo(19),
        justifyContent: "center",
        alignItems: "center",
        padding: pxToPo(-5)
    },
    warningText: {
        alignItems: "center",
    },
    textTitle: {
        marginTop: pxToPo(5),
        fontWeight: "600",
        padding: pxToPo(10),
        paddingBottom: pxToPo(5)
    },
    textContent: {
        color: "rgba(0,0,0,.5)",
        fontSize: pxToPo(12),
        padding: pxToPo(10),
        paddingTop: pxToPo(0)
    },
    InputBox: {
        marginTop: pxToPo(5),
        flexDirection: "column",
        backgroundColor: "#fff",
        borderWidth: pxToPo(1),
        borderColor: "rgba(0,0,0,.1)",
        borderRadius: pxToPo(5),
    }
};


export default CreateUser;