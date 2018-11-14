import React, {Component} from "react"
import {View, Text, TextInput} from "react-native"
import {CardRim} from "../components/public-component"
import {FechUrl, pxToPo} from "../util"
import {connect} from "react-redux"
import {GetCatAll} from "../redux/action/http"

class CreateTodo extends Component {
    static navigationOptions = ({navigation}) => {
        let showText = navigation.getParam('showText') ? navigation.getParam('showText') : false,
            value = navigation.getParam('value'), getAllCat = navigation.getParam("getAllCat");
        return {
            title: "新清单",
            headerLeft: <CardRim><Text onPress={() => {
                navigation.goBack()
            }}>取消</Text></CardRim>,
            headerRight: <CardRim>
                <Text style={showText ? {color: "#000"} : {color: "rgba(0,0,0,.3)"}}
                      onPress={() => {
                          if (!showText) {
                              return;
                          } else {
                              FechUrl(`/api/cat/addcat`, "POST", {title: JSON.stringify([value])}).then(res => {
                                  getAllCat();
                                  navigation.goBack()
                              }).catch(error => {
                                  console.log("error:", error);
                              })
                          }
                      }}>
                    创建
                </Text>
            </CardRim>,
            headerStyle: {
                backgroundColor: 'rgb(84,118,80)',
            },
        }
    };
    state = {
        text: "",
        isText: false,
    };

    componentDidMount() {
        this.props.navigation.setParams({"getAllCat": this.props.GetCatAll})
    }

    render() {
        const {TextIcon, TextinputSelf, createBox, showBox, inputSelf} = styles;
        return (
            <View>
                <CardRim style={showBox}>
                    <View style={createBox}>
                        <Text style={TextIcon}>&#xe736;</Text>
                        <View style={TextinputSelf}>
                            <TextInput
                                style={inputSelf}
                                autoCorrect={false}
                                clearButtonMode={"while-editing"}
                                autoFocus={true}
                                autoCapitalize={"none"}
                                placeholder={"添加清单名称"}
                                onChangeText={(text) => {
                                    if (text === "") {
                                        this.props.navigation.setParams({'showText': false, value: ""});
                                        this.setState({
                                            isText: false,
                                        })
                                    } else {
                                        this.props.navigation.setParams({'showText': true, value: text});
                                        this.setState({text, isText: true,})
                                    }
                                }}
                            />
                        </View>
                    </View>
                </CardRim>
            </View>
        )
    }
}

const styles = {
    TextIcon: {
        fontFamily: "iconfont",
        fontSize: pxToPo(23),
        lineHeight: pxToPo(25),
        flexGrow: 0,
    },
    TextinputSelf: {
        // backgroundColor: "red",
        // borderColor: 'gray',
        // borderWidth: 1,
        flexGrow: 1,
        marginLeft: pxToPo(10)
    },
    createBox: {
        flexDirection: "row",
    },
    showBox: {
        backgroundColor: "#fff",
        shadowColor: "rgb(0,0,0)",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        padding: pxToPo(10),
        paddingLeft: pxToPo(0),
        paddingRight: pxToPo(0)
    },
    inputSelf: {
        height: pxToPo(25),
        fontSize: pxToPo(16)
    },
};


const mapPropsToState = (state) => {
    return {
        isData: state,
    }
};


export default connect(mapPropsToState, {GetCatAll})(CreateTodo)