import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
    // 获取用户信息
    async handleGetUserInfo(e) {
        // 1 获取用户信息
        const { encryptedData, rawData, iv, signature } = e.detail;
        // 2 获取小程序登录成功后的code
        wx.login({
            timeout: 10000,
            success: (result) => {
                const { code } = result;
            }
        });
        // 3 发送请求 获取用户的token值
        const loginParams = { encryptedData, rawData, iv, signature, code };
        const res = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
        console.log(res);
        wx.navigateBack({
            delta: 1
        });
    }
})