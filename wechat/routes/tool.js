//import util from 'util';
//const proXml2js = util.promisify(Xml2js)
const {parseString} = require ('xml2js');
//xml to js 的异步
module.exports = {
     parseXMLAsync (xmlDate) {
        return new Promise((resolve,reject)=>{
            parseString(xmlDate,{trim: true},(err,date)=>{
                if(!err){
                    resolve(date)
                }else{
                    reject('parseXMLAsync出错：'+err)
                }
            } )
    
        })
    
    },
    
    
}
        
