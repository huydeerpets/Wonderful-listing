import React, {Component} from "react"
import {View, Text, TouchableOpacity, Dimensions} from "react-native"
import {pxToPo} from "../../util"
import {DatePicker, BaseComponent} from "react-native-pickers"

const {width, height} = Dimensions.get("window");

class ItemHeaderLeft extends Component {
    render() {
        const {HeaderLeftIcon, btnGoBack, headerTitle, titleBox, isLine, isFales} = ItemStyles;
        return (
            <TouchableOpacity onPress={() => this.props.goBack()} style={btnGoBack}>
                <Text style={HeaderLeftIcon}>&#xe731;</Text>
                <View style={titleBox}>
                    <Text style={[headerTitle, this.props.data.state ? isFales : ""]}>{this.props.data.title}</Text>
                    {this.props.data.state && <View style={isLine}></View>}
                </View>
            </TouchableOpacity>
        )
    }
}

const ItemStyles = {
    HeaderLeftIcon: {
        fontFamily: "iconfont",
        fontSize: pxToPo(25),
        lineHeight: pxToPo(25),
    },
    headerTitle: {
        lineHeight: pxToPo(25),
        fontSize: pxToPo(20),
    },
    btnGoBack: {
        flexDirection: "row",
    },
    titleBox: {
        position: "relative",
        marginLeft: pxToPo(15),
        justifyContent: "center",
        alignItems: "center",
    },
    isFales: {
        color: "#888"
    },
    isLine: {
        backgroundColor: "#888",
        height: pxToPo(1),
        position: "absolute",
        left: pxToPo(0),
        right: pxToPo(0),
        top: pxToPo(12.5),
    }
};

class ItemDetail extends BaseComponent {
    static navigationOptions = ({navigation}) => {
        const ItemData = {
            title: navigation.getParam("title"),
            state: navigation.getParam("state"),
        };
        return {
            headerLeft: <ItemHeaderLeft data={ItemData} goBack={() => {
                navigation.goBack()
            }}/>,
        }
    };
    state = {
        overDay: "到期日",
        timeDay: "提醒"
    };


    render() {
        const {iconData, itemBox, itemTitle, borderBox, pageBox} = styles;
        return (
            <View style={pageBox}>
                <TouchableOpacity onPress={() => {
                    this.DatePicker.show()
                }} style={itemBox}>
                    <Text style={iconData}>&#xe669;</Text>
                    <Text style={itemTitle}>{this.state.overDay}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[itemBox, borderBox]} onPress={() => {
                    this.DatePicker1.show()
                }}>
                    <Text style={iconData}>&#xe676;</Text>
                    <Text style={itemTitle}>{this.state.timeDay}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={itemBox}>
                    <Text style={iconData}>&#xe64b;</Text>
                    <Text style={itemTitle}>添加备注</Text>
                </TouchableOpacity>

                <DatePicker startYear={1990} endYear={new Date("2100").getFullYear()}
                            onPickerConfirm={(e) => {
                                this.setState({overDay: `${e.join("")}到期`});
                            }}
                            ref={ref => this.DatePicker = ref} HH={true} mm={true} ss={false}/>

                <DatePicker startYear={1990} endYear={new Date("2100").getFullYear()}
                            ref={ref => this.DatePicker1 = ref}
                            onPickerConfirm={(e) => {
                                this.setState({timeDay: `${e.join("")}提醒`});
                            }}
                            HH={true} mm={true} ss={false}
                />

            </View>
        )
    }
}

const styles = {
    iconData: {
        fontFamily: "iconfont",
        fontSize: pxToPo(20),
        lineHeight: pxToPo(20)
    },
    itemBox: {
        flexDirection: "row",
        marginTop: pxToPo(10)
    },
    itemTitle: {
        lineHeight: pxToPo(20),
        fontSize: pxToPo(15),
        // backgroundColor: "red",
        flexGrow: 1,
        marginLeft: pxToPo(10)
    },
    borderBox: {
        borderBottomColor: "rgba(0,0,0,.2)",
        borderBottomWidth: pxToPo(1)
    },
    pageBox: {
        flex: 1,
        paddingLeft: pxToPo(width * 0.03)
    }
};


export default ItemDetail;