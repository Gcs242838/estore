// pages/search/index.js

import { request } from "../../request/index";
/**
 * 1 输入框绑定 值改变事件 input事件
 *   1 获取到输入框大的值
 *   2 合法性判断
 *   3 检验通过 把输入的值 发送到后台
 *   4 返回的数据打印到页面上
 * 2 防抖 （防止抖动） 定时器
 *   0 防抖一般用于输入框中 防止重复输入 重复发送请求
 *   1 节流一般用于页面的下拉和上拉中
 *   1 定义全局的定时器id
 */  
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods:[],
        // 取消按钮是否显示
        isFocus:false,
        //输入框的值
        inputValue:''
    },
    TimeId:-1,
    //输入框的值改变了 就会触发的事件
    handleInput(e){
        //1 获取输入框的值
        const {value} = e.detail;
        console.log(e);
        //2 检查合法性
        if(!value.trim()){
            //值不合法
            this.setData({
                goods:[],
                isFocus:false
            })
            clearTimeout(this.TimeId);
            return;
        }
        //3 准备发送请求获取数据
        this.setData({
            isFocus:true
        })
        clearTimeout(this.TimeId);
        this.TimeId = setTimeout(()=>{
            this.qsearch(value);
        },1000)
    },
    handleCancel(e){
        this.setData({
            inputValue:'',
            isFocus:false,
            goods:[]
        })
    },
    //发送请求获取搜索建议
    async qsearch(query){
         const res = await request({
             url:'/goods/qsearch',
             data:{query}
         })
         console.log(res);
         this.setData({
             goods:res
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