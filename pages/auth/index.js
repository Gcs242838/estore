import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
    // 获取用户信息
    async handleGetUserInfo(e) {
        //1 获取用户信息
        const { encryptedData, rawData, iv, signature } = e.detail;
        //2 获取小程序登录成功后的code
        wx.login({
            timeout: 10000,
            success: (result) => {
                const { code } = result;
            }
        });
        //3 发送请求 获取用户的token值
        // const loginParams = { encryptedData, rawData, iv, signature, code };
        // url:'/estore/user/wxapp/login'

        //const res = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
        //这个token是教学用的，正常流程是上面的方式
        let token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
        wx.setStorageSync("token", token);
        wx.navigateBack({
            delta: 1
        });
    }
})