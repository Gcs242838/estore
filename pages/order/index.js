// pages/order/index.js

//1 页面被打开的时候onShow 频繁打开用onShow
//  0 onShow 不同于onLoad 无法在形参上接受 options参数
//  1 获取url上的参数type
//  2 根据type去发送请求获取订单数据
//  3 渲染页面

import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
//2 点击不同标题 重新发送请求来获取渲染信息

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{

                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            },
            {
                id: 3,
                value: "退款/退货",
                isActive: false
            }
        ]
    },
    //根据标题索引来激活选中 标题数组
    changeTitleByIndex(index){
           // 2 修改原数组
           let { tabs } = this.data;
           tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
           // 3 赋值到data中
           this.setData({
               tabs
           })
    },
    handleTabsItemChange(e) {
        // 1 获取被点击的标题索引
        const { index } = e.detail
            // 2 修改原数组
        this.changeTitleByIndex(index);
        //重新发送请求 type=1 index=0
        this.getOrder(index+1);
    },
    //获取订单列表的方法
    async getOrder(type) {
        const token = wx.getStorageSync("token");

        const res = await request({
            url: '/my/orders/all',
            header: { token },
            data: { type }
        });
        console.log(res);
        if(!res){
            console.log("order是空的")
        }else{
            this.setData({
                order:res.orders
            })
        }
    },
    onShow: function(options) {
        //1 获取当前小程序页面栈 - 数组 长度最大是10
        //2 数组中索引最大的页面就是当前页面
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        //console.log(currentPage.options);
        //3 获取url上的type参数
        const { type } = currentPage.options;
        //4.激活选中页面标题 当type-1时  index=0
        this.changeTitleByIndex(type-1);
        this.getOrder(type);
    },
})