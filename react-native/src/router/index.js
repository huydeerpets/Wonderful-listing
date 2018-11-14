import React, {Component} from "react"
import {createStackNavigator} from "react-navigation"
import {Home, CreateTodo} from "../pages"
import {CatDeatil, ItemDetail} from "../pages/todo-cat"
import {LoginHome, CreateUser, SelectList} from "../pages/login"
import Login from "../pages/login/login";


const RootStack = createStackNavigator({
    Home: {
        screen: Home,
    },
    LoginHome: {
        screen: LoginHome,
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: false
        }),
    },
    CreateUser: {
        screen: CreateUser,
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: false
        }),
    },
    Login: {
        screen: Login,
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: false
        })
    },
    SelectList: {
        screen: SelectList,
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: false
        })
    },
    CatDeatil: {
        screen: CatDeatil,
    },
    ItemDetail: {
        screen: ItemDetail
    }
},);

const MainSatck = createStackNavigator({
    Home: {
        screen: RootStack,
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: true
        }),
    },
    CreateT: {
        screen: CreateTodo,
        navigationOptions: () => ({
            gesturesEnabled: false
        }),
    }
}, {
    mode: "modal",
});

export default MainSatck