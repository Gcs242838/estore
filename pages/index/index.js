// 0 引入 用来发送请求的方法 一定要把路径补全
import { request } from "../../request/index.js";
Page({
    data: {
        // 轮播图 数组
        swiperList: [],
        // 导航 数组
        catesList: [],
        // 楼层 数据
        floorList: []
    },
    // 页面开始加载 就会触发
    onLoad: function(options) {
        // 1 发送异步请求获取轮播图数据  回调地狱问题 解决方法：优化的手段可以通过es6
        // promise来解决这个问题
        // var reqTask = wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     method: 'GET',
        //     dataType: 'json',
        //     responseType: 'text',
        //     success: (result) => {
        //         this.setData({
        //             swiperList: result.data.message
        //         })
        //     }
        // });

        this.getSwiperList();
        this.getCateList();
        this.getFloorList();
    },

    //获取轮播图数据
    getSwiperList() {
        request({ url: '/home/swiperdata' })
            .then(result => {
                this.setData({
                    swiperList: result
                })
            })
    },
    //获取 分类导航数据
    getCateList() {
        request({ url: '/home/catitems' })
            .then(result => {
                this.setData({
                    catesList: result
                })
            })
    },
    //获取 楼层数据
    getFloorList() {
        request({ url: '/home/floordata' })
            .then(result => {
                this.setData({
                    floorList: result
                })
            })
    },
});