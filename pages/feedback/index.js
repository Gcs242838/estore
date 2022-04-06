// pages/feedback/index.js
// 1 点击“+”按钮触发tap点击事件
//     1 调用小程序内置的选择图片的api
//     2 获取到图片的路径 数组
//     3 把图片路径存到data变量中
//     4 页面就根据 图片数组循环显示 自定义数组
// 2 点击自定义图片组件 
//     1 获取被点击元素的索引
//     2 获取data中的图片数组
//     3 根据索引 数组中的对应元素删除
//3  点击“提交”
    //    1 获取文本域内容
            // 1 data中定义变量 表示输入框的获取
            // 2 文本域 绑定 输入事件 事件触发的时候 把输入框的值 存入变量中
    //    2 对这些内容的合法性进行校验
            //
    //    3 验证通过 用户选择图片 上传到专门图片的服务器中  返回图片外网的链接
            //遍历图片数组
            //挨个上传
            //自己再维护图片数组 存放 图片上传后外网的链接
    //    4 文本域和外网的图片的路径 一起提交到服务器
    //    5 清空当前页面
    //    6 返回上一页
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
            id: 0,
            value: "体验问题",
            isActive: true
        },
        {
            id: 1,
            value: "商品投诉",
            isActive: false
        },
    ],
    chooseImgs:[],
    //文本域的内容
    textVal:""
    },
    //外网图片的路径数组
    UploadImgs:[],
    //点击+号选择图片事件
    handleChooseImg(e){
     //调用小程序内置的图片选择器
     wx.chooseImage({
         //同时选择图片的数量
         count: 9,
         //图片的格式 原图 压缩
         sizeType: ['original','compressed'],
         //图片的来源 相册 照相机
         sourceType: ['album','camera'],
         success: (result)=>{
             console.log(result);
             this.setData({
                 //图片数组进行拼接
                 chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
             })
         },
     });
    },
    handleRemoveImg(e){
        //被点击的组件索引
        const {index} = e.currentTarget.dataset;
        //获取data中的图片数组
        let {chooseImgs} = this.data;
        console.log(index); 
        //删除元素
        chooseImgs.splice(index,1);
        this.setData({
            chooseImgs
        })
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
    //文本域的输入事件
    handleTextInput(e){
        this.setData({
            textVal:e.detail.value
        })
    },
    //提交按钮的点击事件
    handleFormSubmit(){
        //1 获取文本域的内容
        const {textVal,chooseImgs} = this.data;
        //2 合法性的验证
        if(!textVal.trim()){
            //不合法
            wx.showToast({
                title: '输入不合法',
                icon: 'none',
                mask: true,
            });
            return;
        }
        wx.request({
            url: 'https://img.coolcr.cn/api/token',
            data: {
                email:"530088058@qq.com",
                password:"zz546600"
            },
            header: {'content-type':'application/json'},
            method: 'POST',
            success: (result)=>{
                var picToken = result.data.data.token;
                wx.setStorageSync("picToken",picToken);
                //console.log(picToken);
            },
        });
        var getPicToken = wx.getStorageSync("picToken");
        
        //加载效果
        wx.showLoading({
            title: "正在上传中",
            mask: true,
        });

        //3 准备上传图片到专门的服务器
        //上传文件的api不支持多个文件同时上传  遍历数组 挨个传
        chooseImgs.forEach((v,i)=>{
            wx.uploadFile({
                //图片要上传到哪里
                url:'https://img.coolcr.cn/api/upload',
                //头部
                header:{
                    "token":getPicToken
                },
                method: 'POST',
                //被上传文件的路径
                filePath: v,
                //上传文件的名称 后台获取文件
                name: "image",
                //顺带文本信息
                formData: {},
                success: (result)=>{
                    console.log(result);
                    if(i===chooseImgs.length-1){
                        //关闭加载页面
                        wx.hideLoading();
                        //重置页面
                        this.setData({
                            text:'',
                            chooseImgs:[]
                        })
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                },
            });
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