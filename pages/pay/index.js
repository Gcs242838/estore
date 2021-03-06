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
 */
Page({
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0
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
    handleOrderPay() {
        // 1 判断缓存中有没有token
        const token = wx.getStorageSync("token");
        // 2 判断
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index'
            });

        }
        console.log("已经存在token了");
    }
})