import {Dimensions} from 'react-native'

const devWidht = Dimensions.get('window').width;

const uiWidth = 375;

function pxToPo(uiElementPx) {
    return uiElementPx * devWidht / uiWidth;
}

export default pxToPo
