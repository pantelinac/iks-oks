function setCookie(e,r,o){var n=new Date;n.setTime(n.getTime()+24*o*60*60*1e3);var c="expires="+n.toUTCString();document.cookie=e+"="+r+";"+c+";path=/"}function getCookie(e){for(var r=e+"=",o=decodeURIComponent(document.cookie).split(";"),n=0;n<o.length;n++){for(var c=o[n];" "==c.charAt(0);)c=c.substring(1);if(0==c.indexOf(r))return c.substring(r.length,c.length)}return""}function SinglePlayer(e,r,o,n){var c=e,t=r,s=o,i=1,a=0;if(1==n)var l=[1,2,3,4,5,6,7,8,9],g=[],u=[];0==c?c=c=Math.floor(2*Math.random()):c=e;function d(){p(),setTimeout(function(){if(!1===s);else{var e=f(l),r=e;""==$("#"+e).text()&&s&&($("#"+e).append("X"),k(l,parseInt(r)),g.push(e),1==p()&&(s=!1,g=[],u=[]),i++)}},250)}function k(e,r){var o=e.indexOf(r);e.splice(o,1)}function f(e){return e[Math.floor(Math.random()*e.length)]}function b(e,r){return-1!=e.indexOf(r)}function h(e){if(1==e)setCookie(1,getCookie(1)+1,30),$("#WinnerIs").text("Pobednik je Racunar("+getCookie(1).length+":"+getCookie(2).length+")");else if(2==e){setCookie(2,getCookie(2)+1,30),$("#WinnerIs").text("Pobednik je "+t+"("+getCookie(2).length+":"+getCookie(1).length+")")}else if(0==e){$("#WinnerIs").text("NERESENO"),setCookie(0,getCookie(0)+1,30)}1==c?setCookie("SinglePlayerWhoPlayNext",2,30):2==c&&setCookie("SinglePlayerWhoPlayNext",1,30);var r=g.toString(),o=u.toString();return $.ajax({method:"POST",url:"./api/addPlayersToDB",data:{first_player_nick:"Racunar",secound_player_nick:t,winner:e,time:a,firstfields:r,secoundfields:o,_token:$('meta[name="csrf-token"]').attr("content")}}).done(function(e){$("#SingleModWinnerModel").modal()}),!1}function p(){FirstToStr=String(g),SecoundToStr=String(u);var e=!0;if(0==s);else{if(b(g,1)&&b(g,2)&&b(g,3))return $("#1").css("background-color","green"),$("#2").css("background-color","green"),$("#3").css("background-color","green"),e=!1,s=!1,h(1),!0;if(b(u,1)&&b(u,2)&&b(u,3))return $("#1").css("background-color","green"),$("#2").css("background-color","green"),$("#3").css("background-color","green"),e=!1,s=!1,h(2),!0;if(b(g,4)&&b(g,5)&&b(g,6))return $("#4").css("background-color","green"),$("#5").css("background-color","green"),$("#6").css("background-color","green"),e=!1,s=!1,h(1),!0;if(b(u,4)&&b(u,5)&&b(u,6))return $("#4").css("background-color","green"),$("#5").css("background-color","green"),$("#6").css("background-color","green"),e=!1,s=!1,h(2),!0;if(b(g,7)&&b(g,8)&&b(g,9))return $("#7").css("background-color","green"),$("#8").css("background-color","green"),$("#9").css("background-color","green"),e=!1,h(1),!0;if(b(u,7)&&b(u,8)&&b(u,9))return $("#7").css("background-color","green"),$("#8").css("background-color","green"),$("#9").css("background-color","green"),e=!1,s=!1,h(2),!0;if(b(g,1)&&b(g,4)&&b(g,7))return $("#1").css("background-color","green"),$("#4").css("background-color","green"),$("#7").css("background-color","green"),e=!1,h(1),!0;if(b(u,1)&&b(u,4)&&b(u,7))return $("#1").css("background-color","green"),$("#4").css("background-color","green"),$("#7").css("background-color","green"),e=!1,s=!1,h(2),!0;if(b(g,2)&&b(g,5)&&b(g,8))return $("#2").css("background-color","green"),$("#5").css("background-color","green"),$("#8").css("background-color","green"),e=!1,s=!1,h(1),!0;if(b(u,2)&&b(u,5)&&b(u,8))return $("#2").css("background-color","green"),$("#5").css("background-color","green"),$("#8").css("background-color","green"),e=!1,s=!1,h(2),!0;if(b(g,3)&&b(g,6)&&b(g,9))return $("#3").css("background-color","green"),$("#6").css("background-color","green"),$("#9").css("background-color","green"),e=!1,s=!1,h(1),!0;if(b(u,3)&&b(u,6)&&b(u,9))return $("#3").css("background-color","green"),$("#6").css("background-color","green"),$("#9").css("background-color","green"),e=!1,s=!1,h(2),!0;if(b(g,1)&&b(g,5)&&b(g,9))return $("#1").css("background-color","green"),$("#5").css("background-color","green"),$("#9").css("background-color","green"),e=!1,s=!1,h(1),!0;if(b(u,1)&&b(u,5)&&b(u,9))return $("#1").css("background-color","green"),$("#5").css("background-color","green"),$("#9").css("background-color","green"),e=!1,s=!1,h(2),!0;if(b(g,3)&&b(g,5)&&b(g,7))return $("#3").css("background-color","green"),$("#5").css("background-color","green"),$("#7").css("background-color","green"),e=!1,s=!1,h(1),!0;if(b(u,3)&&b(u,5)&&b(u,7))return $("#3").css("background-color","green"),$("#5").css("background-color","green"),$("#7").css("background-color","green"),e=!1,s=!1,h(2),!0;if(1==e){var r=l.length;if(console.log(r),0==r&&1==e)return s=!1,h(0),!0}}}1==c?($("#whoPlayFirst").text("Ovu partiju RACUNAR igra prvi"),d()):$("#whoPlayFirst").text("Ovu partiju "+t+" igra prvi"),$.ajax({method:"POST",url:"./api/GetLastFiveResult",data:{first_player_nick:"Racunar",secound_player_nick:t,_token:$('meta[name="csrf-token"]').attr("content")}}).done(function(e){var r=JSON.parse(e);$("#LastFiveResult").html(""),jQuery.each(r,function(){1==this.winner?$("#LastFiveResult").append('<h6 style="color: greenyellow;">Pobedio je: Racunar<h6>'):2==this.winner?$("#LastFiveResult").append('<h6 style="color: red;">Pobedio je: '+t+"<h6>"):$("#LastFiveResult").append("<h6>Rezultat je: NERESENO<h6>")})}),$(".cell").click(function(){if(""==$(this).text()&&s){if(i%2==1){$(this).append("X");var e=$(this).attr("id"),r=parseInt(e);u.push(r),k(l,r),p(),setTimeout(function(){if(!1===s);else{var e=f(l),r=e;""==$("#"+e).text()&&s&&($("#"+e).append("O"),k(l,parseInt(r)),g.push(e),1==p()&&(s=!1,g=[],u=[]),i++)}},250)}else{$(this).append("O");e=$(this).attr("id"),r=parseInt(e);u.push(r),k(l,r),d()}1==p()&&(s=!1,g=[],u=[]),i++}}),setInterval(function(){a+=1},1e3)}function MultiPlayer(e,r,o,n,c){var t=e,s=r,i=n,a=1,l=0;if(1==c)var g=[1,2,3,4,5,6,7,8,9],u=[],d=[];0==t?t=t=Math.floor(2*Math.random()):t=e;function k(e,r){var o=e.indexOf(r);e.splice(o,1)}function f(e,r){return-1!=e.indexOf(r)}function b(e){if(1==e)setCookie(1,getCookie(1)+1,30),$("#WinnerIsMultiPlayer").text("Pobednik je "+o+"("+getCookie(1).length+":"+getCookie(2).length+")");else if(2==e){setCookie(2,getCookie(2)+1,30),$("#WinnerIsMultiPlayer").text("Pobednik je "+s+"("+getCookie(2).length+":"+getCookie(1).length+")")}else if(0==e){$("#WinnerIsMultiPlayer").text("NERESENO"),setCookie(0,getCookie(0)+1,30)}1==t?setCookie("WhoPlayFirstNext",2,30):2==t&&setCookie("WhoPlayFirstNext",1,30);var r=u.toString(),n=d.toString();return console.log(r),console.log(n),$.ajax({method:"POST",url:"./api/addPlayersToDB",data:{first_player_nick:s,secound_player_nick:o,winner:e,time:l,firstfields:r,secoundfields:n,_token:$('meta[name="csrf-token"]').attr("content")}}).done(function(e){$("#MultiModWinnerModel").modal()}),!1}1==t?$("#whoPlayFirst").text("Ovu partiju "+o+" igra prvi"):$("#whoPlayFirst").text("Ovu partiju "+s+" igra prvi"),$.ajax({method:"POST",url:"./api/GetLastFiveResult",data:{first_player_nick:s,secound_player_nick:o,_token:$('meta[name="csrf-token"]').attr("content")}}).done(function(e){var r=JSON.parse(e);$("#LastFiveResult").html(""),jQuery.each(r,function(){1==this.winner?$("#LastFiveResult").append('<h6 style="color: greenyellow;">Pobedio je: '+o+"<h6>"):2==this.winner?$("#LastFiveResult").append('<h6 style="color: red;">Pobedio je: '+s+"<h6>"):$("#LastFiveResult").append("<h6>Rezultat je: NERESENO<h6>")})}),$(".cell").click(function(){if(""==$(this).text()&&i){if(a%2==1){$(this).append("X");var e=$(this).attr("id"),r=parseInt(e);1==t?u.push(r):d.push(r),k(g,r)}else{$(this).append("O");e=$(this).attr("id"),r=parseInt(e);1==t?d.push(r):u.push(r),k(g,r)}1==function(){FirstToStr=String(u),SecoundToStr=String(d);var e=!0;if(0==i);else{if(f(u,1)&&f(u,2)&&f(u,3))return $("#1").css("background-color","green"),$("#2").css("background-color","green"),$("#3").css("background-color","green"),e=!1,i=!1,b(1),!0;if(f(d,1)&&f(d,2)&&f(d,3))return $("#1").css("background-color","green"),$("#2").css("background-color","green"),$("#3").css("background-color","green"),e=!1,i=!1,b(2),!0;if(f(u,4)&&f(u,5)&&f(u,6))return $("#4").css("background-color","green"),$("#5").css("background-color","green"),$("#6").css("background-color","green"),e=!1,i=!1,b(1),!0;if(f(d,4)&&f(d,5)&&f(d,6))return $("#4").css("background-color","green"),$("#5").css("background-color","green"),$("#6").css("background-color","green"),e=!1,i=!1,b(2),!0;if(f(u,7)&&f(u,8)&&f(u,9))return $("#7").css("background-color","green"),$("#8").css("background-color","green"),$("#9").css("background-color","green"),e=!1,b(1),!0;if(f(d,7)&&f(d,8)&&f(d,9))return $("#7").css("background-color","green"),$("#8").css("background-color","green"),$("#9").css("background-color","green"),e=!1,i=!1,b(2),!0;if(f(u,1)&&f(u,4)&&f(u,7))return $("#1").css("background-color","green"),$("#4").css("background-color","green"),$("#7").css("background-color","green"),e=!1,b(1),!0;if(f(d,1)&&f(d,4)&&f(d,7))return $("#1").css("background-color","green"),$("#4").css("background-color","green"),$("#7").css("background-color","green"),e=!1,i=!1,b(2),!0;if(f(u,2)&&f(u,5)&&f(u,8))return $("#2").css("background-color","green"),$("#5").css("background-color","green"),$("#8").css("background-color","green"),e=!1,i=!1,b(1),!0;if(f(d,2)&&f(d,5)&&f(d,8))return $("#2").css("background-color","green"),$("#5").css("background-color","green"),$("#8").css("background-color","green"),e=!1,i=!1,b(2),!0;if(f(u,3)&&f(u,6)&&f(u,9))return $("#3").css("background-color","green"),$("#6").css("background-color","green"),$("#9").css("background-color","green"),e=!1,i=!1,b(1),!0;if(f(d,3)&&f(d,6)&&f(d,9))return $("#3").css("background-color","green"),$("#6").css("background-color","green"),$("#9").css("background-color","green"),e=!1,i=!1,b(2),!0;if(f(u,1)&&f(u,5)&&f(u,9))return $("#1").css("background-color","green"),$("#5").css("background-color","green"),$("#9").css("background-color","green"),e=!1,i=!1,b(1),!0;if(f(d,1)&&f(d,5)&&f(d,9))return $("#1").css("background-color","green"),$("#5").css("background-color","green"),$("#9").css("background-color","green"),e=!1,i=!1,b(2),!0;if(f(u,3)&&f(u,5)&&f(u,7))return $("#3").css("background-color","green"),$("#5").css("background-color","green"),$("#7").css("background-color","green"),e=!1,i=!1,b(1),!0;if(f(d,3)&&f(d,5)&&f(d,7))return $("#3").css("background-color","green"),$("#5").css("background-color","green"),$("#7").css("background-color","green"),e=!1,i=!1,b(2),!0;if(1==e){var r=g.length;if(console.log(r),0==r&&1==e)return i=!1,b(0),!0}}}()&&(i=!1,u=[],d=[]),a++}}),setInterval(function(){l+=1},1e3)}$(document).ready(function(){function e(){$("#1").text(""),$("#2").text(""),$("#3").text(""),$("#4").text(""),$("#5").text(""),$("#6").text(""),$("#7").text(""),$("#8").text(""),$("#9").text(""),$("#1").css("background-color","#fff"),$("#2").css("background-color","#fff"),$("#3").css("background-color","#fff"),$("#4").css("background-color","#fff"),$("#5").css("background-color","#fff"),$("#6").css("background-color","#fff"),$("#7").css("background-color","#fff"),$("#8").css("background-color","#fff"),$("#9").css("background-color","#fff")}$("#FinishSinglePlayer").click(function(){e(),SinglePlayer(parseInt(getCookie("SinglePlayerWhoPlayNext")),getCookie("SinglePlayerNick"),!0,1),$("#SingleModWinnerModel").modal("hide")}),$("#FirstModal").modal(),$("#SinglePlayerButton").click(function(){$("#FirstModal").modal("hide"),$("#SinglePlayerEnterNick").modal()}),$("#SinglePlayerStartPlayButton").click(function(){var e=$("#SinglePlayerNick").val();SinglePlayer(0,e,!0,1),$("#SinglePlayerEnterNick").modal("hide"),setCookie("SinglePlayerNick",e,30),document.cookie="1=",document.cookie="2="}),$("#MultiPlayerButton").click(function(){$("#FirstModal").modal("hide"),$("#MultiPlayerEnterNick").modal()}),$("#MultiPlayerStartPlayButton").click(function(){document.cookie="1=",document.cookie="2=",MultiPlayer(0,$("#MultiPlayerNickFirst").val(),$("#MultiPlayerNickSecound").val(),!0,1),setCookie("MUserNick",$("#MultiPlayerNickFirst").val()),setCookie("MUserNickSecound",$("#MultiPlayerNickSecound").val()),$("#MultiPlayerEnterNick").modal("hide")}),$("#FinishMultiPlayer").click(function(){e(),MultiPlayer(parseInt(getCookie("WhoPlayFirstNext")),getCookie("MUserNick"),getCookie("MUserNickSecound"),!0,1),$("#MultiModWinnerModel").modal("hide")})});