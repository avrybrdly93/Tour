/*
 |  tail.DateTime - A pure, vanilla JavaScript DateTime Picker
 |  @file       ./langs/tail.datetime-ru.js
 |  @author     SamBrishes <https://github.com/pytesNET/tail.DateTime/>
 |  @version    0.4.0 - Alpha
 |
 |  @fork       MrGuiseppe <https://github.com/MrGuiseppe/pureJSCalendar/>
 |              This script started as fork and is now completely independent!
 |
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2018 - SamBrishes, pytesNET <pytes@gmx.net>
 */
;(function(factory){
   if(typeof(define) == "function" && define.amd){
       define(function(){
           return function(datetime){ factory(datetime); };
       });
   } else {
       if(typeof(window.tail) != "undefined" && window.tail.DateTime){
           factory(window.tail.DateTime);
       }
   }
}(function(datetime){
    datetime.strings.register("ru", {
        months: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
        days:   ["воскресенье", "понедельник", "вторник", "среда","четверг","пятница","суббота",],
        shorts: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
        time:   ["часов", "минут", "секунд"],
        header: ["Выберите месяц", "Выберите год", "Выберите Десятилетие", "Выберите время"]
    });
    return datetime;
}));
