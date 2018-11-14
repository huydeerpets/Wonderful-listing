import React, {Component} from "react"
import {View, Text, ScrollView, TextInput, TouchableOpacity, LayoutAnimation, FlatList, Dimensions} from "react-native"
import {ImgCatBgc} from "../../components/cat-detail"
import {pxToPo, FechUrl} from "../../util"


const {width, height} = Dimensions.get("window");

class CatDeatil extends Component {
    static navigationOptions = ({navigation}) => {
        const title = navigation.getParam("title");
        return {
            title,
            headerRight: <Text>编辑</Text>,
            headerStyle: {
                backgroundColor: 'rgb(84,118,80)',
            },
        };
    };
    state = {
        addTitle: "",
        listTrueData: [],
        listFalseData: [],
        showDoneState: false,
    };


    componentDidMount() {
        this.getCatData()
    }

    addItem() {
        if (this.state.addTitle === "") {
            return;
        }
        let catId = this.props.navigation.getParam("id"), me = this;
        FechUrl("/api/list/addlist", "POST", {
            cat_id: catId,
            title: this.state.addTitle,
        }).then(res => {
            if (res.code === 200) {
                me.setState({
                    addTitle: "",
                });
                me.getCatData();
            }
        }).catch(error => {
            console.log("error:", error);
        })
    }

    getCatData() {
        let catId = this.props.navigation.getParam("id"), me = this;
        FechUrl(`/api/list/get_cat_list/${catId}`).then(res => {
            if (res.code === 200) {
                me.setState({listTrueData: res.data.true_data, listFalseData: res.data.false_data,})
            }
        }).catch(error => {
            console.log("error:", error);
        })
    }

    renderDoneItem() {
        const {isLine, doneItem, Itemiconfont, listBox, ItemSatrtIcon, ItemListTitle} = styles;
        if (this.state.showDoneState) {
            return (
                <FlatList
                    data={this.state.listTrueData}
                    renderItem={({item, index}) =>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("ItemDetail", item)
                        }} style={[listBox]}>
                            <Text style={[Itemiconfont, doneItem]} onPress={() => {
                                this.clickTrueItem(item, index)
                            }}>&#xe7a8;</Text>
                            <Text style={[ItemListTitle, doneItem]}>{item.title}</Text>
                            <Text style={[ItemSatrtIcon, doneItem]}>&#xe7df;</Text>
                            <View style={isLine}></View>
                        </TouchableOpacity>
                    }
                />
            )
        } else {
            return null;
        }
    }

    clickTrueItem(item, index) {
        let me = this;
        FechUrl("/api/list/update_item_start", "POST", {
            id: item.id,
            state: item.state,
        }).then(res => {

            let oldData = Object.assign({}, item);
            oldData.state = false;
            let listFalseData = [...me.state.listFalseData];
            listFalseData.unshift(oldData);


            let listTrueData = [...me.state.listTrueData];
            listTrueData.splice(index, 1);
            LayoutAnimation.spring();
            me.setState({
                listFalseData: listFalseData,
                listTrueData: listTrueData,
            }, () => {
                console.log("数据储存完毕:");
            });

        }).catch(error => {
            console.log("error:", error);
        })
    }

    clickFalseItem(item, index) {
        let me = this;
        FechUrl("/api/list/update_item_start", "POST", {
            id: item.id,
            state: item.state,
        }).then(res => {
            //if http done and success,first remove falseArr item self
            let listFalseData = [...me.state.listFalseData];
            listFalseData.splice(index, 1);


            //and then add item self to trueArr;
            let listTrueData = [...me.state.listTrueData], a = Object.assign({}, item);
            //remember change state;
            a.state = true;
            listTrueData.unshift(a);
            LayoutAnimation.spring();
            me.setState({
                listFalseData: listFalseData,
                listTrueData: listTrueData,
            })
        }).catch(error => {
            console.log("error:", error);
        })
    }

    render() {
        const {
            addBox, addIcon, inputSelf, inputTextSelf, Itemiconfont, listBox,
            listAllBox, ItemListTitle,
            ItemSatrtIcon, btnShowDone,
            btnShow, tabBar, barIcon,
            barItem, barTitle
        } = styles;
        return (
            <ImgCatBgc>
                <ScrollView style={{flex: 1, position: "relative"}} showsVerticalScrollIndicator={false}>
                    <View style={addBox}>
                        <Text style={addIcon}>&#xe7fe;</Text>
                        <View style={inputSelf}>
                            <TextInput
                                value={this.state.addTitle}
                                style={inputTextSelf}
                                autoCorrect={false}
                                clearButtonMode={"while-editing"}
                                autoCapitalize={"none"}
                                placeholder={"添加任务..."}
                                onChangeText={(e) => {
                                    this.setState({
                                        addTitle: e
                                    })
                                }}
                                onEndEditing={() => {
                                    this.addItem()
                                }}
                            />
                        </View>
                        <Text style={addIcon}>&#xe7df;</Text>
                    </View>
                    <View style={listAllBox}>
                        <FlatList
                            data={this.state.listFalseData}
                            renderItem={({item, index}) =>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate("ItemDetail", item)
                                }} style={listBox}>
                                    <Text style={Itemiconfont} onPress={() => {
                                        this.clickFalseItem(item, index)
                                    }}>&#xe7a9;</Text>
                                    <Text style={ItemListTitle}>{item.title}</Text>
                                    <Text style={ItemSatrtIcon}>&#xe7df;</Text>
                                </TouchableOpacity>
                            }
                        />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                showDoneState: !this.state.showDoneState
                            })
                        }} style={btnShowDone}>
                            <Text style={btnShow}>{this.state.showDoneState ? "隐藏已完成项目" : "显示已完成项目"}</Text>
                        </TouchableOpacity>
                        {this.renderDoneItem()}
                    </View>


                </ScrollView>
                <View style={tabBar}>
                    <View style={barItem}>
                        <Text style={[barIcon]}>&#xe7af;</Text>
                        <Text style={barTitle}>共享</Text>
                    </View>
                    <View style={barItem}>
                        <Text style={[barIcon]}>&#xe7f1;</Text>
                        <Text style={barTitle}>排序</Text>
                    </View>
                    <View style={barItem}>
                        <Text style={[barIcon]}>&#xe673;</Text>
                        <Text style={barTitle}>更多</Text>
                    </View>
                </View>
            </ImgCatBgc>
        )
    }
}

