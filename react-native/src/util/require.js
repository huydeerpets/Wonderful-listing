import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'

const FechUrl = async (url, action = "GET", data = '',) => {
    url = `http://192.168.31.71:8888${url}`;
    let headers = new Headers(), token = await _getToken();
    headers.set('Content-Type', 'application/json');
    headers.set('Token', token);
    if (data === '') {
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: action,
                headers,
            }).then(res => res.json()).then(res => {
                return resolve(res);
            })
                .catch(error => {
                    return reject(error);
                })
        })
    } else {
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: action,
                headers: headers,
                body: JSON.stringify(data),
            }).then(res => res.json()).then(res => {
                return resolve(res)
            }).catch(error => {
                return reject(error);
            })
        })
    }
};

const _getToken = async () => {
    try {
        let token = await AsyncStorage.getItem('token');
        if (token != null) {
            return token;
        } else {
            return ""
        }
    } catch (e) {
        console.log('e', e);
    }
};

export default FechUrl;