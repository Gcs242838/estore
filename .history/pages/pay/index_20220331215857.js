/* 
1 页面加载的时候
    1 从缓存中获取购物车数据 渲染到页面中
      这些数据 checked=true 不勾选的商品不要渲染
    2 微信支付
        1 哪些人 哪些账号 可以实现微信支付
            1 企业账号
            2   企业账号的小程序后台中 必须 给开发者 添加上白名单
                1 一个 appid 可以同时绑定多个开发者
                2 这些开发者就可以共用这个appid 和 它的开发权限
    3 支付按钮
        1 先判断缓存中有没有token
        2 没有 跳转到授权页面 获取token
    4 创建订单，获取订单编号
 */
import { requestPayment } from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index"
Page({
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0,
    },
    onShow() {
        // 1 获取缓存中的收货地址信息
        const address = wx.getStorageSync("address");
        // 1 获取缓存中的购物车数据
        let cart = wx.getStorageSync("cart") || [];
        // 过滤后的购物车数组
        cart = cart.filter(v => v.checked);
        this.setData({ address });
        // 重新计算总价格 总数量
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
                totalPrice += v.num * v.goods_price;
                totalNum += v.num;
            })
            // 2 给data赋值
        this.setData({
            cart,
            totalPrice,
            totalNum
        });
    },
    // 点击支付
    async handleOrderPay() {
        try {
            // 1 判断缓存中有没有token
        const token = wx.getStorageSync("token");
        // 2 判断
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index'
            });

        }
        // console.log("已经存在token了");
        //3 创建订单
        //3.1准备 请求头参数
        const header = {Authorization:token};
        //3.2准备 请求体参数
        const order_price = this.data.totalPrice;
        const consignee_addr = this.data.address.all;
        const cart = this.data.cart;
        let goods=[];
        cart.forEach(v=>goods.push({
            goods_id:v.goods_id,
            goods_number:v.num,
            goods_price:v.goods_price
        }))
        const orderParams = {order_price,consignee_addr,cart};
        //4 准备发送请求 创建订单 获取订单编号
        const {order_number} = await request({
            url:'/my/orders/create',
            method:'POST',
            data:orderParams,
            header
        });
        //5 发起预支付的接口
        const {pay} = await request({
            url:"/my/orders/req_unifiedorder",
            method:'POST',
            header,
            data:{order_number}
        });
        //6 发起微信支付
        await requestPayment(pay);
        //7 查询后台 订单状态
        const res = await request({
            url:"/my/orders/req_unifiedorder",
            method:"POST",
            header,
            data:{order_number}
        })
        wx.showToast({
            title: '支付成功',
            duration: 2000,
        });
        } catch (error) {
            wx.showToast({
                title: '支付失败',
                duration: 2000,
            });
            console.log(error);
        }
    }
})