const styles = {
    addBox: {
        marginTop: pxToPo(10),
        backgroundColor: "rgba(0,0,0,.1)",
        flexDirection: "row",
        padding: pxToPo(10),
        borderRadius: pxToPo(2)
    },
    inputTextSelf: {
        height: pxToPo(20),
    },
    inputSelf: {
        flexGrow: 1,
        height: pxToPo(20),
        paddingLeft: pxToPo(5)
    },
    addIcon: {
        fontFamily: "iconfont",
        color: "#fff",
        lineHeight: pxToPo(20),
        fontSize: pxToPo(20)
    },
    Itemiconfont: {
        fontFamily: "iconfont",
        fontSize: pxToPo(15),
        lineHeight: pxToPo(20),
        color: "#555"
    },
    listBox: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: pxToPo(2),
        padding: pxToPo(15),
        position: "relative",
        borderRadius: pxToPo(3)
    },
    listAllBox: {
        marginTop: pxToPo(10)
    },
    ItemListTitle: {
        marginLeft: pxToPo(10),
        flexGrow: 1,
        fontSize: pxToPo(15),
        lineHeight: pxToPo(20),
        color: "#555"
    },
    ItemSatrtIcon: {
        fontFamily: "iconfont",
        fontSize: pxToPo(20),
        lineHeight: pxToPo(20),
        color: "#555"
    },
    doneItem: {
        color: "#888"
    },
    isLine: {
        backgroundColor: "#888",
        height: pxToPo(1),
        position: "absolute",
        left: pxToPo(12),
        right: pxToPo(12),
        top: pxToPo(25),
    },
    btnShowDone: {
        justifyContent: "center",
        alignItems: "center",
        padding: pxToPo(20),
    },
    btnShow: {
        backgroundColor: "rgba(0,0,0,.1)",
        padding: pxToPo(5),
        borderRadius: pxToPo(5)
    },
    tabBar: {
        position: "absolute",
        left: pxToPo(0),
        right: pxToPo(0),
        bottom: pxToPo(0),
        backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: pxToPo(width * 0.05),
        paddingRight: pxToPo(width * 0.05)
    },
    barItem: {
        justifyContent: "center",
        alignItems: "center",
        padding: pxToPo(5)
    },
    barIcon: {
        fontFamily: "iconfont",
        fontSize: pxToPo(21),
        color: "#fff"
    },
    barTitle: {
        fontSize: pxToPo(10),
        color: "#fff",
        marginTop: pxToPo(2),
    }

};


export default CatDeatil;