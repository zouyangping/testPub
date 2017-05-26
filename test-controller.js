module.exports = function testCtrl($scope,$http) {
  $scope.testImg = '';
  var crop = document.getElementById('crop');
  $scope.getFile = function (){
    $scope.control.getAppUI().then(function(data) {
      console.log(data)
      crop.src = 'data:image/png;base64,' + data.body.img;

      var url = 'http://localhost:7100/s/upload/debug/703/'+$scope.device.serial+'/';
      crop.onload = function () {
        console.log(1)
        var canvas = document.createElement('CANVAS'),
          ctx = canvas.getContext('2d');
        canvas.height = crop.height;
        canvas.width = crop.width;
        console.log(canvas.height, canvas.width);
        ctx.drawImage(crop, 0, 0);
        var formData = new FormData();
        var scontent = "# coding=utf-8\r\n\
import unittest\r\n\
import time\r\n\
from appium import webdriver\r\n\
from appium.webdriver.common.touch_action import TouchAction\r\n\
from selenium.common.exceptions import WebDriverException\r\n\
from selenium.common.exceptions import NoSuchElementException\r\n\
import sys\r\n\
import os\r\n\
\
class CaculatorTests(unittest.TestCase):\r\n\
    def setUp(self):\r\n\
        desired_caps = {}\r\n\
        desired_caps['platformName'] = 'Android'\r\n\
        desired_caps['platformVersion'] = os.environ['VERSION']\r\n\
        desired_caps['deviceName'] = 'ZTE BV0720'\r\n\
        desired_caps['appPackage'] = 'com.cmcc.wallet'\r\n\
        desired_caps['appActivity'] = 'com.cmcc.wallet.LoadingActivity'\r\n\
        desired_caps['udid'] = os.environ['UDID']\r\n\
        self.driver = webdriver.Remote('http://localhost:'+os.environ['APPIUMPORT']+'/wd/hub', desired_caps)\r\n\
\
    def test_add_function(self):\r\n\
        self.driver.implicitly_wait(10)\r\n\
        time.sleep(2)\r\n\
        print('Have enter')\r\n\
        time.sleep(5)\r\n\
        self.driver.back()\r\n\
        time.sleep(2)\r\n\
        self.driver.back()\r\n\
        self.driver.back()\r\n\
\
if __name__ == '__main__':\r\n\
    suite = unittest.TestLoader().loadTestsFromTestCase(CaculatorTests)\r\n\
    unittest.TextTestRunner(verbosity=2).run(suite)\r\n"
        console.log(scontent)

        function dataURLtoBlob(dataurl) {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {type:mime});
        }
        var txt=new Blob([scontent],{type:"text/plain"})
        var img=dataURLtoBlob(canvas.toDataURL('image/jpeg', 1))
        formData.append('test.py',txt)
        formData.append('test.jpg',img)
        $http({
          method: 'POST',
          url: url,
          data: formData,//params,
          headers: {'Content-Type': undefined},//undefined
          transformRequest: angular.identity
        }).success(function (res) {
          console.log(res)
        })
      }
    })

    function subnailImage(source,type) {
      var width = source.width;
      var height = source.height;
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      // draw image params
      var sx = 0;
      var sy = 0;
      var sWidth = width;
      var sHeight = height;
      var dx = 0;
      var dy = 0;
      var dWidth = width;
      var dHeight = height;
      var quality = 1;

      canvas.width = width;
      canvas.height = height;

      context.drawImage(source, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      var dataUrl = canvas.toDataURL('image/'+type, quality);
      return dataUrl;
    }

    /*$http.get(url)
      .then(function(data){
        console.log(data.data)
        //console.log(data.data.constructor.name)
        //var blob=new Blob([data.data],{type:"image/png"});
        //console.log('blob:',blob);
        //var source = window.URL.createObjectURL(blob);
        //$scope.testImg='data:image/png;base64,'+data.data;
        // var fileReader = new FileReader();
        // fileReader.readAsArrayBuffer(data.data);
      })
      .catch(function(e){console.log(e)})*/
  }

  $scope.fspull = function (){
    debugger
    $scope.control.fspull('/data/local/tmp','150508');
  }
  $scope.resScreen = function(flag){
    console.log(flag)
    $scope.control.resScreen(flag);
  }

  $scope.scriptDebug = function(){
    $scope.control.scriptDebug('703');
  }

  /*websocket*/
  $scope.$on('msgWS',function(){
    console.log($scope.device.msgWSUrl)
    var ws = new WebSocket($scope.device.msgWSUrl)
    ws.binaryType = 'blob'

    ws.onerror = function errorListener() {
      // @todo Handle
    }

    ws.onclose = function closeListener() {
      // @todo Maybe handle
    }

    ws.onopen = function openListener() {
      ws.send('appui');
      console.log('send appui')
    }
    ws.onmessage = function(message) {
      console.log(message.data)
    }
  })

  //脚本调试最终生成的截图请求:get /s/download/debug/:user/:serial/capture
  //脚本调试时,获取image和xml,appui get /s/download/debug/:user/:serial/appui

  
}

