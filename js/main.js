(function(){
    //按需引入
    AMap.plugin(['AMap.CitySearch', 'AMap.Weather'], function () {
        var citySearch = new AMap.CitySearch()
        //自动获取用户IP，返回当前城市
        citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city) {
                    // console.log(result);
                    getCityWeather(result.city);
                }
            } else {
                console.log(result.info);
            }
        });

        function getCityWeather(city) {
            var weather = new AMap.Weather();
            //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
            weather.getLive(city, function (err, data) {
                if (!err) {
                    // console.log(data);
                    showCityWeather(data);
                }
            });
            weather.getForecast(city, function (err, data) {
                if (err) {
                    return;
                }
                // console.log(data);
                // var str = [];
                // for (var i = 0, dayWeather; i < data.forecasts.length; i++) {
                //   dayWeather = data.forecasts[i];
                //   str.push(dayWeather.date + ' <span class="weather">' + dayWeather.dayWeather + '</span> ' + dayWeather
                //     .nightTemp +
                //     '~' + dayWeather.dayTemp + '℃');
                // }
                // document.getElementById('forecast').innerHTML = str.join('<br>');
            });
        }

        function showCityWeather(data) {
            // var [city,temp,weather,windDir] = [data.city,data.temperature,data.weather,data.windDirection];
            // console.log([city,temp,weather,windDir]);
            var location = document.getElementsByClassName('location')[0],
                temp = document.getElementsByClassName('temp')[0],
                weather = document.getElementsByClassName('weather')[0],
                windDir = document.getElementsByClassName('windDir')[0];
            location.innerText = data.city;
            temp.innerText = data.temperature + '°';
            weather.innerText = data.weather;
            windDir.innerText = data.windDirection + '风';
            console.log('showCityWeather');
        }
    });
    //显示时间
    var timeBox = document.getElementsByClassName('time-box')[0];
    var container = document.getElementsByClassName('container')[0];

    function showTime() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = "00" + date.getHours();
        hour = hour.substr(hour.length - 2);
        var minute = "00" + date.getMinutes();
        minute = minute.substr(minute.length - 2);
        var second = "00" + date.getSeconds();
        second = second.substr(second.length - 2);
        var week = date.getDay();
        switch (week) {
            case 1:
                week = "星期一";
                break;
            case 2:
                week = "星期二";
                break;
            case 3:
                week = "星期三";
                break;
            case 4:
                week = "星期四";
                break;
            case 5:
                week = "星期五";
                break;
            case 6:
                week = "星期六";
                break;
            case 0:
                week = "星期日";
                break;
            default:
                week = "";
                break;
        }
        var str = year + "年" + month + "月" + day + "日" + " " +
            week + " " + hour + ":" + minute;
        //显示时间在time-box元素上
        timeBox.innerText = str;
        //根据时间hour调整背景
        var bgImgUrl;
        if (hour >= 6 && hour < 10) {
            bgImgUrl = "url('./img/morning.png')"
            // console.log('早');
        } else if (hour >= 10 && hour < 18) {
            bgImgUrl = "url('./img/noon.png')"
            // console.log('午');
        } else {
            bgImgUrl = "url('./img/night.png')";
            // console.log('晚');
        }
        container.style.backgroundImage = bgImgUrl;
        container.style.backgroundSize = '100% 100%';
        // console.log(str);
        console.log('showTime');
        return showTime;
    }
    setInterval(showTime(), 30000);

})();
