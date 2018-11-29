/*
 |  tail.DateTime - A pure, vanilla JavaScript DateTime Picker
 |  @file       ./langs/tail.datetime-de_AT.js
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
    datetime.strings.register("de_AT", {
        months: ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        days:   ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        shorts: ["SO", "MO", "DI", "MI", "DO", "FR", "SA"],
        time:   ["Stunden", "Minuten", "Sekunden"],
        header: ["Wähle einen Monat", "Wähle ein Jahr", "Wähle ein Jahrzehnt", "Wähle eine Uhrzeit"]
    });
    return datetime;
}));
