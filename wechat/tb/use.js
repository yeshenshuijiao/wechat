const {getShop,getTbk} = require('./taobaoMethod');



async function fn (){
    let shopData =await getShop ('衬衫')
    let urlBase = shopData[0].coupon_share_url
    let url = 'https:' + urlBase 
    let tkl0 = await getTbk (url)
    let tkl = tkl0.data.model
      console.log(tkl);
     //console.log(tkl);
}

fn()