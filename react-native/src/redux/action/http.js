import {FechUrl} from "../../util"

export const GetCatAll = () => {
    return dispath => {
        FechUrl("/api/cat/getcatall", "GET").then(res => {
            dispath(ReListData(res.data))
        }).catch(error => {
            console.log("error:", error);
        });
    };
};

const ReListData = (data) => {
    return {
        payload: data,
        type: "AllList"
    }
};

