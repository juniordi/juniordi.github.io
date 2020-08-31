// Author: Abhishek Dutta, 12 June 2020
// License: CC0 (https://creativecommons.org/choose/zero/)
function uuid() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf('/') + 1); // remove prefix (e.g. blob:null/, blob:www.test.com/, ...)
}
function milliseconds2date(num){
    var x = new Date(num)
    return x.getDate() + "/" + (x.getMonth()+1) + "/" + x.getFullYear()
}
function number_format(str){ //number_format(1000) => 1.000
    str = str.toString()
    if (str.trim() === "") return ""
    var str_to_array = str.split("")
    var array_len = str_to_array.length
    var kq = ""
    var j = 1
    for (var i = array_len-1; i>=0; i--){
        var add_dot = (j%3 === 0 && i !== 0)?".":""
        kq = kq + str_to_array[i] + add_dot
        j++
    }

    str_to_array = kq.split("")
    kq = ""
    array_len = str_to_array.length
    for (var i = array_len-1; i>=0; i--){
        kq = kq + str_to_array[i]
    }

    return kq
}
function tinh_phat(tu_ngay_tmp, den_ngay_tmp, so_tien, type_check){
    //str = tính phạt chậm nộp 15.000.000 từ ngày 01/01/2016 đến 31/12/2016
    //type_check = 0 - chậm nộp tiền phạt; 1 - chậm nộp nợ thuế
    var day_field
    var month_field
    var year_field

    var tu_ngay
    var den_ngay

    var kq = []
    //input: tu_ngay_tmp
    day_field = tu_ngay_tmp.split("/")[0]
    month_field = tu_ngay_tmp.split("/")[1]
    year_field = tu_ngay_tmp.split("/")[2]
    tu_ngay = new Date(year_field, Number(month_field)-1, day_field)
    if (tu_ngay.getMonth()+1 != Number(month_field) || tu_ngay.getDate() != day_field || tu_ngay.getFullYear() != year_field) return ["Bạn xác định sai ngày bắt đầu tính phạt. Ví dụ cách nhập: tính phạt chậm nộp 15.000.000 từ ngày 01/01/2016 đến 30/6/2016"]
    //input: den_ngay_tmp
    day_field = den_ngay_tmp.split("/")[0]
    month_field = den_ngay_tmp.split("/")[1]
    year_field = den_ngay_tmp.split("/")[2]
    den_ngay = new Date(year_field, Number(month_field)-1, day_field)
    if (den_ngay.getMonth()+1 != Number(month_field) || den_ngay.getDate()!=day_field || den_ngay.getFullYear()!=year_field) return ["Bạn xác định sai ngày kết thúc tính phạt. Ví dụ cách nhập: tính phạt chậm nộp 15.000.000 từ ngày 01/01/2016 đến 30/6/2016"]

    //input: so_tien co gia tri hop le
    var minutes = 1000 * 60
    var hours = minutes * 60
    var days = hours * 24

    var tu_ngay_parse = Date.parse(tu_ngay)
    var den_ngay_parse = Date.parse(den_ngay)

    var so_ngay_tinh_phat = Math.round(den_ngay_parse/days) - Math.round(tu_ngay_parse/days) + 1
    if (so_ngay_tinh_phat < 1) return ["Số ngày tính phạt của bạn có vấn đề: ngày kết thúc tính phạt phải hơn ngày bắt đầu tính. Ví dụ cách nhập: tính phạt chậm nộp 15.000.000 từ ngày 01/01/2016 đến 30/6/2016"]

    var ty_le_003 = 0.0003

    /*bat dau tinh phat chi tiet */
    var ty_le_005 = 0.0005
    var ty_le_007 = 0.0007

    var nam_2013 = new Date(2013, 5, 30) //Từ hạn nộp đến 30/6/2013: Tính theo tỷ lệ 0,05% (quy định của Luật số 78/2006/QH11)
    var nam_2014 = new Date(2014, 11, 31) //Từ ngày 1/7/2013 đến 31/12/2014: Khoản nợ <90 ngày tính theo tỷ lệ 0,05%; Khoản nợ >=90 ngày tính theo tỷ lệ 0,07% (quy định của Luật số 21/2012/QH13)
    var nam_2016 = new Date(2016, 5, 30) //Từ ngày 1/1/2015 - 30/6/2016: Tính theo tỷ lệ 0,05% (quy định của Luật số 71/2014/QH13). Từ ngày 1/7/2016: Tính theo tỷ lệ 0.03% (quy định của Luật số 106/2016/QH13)
    
    var nam_2013_convert = Math.round(Date.parse(nam_2013)/days) //30/6/2013
    var nam_2014_convert = Math.round(Date.parse(nam_2014)/days) //31/12/2014
    var nam_2016_convert = Math.round(Date.parse(nam_2016)/days) //30/6/2016

    var tu_ngay_convert = Math.round(tu_ngay_parse/days)
    var den_ngay_convert = Math.round(den_ngay_parse/days)

    //dien giai chi tiet
    dg1 = "Từ hạn nộp đến 30/6/2013: Tính theo tỷ lệ 0,05% (Quy định của Luật số 78/2006/QH11)";
    dg2 = "Từ ngày 1/7/2013 đến 31/12/2014: tỷ lệ 0,05% kể từ ngày hết thời hạn nộp thuế đến ngày thứ 90; 0,07% kể từ ngày chậm nộp thứ 91 trở đi (Quy định của Luật số 21/2012/QH13)";
    dg3 = "Từ ngày 1/1/2015 - 30/6/2016: Tính theo tỷ lệ 0,05% (Quy định của Luật số 71/2014/QH13)";
    dg4 =  "Từ ngày 1/7/2016: Tính theo tỷ lệ 0.03% (Quy định của Luật số 106/2016/QH13)";

    dg_phat_tien_phat = 'Theo Thông tư 166/2013/TT-BTC, tiền chậm nộp tiền phạt tính theo mức 0,05%/ngày'
    //var tmp_so_ngay
    var tmp_so_tien_phat

    kq = [] //reset array kq
    dg = [] //dien giai
    //patt = /(nộp chậm tiền phạt|chậm nộp tiền phạt)/ //pattern phát hiện tính phạt tiền thuế hay tiền phạt tiền phạt
    if (type_check === 0) { //nếu tính phạt tiền phạt
        tmp_so_tien_phat = Number(so_tien) * (den_ngay_convert - tu_ngay_convert + 1) * ty_le_005
        dg.push(dg_phat_tien_phat)
        kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round(tmp_so_tien_phat)))
    } else if (type_check === 1) { //tính phạt tiền nợ
        //chia thanh cac giai doan thoi gian [ ;30/6/2013] [1/7/2013; 31/12/2014] [1/1/2015; 30/6/2016] [1/7/2016; ]
        if (tu_ngay_convert > nam_2016_convert) { //Nếu A >= 01/7/2016 --> B >= 01/7/2016: 0.03%
            tmp_so_tien_phat = Number(so_tien) * (den_ngay_convert - tu_ngay_convert + 1) * ty_le_003
            kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - tu_ngay_convert + 1) + "x0,03% = " + number_format(Math.round(tmp_so_tien_phat)))
            dg.push(dg4)
        } else if (nam_2014_convert+1 <= tu_ngay_convert && tu_ngay_convert <= nam_2016_convert) { //Neu 01/01/2015 <= A <= 30/6/2016
            if (den_ngay_convert >= nam_2016_convert+1) { //Nếu B >= 01/7/2016
                //tmp = (nam_2016_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005
                tmp_so_tien_phat = (nam_2016_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005 + (den_ngay_convert - (nam_2016_convert+1) + 1) * Number(so_tien) * ty_le_003 //tu ngay - 30/6/2016:0.05%, 1/7/2016 - den ngay: 0.03%
                kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(nam_2016_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2016_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round((nam_2016_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005)))
                dg.push(dg3)
                kq.push(milliseconds2date((nam_2016_convert+1)*days) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - (nam_2016_convert+1) + 1) + "x0,03% = " + number_format(Math.round((den_ngay_convert - (nam_2016_convert+1) + 1) * Number(so_tien) * ty_le_003)))
                dg.push(dg4)
            } else { //B nam cung giai doan voi A --> B - A + 1
                tmp_so_tien_phat = (den_ngay_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005
                kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round(tmp_so_tien_phat)))
                dg.push(dg3)
            }

        } else if (nam_2013_convert+1 <= tu_ngay_convert && tu_ngay_convert <= nam_2014_convert) { //Neu 1/7/2013 <= A <= 31/12/2014
            if (nam_2013_convert+1 <= den_ngay_convert && den_ngay_convert <= nam_2014_convert) { //neu B nam cung giai doan voi A
                if (den_ngay_convert - tu_ngay_convert + 1 <= 90) { //neu <= 90 ngay
                    tmp_so_tien_phat = (den_ngay_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005 //B - A + 1
                    kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round(tmp_so_tien_phat)))
                    dg.push(dg2)
                } else {
                    tmp_so_tien_phat = 90 * Number(so_tien) * ty_le_005 + (den_ngay_convert - tu_ngay_convert - 90 + 1) * Number(so_tien) * ty_le_007 //tu ngay - 90:0.05%, tu ngay 91 - den ngay: 0.07%
                    kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date((tu_ngay_convert+89)*days) + ":" + number_format(so_tien) + "x90x0,05% = " + number_format(Math.round(90 * Number(so_tien) * ty_le_005)))
                    dg.push(dg2)
                    kq.push(milliseconds2date((tu_ngay_convert+90)*days) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - tu_ngay_convert - 90 + 1) + "x0,07% = " + number_format(Math.round((den_ngay_convert - tu_ngay_convert - 90 + 1) * Number(so_tien) * ty_le_007)))
                    dg.push(dg2)
                }
            } else if (nam_2014_convert+1 <= den_ngay_convert && den_ngay_convert <= nam_2016_convert) { //neu 1/1/2015 <= B <= 30/6/2016
                if (nam_2014_convert - tu_ngay_convert + 1 <= 90) { //neu <= 90 ngay
                    tmp_so_tien_phat = (den_ngay_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005 //B-A+1
                    kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round(tmp_so_tien_phat)))
                    dg.push(dg2)
                } else {
                    tmp_so_tien_phat = 90 * Number(so_tien) * ty_le_005 + (nam_2014_convert - tu_ngay_convert - 90 + 1) * Number(so_tien) * ty_le_007 + (den_ngay_convert - (nam_2014_convert+1) + 1) * Number(so_tien) * ty_le_005 //90 ngay dau: 0.05%, tu ngay 91 - 31/12/2014: 0.07%, 1/1/2015 - den ngay: 0.05%
                    kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date((tu_ngay_convert+89)*days) + ":" + number_format(so_tien) + "x90x0,05% = " + number_format(Math.round(90 * Number(so_tien) * ty_le_005)))
                    dg.push(dg2)
                    kq.push(milliseconds2date((tu_ngay_convert+90)*days) + "-" + milliseconds2date(nam_2014_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2014_convert - tu_ngay_convert - 90 + 1) + "x0,07% = " + number_format(Math.round((nam_2014_convert - tu_ngay_convert - 90 + 1) * Number(so_tien) * ty_le_007)))
                    dg.push(dg2)
                    kq.push(milliseconds2date((nam_2014_convert+1)*days) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - (nam_2014_convert+1) + 1) + "x0,05% = " + number_format(Math.round((den_ngay_convert - (nam_2014_convert+1) + 1) * Number(so_tien) * ty_le_005)))
                    dg.push(dg3)
                }
            } else if (den_ngay_convert > nam_2016_convert) { //neu B >= 1/7/2016
                if (nam_2014_convert - tu_ngay_convert + 1 <= 90) { //neu <= 90 ngay
                    tmp_so_tien_phat = (nam_2016_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005 + (den_ngay_convert - (nam_2016_convert+1) + 1) * Number(so_tien) * ty_le_003 //tu ngay - 30/6/2016: 0.05%, 1/7/2016 - den ngay: 0.03%
                    kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(nam_2016_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2016_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round((nam_2016_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005)))
                    dg.push(dg2 + '; '+dg3)
                    kq.push(milliseconds2date((nam_2016_convert+1)*days) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - (nam_2016_convert+1) + 1) + "x0,03% = " + number_format(Math.round((den_ngay_convert - (nam_2016_convert+1) + 1) * Number(so_tien) * ty_le_003)))
                    dg.push(dg4)
                } else {
                    tmp_so_tien_phat = 90 * Number(so_tien) * ty_le_005 + (nam_2014_convert - tu_ngay_convert - 90 + 1) * Number(so_tien) * ty_le_007 + (nam_2016_convert - (nam_2014_convert+1) + 1) * Number(so_tien) * ty_le_005 + (den_ngay_convert - (nam_2016_convert+1) + 1) * Number(so_tien) * ty_le_003 //90 ngay dau: 0.05%, tu ngay 91 - 31/12/2014: 0.07%, 1/1/2015 - 30/6/2016: 0.05%, 1/7/2016 - den ngay: 0.03%
                    kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date((tu_ngay_convert+89)*days) + ":" + number_format(so_tien) + "x90x0,05% = " + number_format(Math.round(90 * Number(so_tien) * ty_le_005)))
                    dg.push(dg2)
                    kq.push(milliseconds2date((tu_ngay_convert+90)*days) + "-" + milliseconds2date(nam_2014_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2014_convert - tu_ngay_convert - 90 + 1) + "x0,07% = " + number_format(Math.round((nam_2014_convert - tu_ngay_convert - 90 + 1) * Number(so_tien) * ty_le_007)))
                    dg.push(dg2)
                    kq.push(milliseconds2date((nam_2014_convert+1)*days) + "-" + milliseconds2date(nam_2016_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2016_convert - (nam_2014_convert+1) + 1) + "x0,05% = " + number_format(Math.round((nam_2016_convert - (nam_2014_convert+1) + 1) * Number(so_tien) * ty_le_005)))
                    dg.push(dg3)
                    kq.push(milliseconds2date((nam_2016_convert+1)*days) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - (nam_2016_convert+1) + 1) + "x0,03% = " + number_format(Math.round((den_ngay_convert - (nam_2016_convert+1) + 1) * Number(so_tien) * ty_le_003)))
                    dg.push(dg4)
                }
            }
        } else if (tu_ngay_convert <= nam_2013_convert) {//neu A <= 30/6/2013
            if (den_ngay_convert <= nam_2013_convert) {//neu B nam cung giai doan voi A: 0.05%
                tmp_so_tien_phat = (den_ngay_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005
                kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round(tmp_so_tien_phat)))
                dg.push(dg1)
            } else if (nam_2013_convert+1 <= den_ngay_convert && den_ngay_convert <= nam_2014_convert) { //neu 1/7/2013 <= B <= 31/12/2014: co tinh 0.05 va 0.07
                //tmp_so_tien_phat = (nam_2013_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005 + 
                if ((nam_2013_convert+1) + 90 >= den_ngay_convert) { //neu <= 90 ngay
                    tmp_so_tien_phat = (den_ngay_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005 //tat ca deu la 0.05% 
                    kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round(tmp_so_tien_phat)))
                    dg.push(dg1+'; '+dg2)
                } else {
                    tmp_so_tien_phat = (nam_2013_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005 + 90 * Number(so_tien) * ty_le_005 + (den_ngay_convert - (nam_2013_convert+1) -90 + 1) * Number(so_tien) * ty_le_007 //tu ngay - 30/6/2013: 0.05%, 1/7/2013 - 90 ngay: 0.05%, tu ngay 91 - den ngay: 0.07%
                    kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(nam_2013_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2013_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round((nam_2013_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005))) //tu ngay - 30/6/2013: 0.05%
                    dg.push(dg1+'; '+dg2)
                    kq.push(milliseconds2date((nam_2013_convert+1)*days) + "-" + milliseconds2date((nam_2013_convert+90)*days) + ":" + number_format(so_tien) + "x90x0,05% = " + number_format(Math.round(90 * Number(so_tien) * ty_le_005))) //1/7/2013 - 90 ngay: 0.05%
                    dg.push(dg2)
                    kq.push(milliseconds2date((nam_2013_convert+91)*days) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - (nam_2013_convert+1) -90 + 1) + "x0,07% = " + number_format(Math.round((den_ngay_convert - (nam_2013_convert+1) -90 + 1) * Number(so_tien) * ty_le_007))) //tu ngay 91 - den ngay: 0.07%
                    dg.push(dg2)
                }
            } else if (nam_2014_convert+1 <= den_ngay_convert && den_ngay_convert <= nam_2016_convert) { //neu 1/1/2015 <= B <= 30/6/2016
                tmp_so_tien_phat = (nam_2013_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005 + 90 * Number(so_tien) * ty_le_005 + (nam_2014_convert - (nam_2013_convert+1) - 90 + 1) * Number(so_tien) * ty_le_007 + (den_ngay_convert - (nam_2014_convert+1) + 1) * Number(so_tien) * ty_le_005 //tu ngay - 30/6/2013: 0.05%, 1/7/2013 - 90 ngay: 0.05%, 91 ngay - 31/12/2014: 0.07%, 1/1/2015 - den ngay: 0.05%
                kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(nam_2013_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2013_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round((nam_2013_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005))) //tu ngay - 30/6/2013: 0.05%
                dg.push(dg1)
                kq.push(milliseconds2date((nam_2013_convert+1)*days) + "-" + milliseconds2date((nam_2013_convert+90)*days) + ":" + number_format(so_tien) + "x90x0,05% = " + number_format(90 * Number(so_tien) * ty_le_005)) //1/7/2013 - 90 ngay: 0.05%
                dg.push(dg2)
                kq.push(milliseconds2date((nam_2013_convert+91)*days) + "-" + milliseconds2date(nam_2014_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2014_convert - (nam_2013_convert+1) - 90 + 1) + "x0,07% = " + number_format(Math.round((nam_2014_convert - (nam_2013_convert+1) - 90 + 1) * Number(so_tien) * ty_le_007))) //91 ngay - 31/12/2014: 0.07%
                dg.push(dg2)
                kq.push(milliseconds2date((nam_2014_convert+1)*days) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - (nam_2014_convert+1) + 1) + "x0,05% = " + number_format(Math.round((den_ngay_convert - (nam_2014_convert+1) + 1) * Number(so_tien) * ty_le_005))) //1/1/2015 - den ngay: 0.05%
                dg.push(dg3)
            } else if (den_ngay_convert > nam_2016_convert) {//neu B >= 1/7/2016
                tmp_so_tien_phat = (nam_2013_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005 + 90 * Number(so_tien) * ty_le_005 + (nam_2014_convert - (nam_2013_convert+1) - 90 + 1) * Number(so_tien) * ty_le_007 + (nam_2016_convert - (nam_2014_convert+1) + 1) * Number(so_tien) * ty_le_005 + (den_ngay_convert - (nam_2016_convert+1) + 1) * Number(so_tien) * ty_le_003 //tu ngay - 30/6/2013: 0.05%, 1/7/2013 - 90 ngay: 0.05%, 91 ngay - 31/12/2014: 0.07%, 1/1/2015 - 30/6/2016: 0.05%, 1/7/2016 - den ngay: 0.03%
                kq.push(milliseconds2date(tu_ngay_parse) + "-" + milliseconds2date(nam_2013_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2013_convert - tu_ngay_convert + 1) + "x0,05% = " + number_format(Math.round((nam_2013_convert - tu_ngay_convert + 1) * Number(so_tien) * ty_le_005))) //tu ngay - 30/6/2013: 0.05%
                dg.push(dg1)
                kq.push(milliseconds2date((nam_2013_convert+1)*days) + "-" + milliseconds2date((nam_2013_convert+90)*days) + ":" + number_format(so_tien) + "x90x0,05% = " + number_format(Math.round(90 * Number(so_tien) * ty_le_005))) //1/7/2013 - 90 ngay: 0.05%
                dg.push(dg2)
                kq.push(milliseconds2date((nam_2013_convert+91)*days) + "-" + milliseconds2date(nam_2014_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2014_convert - (nam_2013_convert+1) - 90 + 1) + "x0,07% = " + number_format(Math.round((nam_2014_convert - (nam_2013_convert+1) - 90 + 1) * Number(so_tien) * ty_le_007))) //91 ngay - 31/12/2014: 0.07%
                dg.push(dg2)
                kq.push(milliseconds2date((nam_2014_convert+1)*days) + "-" + milliseconds2date(nam_2016_convert*days) + ":" + number_format(so_tien) + "x" + (nam_2016_convert - (nam_2014_convert+1) + 1) + "x0,05% = " + number_format(Math.round((nam_2016_convert - (nam_2014_convert+1) + 1) * Number(so_tien) * ty_le_005))) //1/1/2015 - 30/6/2016: 0.05%
                dg.push(dg3)
                kq.push(milliseconds2date((nam_2016_convert+1)*days) + "-" + milliseconds2date(den_ngay_parse) + ":" + number_format(so_tien) + "x" + (den_ngay_convert - (nam_2016_convert+1) + 1) + "x0,03% = " + number_format(Math.round((den_ngay_convert - (nam_2016_convert+1) + 1) * Number(so_tien) * ty_le_003))) //1/7/2016 - den ngay: 0.03%
                dg.push(dg4)

            }
        }
    }
    kq.push("TỔNG TIỀN PHẠT NỘP CHẬM: " + number_format(Math.round(tmp_so_tien_phat)))
    dg.push('');

    return {'kq':kq, 'dg':dg};

    /*ket thuc tinh phat chi tiet*/
}
function view_data_history()
{
    if (typeof(Storage) !== "undefined"){
        inner_history = document.getElementById('history');
        if (inner_history.innerHTML == ''){
            html = '<div style="text-align:right;"><a href="javascript:void(0)" onclick="delete_all_history()">Xóa tất cả</a></div>';
            for(var i=localStorage.length-1; i>=0; i--) {
                var key = localStorage.key(i);
                //console.log(`${key}: ${localStorage.getItem(key)}`);
                result = JSON.parse(localStorage.getItem(key))
                html += `<div id="${key}"><div class="d-flex justify-content-between font-very-small"><div><span class="ngay-tra-cuu">${milliseconds2date(result.tgian)} </span>${result.input}</div><div><a href="javascript:void(0)" onclick="delete_history('${key}')">Xóa</a></div></div>`;
                html += '<table class="table table-striped table-hover table-sm table-responsive-sm font-very-small"><thead><tr><th scope="col">Chi tiết</th><th scope="col">Diễn giải</th></tr></thead><tbody>';
                for (var j=0; j<result.kq.length; j++){
                    html += `<tr><td>${result.kq[j]}</td><td>${result.dg[j]}</td></tr>`;
                }
                html += '</tbody></table></div>';
            }
            inner_history.innerHTML = html;
            document.getElementById('link-view-history').classList.remove("plus");
            document.getElementById('link-view-history').classList.add("minus");
        } else{
            inner_history.innerHTML = '';
            document.getElementById('link-view-history').classList.remove("minus");
            document.getElementById('link-view-history').classList.add("plus");
        }
    }
}
function delete_history(item)
{
    window.localStorage.removeItem(item);
    document.getElementById(item).style.display = "none";
    if (localStorage.length === 0){
        document.getElementById('link-history').style.display = "none";
    }
}
function delete_all_history()
{
    cf = confirm('Bạn có chắn chắn muốn xóa tất cả lịch sử tra cứu của mình không?');
    if (cf){
        window.localStorage.clear();
        document.getElementById('history').innerHTML = '';
        document.getElementById('link-history').style.display = "none";
    }
}