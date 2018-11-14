import React, {Component} from "react"
import {View, TextInput} from "react-native"


class WirteNote extends Component {
    render() {
        const {inputSelf} = styles;
        return (
            <View>
                <TextInput
                    multiline={true}

                />
            </View>
        )
    }
}


//使用的是TextInput组件，要在文本框中输入多行文字，需要设置multiline={true}，这样文本默认会垂直居中显示，在TextInput组件的样式上设置textAlignVertical: 'top'就能显示在首行。
const styles = {
    inputSelf: {
        textAlignVertical: 'top'
    }
};

export default WirteNote;