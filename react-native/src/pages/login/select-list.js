import React, {Component} from "react"
import {SafeAreaView, StatusBar, View, Text, TouchableOpacity, Animated, Image} from "react-native"
import {ImgBgc} from "../../components/login"
import {pxToPo} from "../../util";

class SelectList extends Component {
    state = {
        selectList: [
            {title: '杂货购物', isSelect: false, id: 1},
            {title: '想看的电影', isSelect: false, id: 2},
            {title: '旅游', isSelect: false, id: 3},
            {title: '工作', isSelect: false, id: 4},
            {title: '家庭', isSelect: false, id: 5},
            {title: '私人', isSelect: false, id: 6},
        ],
        fadeAnim: new Animated.Value(0),
        showBtn: false,
    };

    componentDidMount() {
    }

    clickItem(index) {
        let a = this.state.selectList.map((res, index_) => {
            if (index_ === index) {
                res.isSelect = !res.isSelect;
            }
            return res;
        });
        this.setState({
            selectList: a
        });
        let b = this.state.selectList.find(res => res.isSelect === true);
        if (b) {
            this.setState({
                showBtn: true,
            })
        } else {
            this.setState({
                showBtn: false,
            })
        }
    }


    renderRound(res) {
        const {round, okIcon} = styles;
        if (res.isSelect) {
            return (
                <Text style={[round]}>
                    <Image
                        source={require("../../static/check.png")}
                        style={okIcon}
                    />

                </Text>
            )
        } else {
            return (
                <Text style={[round]}></Text>
            )
        }
    }

    render() {
        const {selectListBox, titleBox, textTitle, textContent, listBox, iconFontList, itemBox, itemTitle, btnStart, startText, itemtitleSelf, blackText, blueBgc} = styles;
        return (
            <ImgBgc>
                <StatusBar/>
                <SafeAreaView style={{flex: 1}}>
                    <View style={selectListBox}>
                        <View style={titleBox}>
                            <Text style={textTitle}>选择你的清单</Text>
                            <Text style={textContent}>你希望怎样使用奇妙清单?选择一个清单让你立即上手</Text>
                        </View>

                        <View style={listBox}>
                            {this.state.selectList.map((res, index) => {
                                return (
                                    <TouchableOpacity key={index} style={itemBox} onPress={() => {
                                        this.clickItem(index)
                                    }}>
                                        <View style={itemTitle}>
                                            <Text style={[iconFontList, res.isSelect ? blackText : ""]}>&#xe736;</Text>
                                            <Text
                                                style={[itemtitleSelf, res.isSelect ? blackText : ""]}>{res.title}</Text>
                                        </View>
                                        {this.renderRound(res)}
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <TouchableOpacity style={[btnStart, this.state.showBtn ? blueBgc : ""]}>
                            <Text style={startText}>立即开始</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImgBgc>
        )
    }
}

const styles = {
    selectListBox: {
        backgroundColor: "rgb(242,240,237)",
        borderRadius: pxToPo(5),
        flexDirection: "column",
        padding: pxToPo(10)
    },
    titleBox: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: pxToPo(5)
    },
    textTitle: {
        fontWeight: "600",
        fontSize: pxToPo(15)
    },
    textContent: {
        color: "rgba(0,0,0,.5)",
        marginTop: pxToPo(5),
        fontSize: pxToPo(13),
    },
    listBox: {
        backgroundColor: "#fff",
        borderWidth: pxToPo(1),
        borderColor: "rgba(0,0,0,.1)",
        borderRadius: pxToPo(5),
        marginTop: pxToPo(15)
    },
    iconFontList: {
        fontFamily: "iconfont",
        fontSize: pxToPo(19),
        // backgroundColor:"red",
        marginTop: pxToPo(3),
        color: "rgb(215,215,215)"
    },
    round: {
        backgroundColor: "rgb(249,249,249)",
        borderWidth: pxToPo(1),
        borderColor: "#e9e9e9",
        width: pxToPo(26),
        height: pxToPo(26),
        borderRadius: pxToPo(13),
        overflow: "hidden"
    },
    itemBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#f6f6f6",
        padding: pxToPo(10),
        borderBottomWidth: pxToPo(1)
    },
    itemTitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    round_: {
        backgroundColor: "red"
    },
    btnStart: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(140,196,251)",
        marginTop: pxToPo(10),
        marginBottom: pxToPo(10),
        padding: pxToPo(10),
        borderRadius: pxToPo(5),
    },
    blueBgc: {
        backgroundColor: "#409EFF",
    },
    startText: {
        color: "#fff",
        fontSize: pxToPo(15),
        fontWeight: "600"
    },
    itemtitleSelf: {
        fontSize: pxToPo(15),
        marginLeft: pxToPo(5),
        color: "rgb(215,215,215)",
        lineHeight: pxToPo(16)
    },
    blackText: {
        color: "#000"
    },
    okIcon: {
        width: pxToPo(26),
        height: pxToPo(26),
        borderRadius:pxToPo(13)
    }
};

export default SelectList;