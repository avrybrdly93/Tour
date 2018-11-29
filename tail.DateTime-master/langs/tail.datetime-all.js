/*
 |  tail.DateTime - A pure, vanilla JavaScript DateTime Picker
 |  @file       ./langs/tail.datetime-all.js
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
    datetime.strings.register("de", {
        months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        days:   ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        shorts: ["SO", "MO", "DI", "MI", "DO", "FR", "SA"],
        time:   ["Stunden", "Minuten", "Sekunden"],
        header: ["Wähle einen Monat", "Wähle ein Jahr", "Wähle ein Jahrzehnt", "Wähle eine Uhrzeit"]
    });
    datetime.strings.register("de_AT", {
        months: ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        days:   ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        shorts: ["SO", "MO", "DI", "MI", "DO", "FR", "SA"],
        time:   ["Stunden", "Minuten", "Sekunden"],
        header: ["Wähle einen Monat", "Wähle ein Jahr", "Wähle ein Jahrzehnt", "Wähle eine Uhrzeit"]
    });
    datetime.strings.register("es", {
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        days:   ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        shorts: ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"],
        time:   ["Horas", "Minutos", "Segundos"],
        header: ["Selecciona un mes", "Seleccione un año", "Seleccione un década", "Seleccione una hora"]
    });
    datetime.strings.register("ru", {
        months: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
        days:   ["воскресенье", "понедельник", "вторник", "среда","четверг","пятница","суббота",],
        shorts: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
        time:   ["часов", "минут", "секунд"],
        header: ["Выберите месяц", "Выберите год", "Выберите Десятилетие", "Выберите время"]
    });
    return datetime;
}));
