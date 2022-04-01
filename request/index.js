// 同时发送异步代码的次数
let ajaxTimes = 0;
export const request = (params) => {
    //定义公共的url
    // "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    //判断url中是否带有 /my/ 请求的是私有数据 带上header token
    let header={};
    ajaxTimes++;
    // 显示加载中 效果
    wx.showLoading({
        title: '加载中',
        mask: true
    });
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    // 关闭正在等待的图标
                    wx.hideLoading();
                }
            }
        });
    })
}