// pages/order/index.js
//1 页面被打开的时候onShow 频繁打开用onShow
//  0 onShow 不同于onLoad 无法在形参上接受 options参数
//  1 获取url上的参数type
//  2 根据type去发送请求获取订单数据
//  3 渲染页面
//2 点击不同标题 重新发送请求来获取渲染信息
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
            id: 0,
            value: "全部",
            isActive: true
        },
        {
            id: 1,
            value: "待付款",
            isActive: false
        },
        {
            id: 2,
            value: "待发货",
            isActive: false
        },
        {
            id: 3,
            value: "退货/退款",
            isActive: false
        },
    ]
    },
    onShow(options){
        //1 获取当前小程序页面栈 - 数组 长度最大是10
        let pages = getCurrentPages();
        console.log(pages);
        //
    },
    handleTabsItemChange(e) {
        // 1 获取被点击的标题索引
        const { index } = e.detail
            // 2 修改原数组
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        // 3 赋值到data中
        this.setData({
            tabs
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})