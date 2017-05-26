/**
 * Created by mat on 17-1-24.
 */

var http=require('http');
var _=require('lodash')
var fields='serial,present,ready,status';
var dataFamat=require('./dataFormat')


var options= {
  hostname: '10.12.32.40',
  port: 7109,
  path: '/emtc/devices',
  method: 'POST'
}
var req=http.request(options,function(res){
//console.log('aa');
  console.log('States:',res.statusCode);
  var chunks=[]
  res.on('data',function(chunk){
    chunks.push(chunk);
  })
  res.on('end',function(){
    var str=dataFamat.ab2str(Buffer.concat(chunks))
    var obj=JSON.parse(str);
    var list=obj.data;
    console.log(list.constructor.name)
    list.forEach(function(item){
      console.log(item)
      //console.log(_.pick(item,fields.split(',')))
    })
  })
})
//req.write(JSON.stringify([]))//请求所有设备
//req.write(JSON.stringify(['RO5PBM5LQWJZDQCM','38c2b6aa']))//请求多个设备
req.write(JSON.stringify({serial:['2cbd470b']}))//请求单个设备
req.end()
/*dbapi.setDeviceToken('38c2b6aa',null)
.then(function(stat){
  console.log(stat)
})*/

