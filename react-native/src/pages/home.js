import React, {Component} from "react"
import {View, Text, TouchableOpacity, ScrollView, AsyncStorage, Dimensions} from "react-native"
import {HeaderLeft, HeaderRight} from "../components/home"
import {CardRim} from "../components/public-component"
import {pxToPo} from "../util"
import FechUrl from "../util/require";
import {connect} from "react-redux"
import {GetCatAll} from "../redux/action/http"


const {width} = Dimensions.get("window");

class Home extends Component {
    static navigationOptions = {
        headerLeft: <HeaderLeft/>,
        headerRight: <HeaderRight/>,
        headerStyle: {
            backgroundColor: 'rgb(84,118,80)',
        },
    };
    state = {
        listData: []
    };

    uncode(str) {
        str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
            return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
        });
        str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
            return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
        });
        str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
            return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
        });
        return str;
    }

    componentWillMount() {
        let me = this;
        this.checkLogin().then(res => {
            if (!res) {
                me.props.navigation.navigate("LoginHome")
            }
        })
    }

    componentDidMount() {
        // this.getCat();
        this.props.GetCatAll()
    }

    async checkLogin() {
        try {
            let token = await AsyncStorage.getItem("token");
            if (token == null) {
                return false
            }
            return true;
        } catch (e) {
            console.log("e:", e);
        }
    }

    getCat() {
        let me = this;
        FechUrl("/api/cat/getcatall", "GET").then(res => {
            me.setState({
                listData: res.data
            })
        }).catch(error => {
            console.log("error:", error);
        })
    }

    goCatDetail(res) {
        this.props.navigation.navigate("CatDeatil", res)
    }


    render() {
        const listData = this.props.isdata;
        const {HomeView, addIcon, addSlef, IconSelf, itemSelect, addBox, itemTitle, remainingNum, addCatIcon, addCatBtn} = styles;
        return (
            <CardRim style={{flex: 1}}>
                <View style={{flex: 1, position: "relative"}}>
                    <ScrollView style={HomeView} showsVerticalScrollIndicator={false}>
                        {
                            listData.map((res, index) => {
                                // let code = this.uncode(res.icon);
                                return (
                                    <TouchableOpacity key={index} style={itemSelect} onPress={() => {
                                        this.goCatDetail(res)
                                    }}>
                                        <View style={{flexDirection: "row"}}>
                                            <Text style={IconSelf}>&#xe605;</Text>
                                            <Text style={itemTitle}>{res.title}</Text>
                                        </View>
                                        <Text style={remainingNum}>{0}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        <TouchableOpacity style={[itemSelect, addCatBtn]} onPress={() => {
                            this.props.navigation.navigate('CreateT')
                        }}>
                            <Text style={addCatIcon}>&#xe621;</Text>
                            <Text style={itemTitle}>创建清单</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity style={addIcon} onPress={() => {
                        console.log("123:", 123);
                    }}>
                        <Text style={addSlef}>+</Text>
                    </TouchableOpacity>

                </View>
            </CardRim>
        )
    }
}

const styles = {
    HomeView: {
        flex: 1,
        // backgroundColor: "red",
    },
    addBox: {
        position: "absolute",
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        bottom: pxToPo(30),
        borderWidth: pxToPo(1),
        borderColor: "red",
    },
    addIcon: {
        position: "absolute",
        width: pxToPo(50),
        height: pxToPo(50),
        borderRadius: pxToPo(25),
        alignItems: "center",
        justifyContent: "center",
        bottom: pxToPo(25),
        left: pxToPo((width - 50) / 2),
        right: pxToPo((width - 50) / 2),
        backgroundColor: "rgb(40,117,206)"
    },
    addCircle: {
        width: pxToPo(25),
        height: pxToPo(25),
    },
    font_: {
        fontFamily: "iconfont",
        fontSize: pxToPo(25)
    },
    addSlef: {
        fontSize: pxToPo(25),
        color: "#fff",
        lineHeight: pxToPo(25),
        marginTop: 0,
        marginBottom: 0,
        marginRight: "auto",
        marginLeft: "auto"
    },
    IconSelf: {
        fontFamily: "iconfont",
        // marginTop: pxToPo(0.5),
        fontSize: pxToPo(15)
    },
    itemSelect: {
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingTop: pxToPo(width * 0.03),
        // paddingBottom: pxToPo(10),
        // backgroundColor: "red",
        paddingTop: pxToPo(8),
        paddingBottom: pxToPo(8),
    },
    itemTitle: {
        marginLeft: pxToPo(8),
        fontSize: pxToPo(15)
    },
    remainingNum: {
        color: "rgba(0,0,0,.5)",
        fontSize: pxToPo(10)
    },
    addCatIcon: {
        fontFamily: "iconfont"
    },
    addCatBtn: {
        justifyContent: "flex-start",

    }
};


const mapStateToProps = (state) => {
    console.log("获取redux数据:", state);
    return {
        isdata: state
    }
};
export default connect(mapStateToProps, {GetCatAll})(Home)