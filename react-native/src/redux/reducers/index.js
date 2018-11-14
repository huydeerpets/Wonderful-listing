const http = (state = [], action = {}) => {

    let cacheArr = [];
    switch (action.type) {
        case "AllList":
            return action.payload;
            break;
        default:
            return cacheArr;
    }
};

export default http