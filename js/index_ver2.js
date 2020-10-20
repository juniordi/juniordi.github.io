function uuid(){var e=URL.createObjectURL(new Blob),t=e.toString();return URL.revokeObjectURL(e),t.substr(t.lastIndexOf("/")+1)}function milliseconds2date(e){var t=new Date(e);return t.getDate()+"/"+(t.getMonth()+1)+"/"+t.getFullYear()}function number_format(e){if(""===(e=e.toString()).trim())return"";for(var t=e.split(""),n=t.length,r="",d=1,i=n-1;i>=0;i--){var a=d%3==0&&0!==i?".":"";r=r+t[i]+a,d++}t=r.split(""),r="";for(i=(n=t.length)-1;i>=0;i--)r+=t[i];return r}function den_ngay_law38(e,t){day_field=e.split("/")[0],month_field=e.split("/")[1],year_field=e.split("/")[2],den_ngay=new Date(year_field,Number(month_field)-1,day_field);var n=Date.parse(den_ngay),r=Math.round(n/864e5),d=new Date(2016,5,30),i=new Date(2020,5,30),a=Math.round(Date.parse(d)/864e5),s=Math.round(Date.parse(i)/864e5),m="Từ ngày 1/7/2016: Tính theo tỷ lệ 0.03% (Quy định của Luật số 106/2016/QH13)",u={cach_tinh:[],dien_giai:[]};return r<=s?(u.tong_tien=Number(t)*(r-(a+1)+1)*3e-4,u.cach_tinh.push(milliseconds2date(864e5*(a+1))+"-"+milliseconds2date(n)+":"+number_format(t)+"x"+(r-(a+1)+1)+"x0,03% = "+number_format(Math.round(Number(t)*(r-(a+1)+1)*3e-4))),u.dien_giai.push(m)):(u.tong_tien=(s-(a+1)+1+r-(s+1))*Number(t)*3e-4,u.cach_tinh.push(milliseconds2date(864e5*(a+1))+"-"+milliseconds2date(864e5*s)+":"+number_format(t)+"x"+(s-(a+1)+1)+"x0,03% = "+number_format(Math.round(Number(t)*(s-(a+1)+1)*3e-4))),u.dien_giai.push(m),u.cach_tinh.push(milliseconds2date(864e5*(s+1))+"-"+milliseconds2date(n)+":"+number_format(t)+"x"+(r-(s+1))+"x0,03% = "+number_format(Math.round(Number(t)*(r-(s+1))*3e-4))),u.dien_giai.push("Từ ngày 1/7/2020: Mức tính tiền chậm nộp và thời gian tính tiền chậm nộp được quy định theo khoản 2 Điều 59 Luật số 38/2019/QH14 ngày 13/06/2019")),u}function tinh_phat(e,t,n,r){var d,i,a,s,m,u=[];if(d=e.split("/")[0],i=e.split("/")[1],a=e.split("/")[2],(s=new Date(a,Number(i)-1,d)).getMonth()+1!=Number(i)||s.getDate()!=d||s.getFullYear()!=a)return["Bạn xác định sai ngày bắt đầu tính phạt. Ví dụ cách nhập: tính phạt chậm nộp 15.000.000 từ ngày 01/01/2016 đến 30/6/2016"];if(d=t.split("/")[0],i=t.split("/")[1],a=t.split("/")[2],(m=new Date(a,Number(i)-1,d)).getMonth()+1!=Number(i)||m.getDate()!=d||m.getFullYear()!=a)return["Bạn xác định sai ngày kết thúc tính phạt. Ví dụ cách nhập: tính phạt chậm nộp 15.000.000 từ ngày 01/01/2016 đến 30/6/2016"];var h=864e5,o=Date.parse(s),l=Date.parse(m);if(Math.round(l/h)-Math.round(o/h)+1<1)return["Số ngày tính phạt của bạn có vấn đề: ngày kết thúc tính phạt phải hơn ngày bắt đầu tính. Ví dụ cách nhập: tính phạt chậm nộp 15.000.000 từ ngày 01/01/2016 đến 30/6/2016"];var c,g=new Date(2013,5,30),_=new Date(2014,11,31),b=new Date(2016,5,30),p=new Date(2020,5,30),f=Math.round(Date.parse(g)/h),y=Math.round(Date.parse(_)/h),x=Math.round(Date.parse(b)/h),N=Math.round(Date.parse(p)/h),M=Math.round(o/h),v=Math.round(l/h);if(dg1="Từ hạn nộp đến 30/6/2013: Tính theo tỷ lệ 0,05% (Quy định của Luật số 78/2006/QH11)",dg2="Từ ngày 1/7/2013 đến 31/12/2014: tỷ lệ 0,05% kể từ ngày hết thời hạn nộp thuế đến ngày thứ 90; 0,07% kể từ ngày chậm nộp thứ 91 trở đi (Quy định của Luật số 21/2012/QH13)",dg3="Từ ngày 1/1/2015 - 30/6/2016: Tính theo tỷ lệ 0,05% (Quy định của Luật số 71/2014/QH13)",dg4="Từ ngày 1/7/2016: Tính theo tỷ lệ 0.03% (Quy định của Luật số 106/2016/QH13)",dg5="Từ ngày 1/7/2020: Mức tính tiền chậm nộp và thời gian tính tiền chậm nộp được quy định theo khoản 2 Điều 59 Luật số 38/2019/QH14 ngày 13/06/2019",dg_phat_tien_phat="Theo Thông tư 166/2013/TT-BTC, tiền chậm nộp tiền phạt tính theo mức 0,05%/ngày",u=[],dg=[],0===r)c=Number(n)*(v-M+1)*5e-4,dg.push(dg_phat_tien_phat),u.push(milliseconds2date(o)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-M+1)+"x0,05% = "+number_format(Math.round(c)));else if(1===r)if(M>x)M<=N&&N<v?(c=3e-4*(Number(n)*(N-M+1)+Number(n)*(v-(N+1))),u.push(milliseconds2date(o)+"-"+milliseconds2date(N*h)+":"+number_format(n)+"x"+(N-M+1)+"x0,03% = "+number_format(Math.round(Number(n)*(N-M+1)*3e-4))),dg.push(dg4),u.push(milliseconds2date((N+1)*h)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-(N+1))+"x0,03% = "+number_format(Math.round(Number(n)*(v-(N+1))*3e-4))),dg.push(dg5)):M>N?(c=Number(n)*(v-M)*3e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-M)+"x0,03% = "+number_format(Math.round(c))),dg.push(dg5)):(c=Number(n)*(v-M+1)*3e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-M+1)+"x0,03% = "+number_format(Math.round(c))),dg.push(dg4));else if(y+1<=M&&M<=x)if(v>=x+1){c=(x-M+1)*Number(n)*5e-4,tinh_theo38=den_ngay_law38(t,n),c+=tinh_theo38.tong_tien,u.push(milliseconds2date(o)+"-"+milliseconds2date(x*h)+":"+number_format(n)+"x"+(x-M+1)+"x0,05% = "+number_format(Math.round((x-M+1)*Number(n)*5e-4))),dg.push(dg3);for(var w=0;w<tinh_theo38.cach_tinh.length;w++)u.push(tinh_theo38.cach_tinh[w]),dg.push(tinh_theo38.dien_giai[w])}else c=(v-M+1)*Number(n)*5e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-M+1)+"x0,05% = "+number_format(Math.round(c))),dg.push(dg3);else if(f+1<=M&&M<=y){if(f+1<=v&&v<=y)v-M+1<=90?(c=(v-M+1)*Number(n)*5e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-M+1)+"x0,05% = "+number_format(Math.round(c))),dg.push(dg2)):(c=90*Number(n)*5e-4+(v-M-90+1)*Number(n)*7e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date((M+89)*h)+":"+number_format(n)+"x90x0,05% = "+number_format(Math.round(90*Number(n)*5e-4))),dg.push(dg2),u.push(milliseconds2date((M+90)*h)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-M-90+1)+"x0,07% = "+number_format(Math.round((v-M-90+1)*Number(n)*7e-4))),dg.push(dg2));else if(y+1<=v&&v<=x)y-M+1<=90?(c=(v-M+1)*Number(n)*5e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-M+1)+"x0,05% = "+number_format(Math.round(c))),dg.push(dg2)):(c=90*Number(n)*5e-4+(y-M-90+1)*Number(n)*7e-4+(v-(y+1)+1)*Number(n)*5e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date((M+89)*h)+":"+number_format(n)+"x90x0,05% = "+number_format(Math.round(90*Number(n)*5e-4))),dg.push(dg2),u.push(milliseconds2date((M+90)*h)+"-"+milliseconds2date(y*h)+":"+number_format(n)+"x"+(y-M-90+1)+"x0,07% = "+number_format(Math.round((y-M-90+1)*Number(n)*7e-4))),dg.push(dg2),u.push(milliseconds2date((y+1)*h)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-(y+1)+1)+"x0,05% = "+number_format(Math.round((v-(y+1)+1)*Number(n)*5e-4))),dg.push(dg3));else if(v>x)if(y-M+1<=90){c=(x-M+1)*Number(n)*5e-4,tinh_theo38=den_ngay_law38(t,n),c+=tinh_theo38.tong_tien,u.push(milliseconds2date(o)+"-"+milliseconds2date(x*h)+":"+number_format(n)+"x"+(x-M+1)+"x0,05% = "+number_format(Math.round((x-M+1)*Number(n)*5e-4))),dg.push(dg2+"; "+dg3);for(w=0;w<tinh_theo38.cach_tinh.length;w++)u.push(tinh_theo38.cach_tinh[w]),dg.push(tinh_theo38.dien_giai[w])}else{c=90*Number(n)*5e-4+(y-M-90+1)*Number(n)*7e-4+(x-(y+1)+1)*Number(n)*5e-4,tinh_theo38=den_ngay_law38(t,n),c+=tinh_theo38.tong_tien,u.push(milliseconds2date(o)+"-"+milliseconds2date((M+89)*h)+":"+number_format(n)+"x90x0,05% = "+number_format(Math.round(90*Number(n)*5e-4))),dg.push(dg2),u.push(milliseconds2date((M+90)*h)+"-"+milliseconds2date(y*h)+":"+number_format(n)+"x"+(y-M-90+1)+"x0,07% = "+number_format(Math.round((y-M-90+1)*Number(n)*7e-4))),dg.push(dg2),u.push(milliseconds2date((y+1)*h)+"-"+milliseconds2date(x*h)+":"+number_format(n)+"x"+(x-(y+1)+1)+"x0,05% = "+number_format(Math.round((x-(y+1)+1)*Number(n)*5e-4))),dg.push(dg3);for(w=0;w<tinh_theo38.cach_tinh.length;w++)u.push(tinh_theo38.cach_tinh[w]),dg.push(tinh_theo38.dien_giai[w])}}else if(M<=f)if(v<=f)c=(v-M+1)*Number(n)*5e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-M+1)+"x0,05% = "+number_format(Math.round(c))),dg.push(dg1);else if(f+1<=v&&v<=y)f+1+90>=v?(c=(v-M+1)*Number(n)*5e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-M+1)+"x0,05% = "+number_format(Math.round(c))),dg.push(dg1+"; "+dg2)):(c=(f-M+1)*Number(n)*5e-4+90*Number(n)*5e-4+(v-(f+1)-90+1)*Number(n)*7e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date(f*h)+":"+number_format(n)+"x"+(f-M+1)+"x0,05% = "+number_format(Math.round((f-M+1)*Number(n)*5e-4))),dg.push(dg1+"; "+dg2),u.push(milliseconds2date((f+1)*h)+"-"+milliseconds2date((f+90)*h)+":"+number_format(n)+"x90x0,05% = "+number_format(Math.round(90*Number(n)*5e-4))),dg.push(dg2),u.push(milliseconds2date((f+91)*h)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-(f+1)-90+1)+"x0,07% = "+number_format(Math.round((v-(f+1)-90+1)*Number(n)*7e-4))),dg.push(dg2));else if(y+1<=v&&v<=x)c=(f-M+1)*Number(n)*5e-4+90*Number(n)*5e-4+(y-(f+1)-90+1)*Number(n)*7e-4+(v-(y+1)+1)*Number(n)*5e-4,u.push(milliseconds2date(o)+"-"+milliseconds2date(f*h)+":"+number_format(n)+"x"+(f-M+1)+"x0,05% = "+number_format(Math.round((f-M+1)*Number(n)*5e-4))),dg.push(dg1),u.push(milliseconds2date((f+1)*h)+"-"+milliseconds2date((f+90)*h)+":"+number_format(n)+"x90x0,05% = "+number_format(90*Number(n)*5e-4)),dg.push(dg2),u.push(milliseconds2date((f+91)*h)+"-"+milliseconds2date(y*h)+":"+number_format(n)+"x"+(y-(f+1)-90+1)+"x0,07% = "+number_format(Math.round((y-(f+1)-90+1)*Number(n)*7e-4))),dg.push(dg2),u.push(milliseconds2date((y+1)*h)+"-"+milliseconds2date(l)+":"+number_format(n)+"x"+(v-(y+1)+1)+"x0,05% = "+number_format(Math.round((v-(y+1)+1)*Number(n)*5e-4))),dg.push(dg3);else if(v>x){c=(f-M+1)*Number(n)*5e-4+90*Number(n)*5e-4+(y-(f+1)-90+1)*Number(n)*7e-4+(x-(y+1)+1)*Number(n)*5e-4,tinh_theo38=den_ngay_law38(t,n),c+=tinh_theo38.tong_tien,u.push(milliseconds2date(o)+"-"+milliseconds2date(f*h)+":"+number_format(n)+"x"+(f-M+1)+"x0,05% = "+number_format(Math.round((f-M+1)*Number(n)*5e-4))),dg.push(dg1),u.push(milliseconds2date((f+1)*h)+"-"+milliseconds2date((f+90)*h)+":"+number_format(n)+"x90x0,05% = "+number_format(Math.round(90*Number(n)*5e-4))),dg.push(dg2),u.push(milliseconds2date((f+91)*h)+"-"+milliseconds2date(y*h)+":"+number_format(n)+"x"+(y-(f+1)-90+1)+"x0,07% = "+number_format(Math.round((y-(f+1)-90+1)*Number(n)*7e-4))),dg.push(dg2),u.push(milliseconds2date((y+1)*h)+"-"+milliseconds2date(x*h)+":"+number_format(n)+"x"+(x-(y+1)+1)+"x0,05% = "+number_format(Math.round((x-(y+1)+1)*Number(n)*5e-4))),dg.push(dg3);for(w=0;w<tinh_theo38.cach_tinh.length;w++)u.push(tinh_theo38.cach_tinh[w]),dg.push(tinh_theo38.dien_giai[w])}return u.push("TỔNG TIỀN PHẠT NỘP CHẬM: "+number_format(Math.round(c))),dg.push(""),{kq:u,dg:dg}}function view_data_history(){if("undefined"!=typeof Storage)if(inner_history=document.getElementById("history"),""==inner_history.innerHTML){html='<div style="text-align:right;"><a href="javascript:void(0)" onclick="delete_all_history()">Xóa tất cả</a></div>';for(var e=localStorage.length-1;e>=0;e--){var t=localStorage.key(e);result=JSON.parse(localStorage.getItem(t)),html+=`<div id="${t}"><div class="d-flex justify-content-between font-very-small"><div><span class="ngay-tra-cuu">${milliseconds2date(result.tgian)} </span>${result.input}</div><div><a href="javascript:void(0)" onclick="delete_history('${t}')">Xóa</a></div></div>`,html+='<table class="table table-striped table-hover table-sm table-responsive-sm font-very-small"><thead><tr><th scope="col">Chi tiết</th><th scope="col">Diễn giải</th></tr></thead><tbody>';for(var n=0;n<result.kq.length;n++)html+=`<tr><td>${result.kq[n]}</td><td>${result.dg[n]}</td></tr>`;html+="</tbody></table></div>"}inner_history.innerHTML=html,document.getElementById("link-view-history").classList.remove("plus"),document.getElementById("link-view-history").classList.add("minus")}else inner_history.innerHTML="",document.getElementById("link-view-history").classList.remove("minus"),document.getElementById("link-view-history").classList.add("plus")}function delete_history(e){window.localStorage.removeItem(e),document.getElementById(e).style.display="none",0===localStorage.length&&(document.getElementById("link-history").style.display="none")}function delete_all_history(){cf=confirm("Bạn có chắn chắn muốn xóa tất cả lịch sử tra cứu của mình không?"),cf&&(window.localStorage.clear(),document.getElementById("history").innerHTML="",document.getElementById("link-history").style.display="none")}