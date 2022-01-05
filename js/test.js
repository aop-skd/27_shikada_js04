"use strict";


// 東京(130010)の予報を取得
let url = "https://weather.tsukumijima.net/api/forecast/city/130010";
 
// Fetch APIを利用した情報の取得
fetch(url)
   .then(function(response) {
       return response.json();
   })
   .then(function(weather) {
       console.log(weather);

       // 画面に書き出す
       const h =`
       <div id="mainTable">
          <h1>TOKYO Weather</h1>
          <div id="time">latest update: ${weather.publicTimeFormatted}</div>
          <div id="weather">TODAY<br>${weather.forecasts[0].detail.weather}</div>
          <div id="wind">WIND<br>${weather.forecasts[0].detail.wave}</div>
          <div id= "maxTemp">MAX<br>${weather.forecasts[0].temperature.max.celsius}℃</div>

        <div id="chanceOfRainLarge">
          <p id="crtitle">Chance of Rain</p>
          <div id="chanceOfRainSmall">
            <div id="rain0006" class="rainchance">${weather.forecasts[0].chanceOfRain.T00_06}</div>    
            <div id="rain0612" class="rainchance">${weather.forecasts[0].chanceOfRain.T06_12}</div>    
            <div id="rain1218" class="rainchance">${weather.forecasts[0].chanceOfRain.T12_18}</div>        
            <div id="rain1824" class="rainchance">${weather.forecasts[0].chanceOfRain.T18_24}</div>             
          </div>
        </div>

      </div>
       
       `;
      //  発表時間
      // 今日の天気
      // 今日の風速
      // 今日の最高気温
      // 降水確率1
      // 降水確率2
      // 降水確率3
      // 降水確率4      
       $("#table").html(h);

   //  背景判定のために天気情報を判別する
      const weatherBG = $("#weather").text();
      const weatherBG2 =$("#rain1218").text();
      
      if(weatherBG2 == "--%"){
        $("#mainTable").css("background-image", "url(image/night.jpg)");
        $("#mainTable").css("color", "#fff");
      }else if (weatherBG.indexOf("晴れ") !== -1){
        //  alert("晴れ背景");
        $("#mainTable").css("background-image", "url(image/sunny.jpg)"); 
        $("#mainTable").css("color", "#000");
      }else if(weatherBG.indexOf("くもり") !== -1){
        //  alert("曇り背景");
        $("#mainTable").css("background-image", "url(image/cloudy.jpg)");
        $("#mainTable").css("color", "#fcc"); 
      }else if(weatherBG.indexOf("雨") !== -1){
        // alert("雨背景");
        $("#mainTable").css("background-image", "url(image/rainy.jpg)");
        $("#mainTable").css("color", "#fff");
      }else{
        //  alert("その他背景")
        $("#mainTable").css("background-image", "url(image/etc.jpg)");
        $("#mainTable").css("color", "#fff");
      };


   });


  //  Local storage- 4桁まではアウタ-、6桁以上は寒い情報の登録
/* Localstorageに持っているアウターを保存する */

   $("#savebutton").on("click", function(){
    const key = Math.floor(Math.random()*10000);
    //  Key- randomな数字

    const value = $("#saveouter").val();
    console.log(key);
    //  Value - 持っているアウター

    // ローカルストレイジへの保存
    localStorage.setItem(key, value);

    // リストの追加
    const outerYouHave =`
    <div data-key=${key} class="eachItem">
      <div class="outerEach">${value}</div>
      <div class="eachDelete"><i class="fas fa-times"></i></div>
    </div>

    `;

    $("#tableOuter").append(outerYouHave);

   });

  //  リストにlocal storageのデータを読み込む
    for(let i = 0; i<localStorage.length; i++){
      const key =localStorage.key(i);
      const value = localStorage.getItem(key);

        if(Number(key) < 10000){
          const hh =`
          <div data-key=${key} class="eachItem">
            <div class="outerEach">${value}</div>
            <div class="eachDelete"><i class="fas fa-times"></i></div>
          </div>
          `;

          $("#tableOuter").append(hh);
        };

    };

  // クローゼットの選択肢作成
    for(let i = 0; i<localStorage.length; i++){
      const key2 =localStorage.key(i);
      const value2 = localStorage.getItem(key2);

      if(Number(key2) < 10000){
      
      const hhh =`
      <option name=${key2} class=${key2}>${value2}</div>
      `;

      $("#selectWear").append(hhh);
        
      };

    };

  //  ボタンをクリックすると寒い情報をlocal storageに保存する
    $("#savebutton2").on("click", function(){

      fetch(url)
      .then(function(response) {
          return response.json();
      })
      .then(function(weather) {

      const key3 = Math.floor(Math.random()*10000)*100000;

      const array =[
        $("#selectWear").val(),
        $("#howCold").val(),
        weather.publicTimeFormatted,
        weather.forecasts[0].detail.weather,
        weather.forecasts[0].detail.wave,
        weather.forecasts[0].temperature.max.celsius
      ];
      //  0"洋服" 1"体感" 2"日時" 3"天気" 4"風速" 5"最高気温"

      const json = JSON.stringify(array, undefined, 1)
      // console.log(array);
      localStorage.setItem(key3, json);


      const hhh =`
      <div data-key=${key3} class="eachItemCover">
        <div class="eachItem1">${array[0]}</div>
        <div class="eachItem2">${array[1]}</div>
        <div class="eachItem3">${array[3]}</div>
        <div class="eachItem4">${array[4]}</div>
        <div class="eachItem5">${array[5]}</div>
        <div class="eachDelete"><i class="fas fa-times"></i></div>
      </div>
      `;

      $("#memoAppear").append(hhh);
      
      });

    });

// local storageからデータを出す
for(let i = 0; i<localStorage.length; i++){
  const key4 =localStorage.key(i);
  const value2 = localStorage.getItem(key4);

  if(Number(key4) > 100000){
  const value3 = JSON.parse(value2);
  console.log(value3);
  
  
      const hhh =`
      <div data-key=${key4} class="eachItemCover">
        <div class="eachItem1">${value3[0]}</div>
        <div class="eachItem2">${value3[1]}</div>
        <div class="eachItem3">${value3[3]}</div>
        <div class="eachItem4">${value3[4]}</div>
        <div class="eachItem5">${value3[5]}</div>
        <div class="eachDelete"><i class="fas fa-times"></i></div>
      </div>
      `;

      $("#memoAppear").append(hhh);

    };

};

  //  個別削除のボタンを設置
  $(".eachDelete").on("click", function(){
    const xkey = $(this).parent().data().key;

    localStorage.removeItem(xkey);
    $(this).parent().empty();

  })



  