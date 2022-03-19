var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
const {parseXMLAsync,formatMessage} = require ('./tool.js');
const {getShop,getTbk} = require('../tb/taobaoMethod');
router.get('/', function(req,res){
  let {signature,timestamp,nonce,echostr} = req.query;
  let token = 'ceshi';
  let arr = [timestamp,nonce,token];
  const arrSort = arr.sort();
  const str = arr.join('');
  const sha1Str = sha1(str);
  
  if(sha1Str===signature){
    res.set('Content-Type','text/plain');
    res.send(echostr);
  }else{
    res.send('接入微信失败');
  }
});

router.post('/', function(req,res){
  let xmlData = ''
  req.on('data',function(data){
    xmlData += data
  });
  req.on('end',async ()=>{
    
   const jsDate = await parseXMLAsync (xmlData);
   const message = formatMessage(jsDate);
  //  console.log(message);
  
    let shopData =await getShop (message.Content);
    let urlBase = shopData[0].coupon_share_url;
    let url = 'https:' + urlBase ;
    let tkl0 = await getTbk (url);
    let preShopPrice = shopData[0].zk_final_price;
    let couponAmount = shopData[0].coupon_amount ;
    let tkl = tkl0.data.model +'!原价￥'+ preShopPrice + '优惠券￥' + couponAmount + '!复制内容到tao寶!'
    let replyContent = ''
    if (message.MsgType === 'text'){
       replyContent = tkl
    }

   const reply = `<xml>
   <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
   <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
   <CreateTime>${Date.now()}</CreateTime>
   <MsgType><![CDATA[text]]></MsgType>
   <Content><![CDATA[${replyContent}]]></Content>
   </xml>`;
   res.send(reply);
  }
    )
  
  
}
)


module.exports = router;
