angular.module('app.controllers', ['ionic']);

function validation($ionicPopup, txt, data, rule){
    var str = '';
    var err = 0;

    console.log(rule);

    if(data === undefined) {
        err = 1;
        str = txt + ' tidak boleh kosong';
    }
    else if(rule == 'number' && /^[0-9]+$/.test(data) == false){
        str = txt + ' harus berupa angka';
        err = 1;
    }
    else if(rule == 'string' && /[<>'";]/.test(data) == true){
        str = txt + ' mengandung karakter yang tidak diijinkan';
        err = 1;
    }
    else if(rule == 'string_city' && /[<>'";]/.test(data) == false && data == "no city"){
        str = txt + ' Tidak Ditemukan';
        err = 1;
    }
    else if(rule == 'float' && /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/.test(data) == false) {
        str = txt + ' bukan angka desimal (dengan pemisah titik)';
        err = 1;
    }
    else if(rule == 'date' && isValidDate(data) == false) {
        str = txt + ' harus berupa tanggal (YYYY-MM-DD)';
        err = 1;
    }
    else if(rule == 'email' && validateEmail(data) == false) {
        str = txt + ' bukan email yang benar';
        err = 1;
    }

    if(err == 1) {
        var alertPopup = $ionicPopup.alert({
            title    : 'Data belum valid!',
            template : str
        });
        return false;
    }

    return true;
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function isValidDate(date) {
    var matches         = /^(\d{4})[-\/](\d{2})[-\/](\d{2})$/.exec(date);
    if (matches == null) return false;
    var d               = matches[3];
    var m               = matches[1] - 1;
    var y               = matches[2];
    var composedDate    = new Date(y, m, d);
    return  composedDate.getDate()     == d &&
            composedDate.getMonth()    == m &&
            composedDate.getFullYear() == y;
}

function nl2br(txt){
  var val = txt.replace(/\n/g, "<br />");
  return val;
}

function evacuation(type){
    console.log('aaa : '+type);
    window.location = "#/app/evacuation/"+ type;


}