function ktngaythang(input){ //ktra ngay thang dung chua format dd/mm/yyyy
	var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((1[6-9]|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;	
	if(!(regex.test(input)))
    {
        return false;
    }
	else
	{
    	return true;
	}
}
function IsNumeric(sText) //ham kiem tra truong nhap vao co fai la 1 so ko
{
   var ValidChars = "0123456789";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
}
// tai cau truc
function check_date(input_id){
  //TODO: ktra co phai la ngay thang dd/mm/yyyy khong
  //input_id = '#id'
  input = $(input_id).val().trim();
  if (input === '')
    return false;

  var validformat=/^\d{1,2}\/\d{1,2}\/\d{4}$/; //Basic check for format validity
  if (!validformat.test(input))
    return false;
  else { //ktra ngày có tồn tại hay ko
    var dayfield=input.split("/")[0];
    var monthfield=input.split("/")[1];
    var yearfield=input.split("/")[2];
    var dayobj = new Date(yearfield, Number(monthfield)-1, dayfield); //tháng bắt đầu từ 0
    if (dayobj.getMonth()+1==Number(monthfield) && dayobj.getDate()==Number(dayfield) && dayobj.getFullYear()==yearfield)
      return true;
    else
      return false;
  }
}
function str_to_date(input)
{
  //TODO: convert string to date
  //input_id= '#id'
  //nếu = '' thì trả về ''
  if (input === '')
    return '';

  var validformat=/^\d{1,2}\/\d{1,2}\/\d{4}$/; //Basic check for format validity
  if (!validformat.test(input))
    return '';
  else { //ktra ngày có tồn tại hay ko
    var dayfield=input.split("/")[0];
    var monthfield=input.split("/")[1];
    var yearfield=input.split("/")[2];
    var dayobj = new Date(yearfield, Number(monthfield)-1, dayfield); //tháng bắt đầu từ 0
    if (dayobj.getMonth()+1==Number(monthfield) && dayobj.getDate()==Number(dayfield) && dayobj.getFullYear()==yearfield)
      return dayobj;
    else
      return '';
  }
}
function have_to_fill_date(input_id,mess)
{
  //TODO: kiểm tra có đúng định dạng ngày tháng hay ko và bắt buộc phải nhập
  //input_id = '#id'
  //mess = 'thông báo nếu nhập sai'
  if (!check_date(input_id)){
    alert(mess);
    $(input_id).focus();
    return false;
  }
  return true;
}
function auto_fill_date(input_id){
  //TODO: tra ve dd/mm/yyyy. VD 30.11.2018 hoac 30-11-2018 hoac 30112018 tra ve 30/11/2018
  //input_id = '#id'
  str = $(input_id).val().trim();
  if (str===''){
    $(input_id).css('background-color','');
    return;
  }

  var validformat = /\.|\-|\//gi;
  var new_str = str.replace(validformat,'/'); //ky tu '-' hoac '.' thay the bang '/'
  var new_str2 = str.replace(validformat,'');
  var len_new_str2 = new_str2.length;
  if (len_new_str2 !== 8 && len_new_str2 !== 6 && len_new_str2 !== 7){
    $(input_id).css('background-color','#ff9999');
    return;
  }
  else{
    var nam = "20"+new_str2.substring(4,len_new_str2);
    $(input_id).val(new_str2.substring(0,2)+"/"+new_str2.substring(2,4)+"/"+nam.substring(nam.length-4, nam.length));
    if (!check_date(input_id))
      $(input_id).css('background-color','#ff9999');
    else
      $(input_id).css('background-color','');
    return;
  }
}
function date_greater_or_equal_date(input_id1,input_id2,mess)
{
  //TODO: so sánh ngày 1 > ngày 2
  //return true if input1 >= input2
  input1 = $(input_id1).val().trim();
  input2 = $(input_id2).val().trim();
  if (input1==='')
    input1='31/12/3000';
  if (input2==='')
    input2='31/12/3000';

  if (str_to_date(input1) >= str_to_date(input2))
    return true;
  else {
    alert(mess);
    $(input_id1).focus();
    return false;
  }
}
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function timestamp_2_date(timestamp)
{
  if (timestamp.toString().trim() == '')
    return '';
  var d = new Date(timestamp*1000);
  var ngay = d.getDate();
  var thang = d.getMonth() + 1;
  var nam = d.getFullYear();
  var gio = d.getHours();
  var phut = d.getMinutes();
  var giay = d.getSeconds();
  return (ngay + '/' + thang + '/' + nam + ' ' + gio + ':' + phut + ':' + giay);
}
function parse_url(url) {
  var a =  document.createElement('a');
  a.href = url;
  return {
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function(){
      var ret = {},
      seg = a.search.replace(/^\?/,'').split('&'),
      len = seg.length, i = 0, s;
      for (;i<len;i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=');
        if (ret.hasOwnProperty(s[0]))
          ret[s[0]] += ','+s[1];
        else
          ret[s[0]] = s[1];
      }
      return ret;
    })(),
    hash: a.hash.replace('#','')
  };
}