export const requestPayment=(pay)=>{
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            },
        });
    })
}