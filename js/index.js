//-- GLOBAL -------------
var survey = []; //Bidimensional array: [ [1,3], [2,4] ]
var ogUrl = "";
var ogTitle = "";
var ogDescription = "";
var ogImage = "";
var score = 0;
//--
var englishShow = false;
var translateShow = true;

//-- LOAD PAGE ---------------------
$(document).ready(function() {

	var englishShow = false;
	var translateShow = true;

	$("#bShowHideEnglish").click(function() {
		if (!englishShow) {
			$("#bShowHideEnglish").text('Show English');
			$("#bShowHideEnglish").addClass('btn-control-active');
			$(".englishText").addClass('hidden');
			englishShow = true;
		} else {
			$("#bShowHideEnglish").text('Hide English');
			$("#bShowHideEnglish").removeClass('btn-control-active');
			$(".englishText").removeClass('hidden');
			englishShow = false;
		}
	});

	$("#bShowHideTranslate").click(function() {
		if (!translateShow) {
			$("#bShowHideTranslate").text('Show Translate');
			$("#bShowHideTranslate").addClass('btn-control-active');
			$(".translateText").addClass('hidden');
			translateShow = true;
		} else {

			$(".englishText").each(function() {
				setTranslate001($(this).text(), $(this).next());
			});

			$("#bShowHideTranslate").text('Hide Translate');
			$("#bShowHideTranslate").removeClass('btn-control-active');
			$(".translateText").removeClass('hidden');
			translateShow = false;
		}

	});

});

//-- TRANSLATE FUNCTION ------------
function setTranslate001(pText, eResult) {
	var texTransfer = pText;
	var customerLanguage = getCustomerLanguage();
	var trLink = "https://us-central1-app-of-the-day-9a9f6.cloudfunctions.net/translate?from=auto&to=";
	var result = 'Error translate! Please try refesh page.';
	texTransfer = texTransfer.replace(/’/gi,"'");
	texTransfer = texTransfer.replace(/“/gi,"\"");
	texTransfer = texTransfer.replace(/”/gi,"\"");
	texTransfer = texTransfer.replace(/—/gi,"-");
	texTransfer = texTransfer.replace(/…/gi,"..."); 
	console.log('Text Translate:' + texTransfer);

	trLink = trLink + customerLanguage.toLowerCase() + "&text=" + texTransfer;

	fetch(trLink).then(function(response) {
		return response.text();
	}).then(function(text) {
		eResult.html('<br/>' + text);
	})
}

function getCustomerLanguage() {
	var lang = $('input:checked').val() + '';
	setCookie('Language', lang, 60);
	//console.log('Language:' + lang);
	return lang;
}
//-- QUIZ FUNCTION -----------------
function resetQuiz() {
	$(".rb-tab").removeClass("rb-tab-active");
}
//--
//Switcher function:
$(".rb-tab").click(function(){
	//Spot switcher:
	$(this).parent().find(".rb-tab").removeClass("rb-tab-active");
	$(this).addClass("rb-tab-active");
});

//Save data:
$(".trigger").click(function(){
	//Empty array:
	survey = [];
	//Push data:
	for (i=1; i<=$(".rb").length; i++) {
		var rb = "rb" + i;
		var rbValue = parseInt($("#rb-"+i).find(".rb-tab-active").attr("data-value"));
		//Bidimensional array push:
		survey.push([i, rbValue]); //Bidimensional array: [ [1,3], [2,4] ]
	};
	//Debug:
	debug();
});

//Debug:

function debug(){
	var debug = "";
	var correct = 0;
	var totalQuestion = survey.length;
	//var score = 0;
	
	for (i=0; i<totalQuestion; i++) {
		if (survey[i][1] != null && survey[i][1]*1 == 1) {
			correct = correct + 1
		}
		debug += "Nº " + survey[i][0] + " = " + survey[i][1] + "\n";
	};

	console.log(correct);		
	console.log(totalQuestion);	
	console.log(debug);		

	score = Math.round(correct/totalQuestion*100);
	$("#modal1Desc").html(score + "%")
	//alert(result + "%");

	$("#modal1Bot").html("");
	if (score == 100) {
		$("#modal1Bot").html("You are the best. (♥I love you♥)");
	} else if (score < 100 && score >= 80) {
		$("#modal1Bot").html("You are Great. (♦I like you♦)");
	} else if (score < 80 && score >= 50) {
		$("#modal1Bot").html("You need try again. (!Come on, you can do it!)");
	} else if (score < 50 && score >= 1) {
		$("#modal1Bot").html("This is not the place for you. (/!\\Try find other love/!\\)");
	} else {
		$("#modal1Bot").html("Tao cạn lời...");
	}
	//-------------
	//var wLink = "https://englives.blogspot.com/p/messages.html?parameters=body:" + score + "&amp;title=Free Test Online - ETS Toeic Test 1000 - Test 1 - Part 1 - Listening Test";
	//var wLink = "https://englives.blogspot.com/2018/12/free-test-online-ets-toeic-test-1000.html";
	//var shareDiv = $("#shareDiv").html();
	//shareDiv = shareDiv.replace("?1",wLink);
	//$("#shareDiv").html(shareDiv);
	//-------------

	$('[data-remodal-id=modal]').remodal();  
  
};
//-------------------------------------------------------
function sharefbimage() {
	ogUrl = window.location.href;
	ogUrl = ogUrl.replace('#modal','');
	console.log(ogUrl);
	ogTitle = "ETS TEST 1000";
	ogDescription = ogUrl;
	ogImage = "";

	switch(score) {
		case 0: ogImage = "https://2.bp.blogspot.com/-9SDCOh0Ok7s/XCh6r26qu2I/AAAAAAAABN8/pmcUD8dRTcQhdyed0PIpekBLqi_B2f-OgCLcBGAs/s1600/0.png"; break;
		case 1: ogImage = "https://1.bp.blogspot.com/-yAviMYWesWU/XCh6r_anRyI/AAAAAAAABOA/9YqMmR3N1xgkzeotYVOuvJULeASnq1KYgCLcBGAs/s1600/1.png"; break;
		case 2: ogImage = "https://4.bp.blogspot.com/-LMfwxxFY2eY/XCh6vusVpwI/AAAAAAAABOs/POYsqxWquHQW-lyD4Jaz0uZ0BcEa3TJJQCLcBGAs/s1600/2.png"; break;
		case 3: ogImage = "https://1.bp.blogspot.com/-7xxoKbxlrNM/XCh6zGCiD-I/AAAAAAAABPY/ycNYS25nH7ccX21vyF_0Q-4WC77goX2SwCLcBGAs/s1600/3.png"; break;
		case 4: ogImage = "https://4.bp.blogspot.com/-oB2IJi9UYnE/XCh62P_0eII/AAAAAAAABQE/-J4Em00zJZALhWy_q4mfuyXkGIafnpbtgCLcBGAs/s1600/4.png"; break;
		case 5: ogImage = "https://3.bp.blogspot.com/-C42-zVKOdwU/XCh65pd4UuI/AAAAAAAABQw/b2wVOcY9K9gOg9xIHfTkwiRbJ15ctUhOgCLcBGAs/s1600/5.png"; break;
		case 6: ogImage = "https://4.bp.blogspot.com/-kLdkMgnLDNU/XCh6834dpMI/AAAAAAAABRc/zX9ss1FjrTk6q4J9L0slNMJsEne4sMEdwCLcBGAs/s1600/6.png"; break;
		case 7: ogImage = "https://4.bp.blogspot.com/-NrjMwdi16To/XCh6__w-TbI/AAAAAAAABSI/MRErpWOlEJw_ab2o-VNem0Mm4Nsax6G4ACLcBGAs/s1600/7.png"; break;
		case 8: ogImage = "https://1.bp.blogspot.com/-EqO0b8Bnrvc/XCh7DXMWedI/AAAAAAAABS0/mnxrJwdyUOQDtjK1gLzHhE9WldlCs3EUQCLcBGAs/s1600/8.png"; break;
		case 9: ogImage = "https://1.bp.blogspot.com/-Xxlm1RiCU3U/XCh7GQQqWII/AAAAAAAABTg/qEg7vKDZ-S0UUGxwJKvi2OK18GYEMt5yACLcBGAs/s1600/9.png"; break;
		case 10: ogImage = "https://4.bp.blogspot.com/-gQtIMXEV6O0/XCh6ruLKkxI/AAAAAAAABN4/JRMICjlyyDM76KZhnwjjhc36A8kei9DwgCLcBGAs/s1600/10.png"; break;
		case 11: ogImage = "https://1.bp.blogspot.com/-zdbWFFno2_E/XCh6s1YTuwI/AAAAAAAABOI/7hyordE8-FMvvU1LGL0EMrK2kdh2Jw_pgCLcBGAs/s1600/11.png"; break;
		case 12: ogImage = "https://3.bp.blogspot.com/-7wSdttucJ4Y/XCh6s8ydU0I/AAAAAAAABOM/swqfa8ASW78yvUmcSxCX96YKagAUMEBewCLcBGAs/s1600/12.png"; break;
		case 13: ogImage = "https://1.bp.blogspot.com/-xhgS2OK0zLY/XCh6tQfb65I/AAAAAAAABOQ/yWM2zfArLy4GyAfKXhObUEGOKSfbDK_qwCLcBGAs/s1600/13.png"; break;
		case 14: ogImage = "https://3.bp.blogspot.com/-PuZ7okXj5tI/XCh6t0vJY8I/AAAAAAAABOU/NMNsZm1_ZEAPlijcn7gu7OhJ9-4ZtTUkgCLcBGAs/s1600/14.png"; break;
		case 15: ogImage = "https://1.bp.blogspot.com/-EQc9azl38PU/XCh6t5HiOlI/AAAAAAAABOY/NTV-NTDTDjMe9nlphXKO6x4RRHcLtUBjgCLcBGAs/s1600/15.png"; break;
		case 16: ogImage = "https://1.bp.blogspot.com/-oHfKrCAsWcc/XCh6uHYf2pI/AAAAAAAABOc/dAmgjWMr3U8IDjN7mVB-e1vOjzGPOxWbwCLcBGAs/s1600/16.png"; break;
		case 17: ogImage = "https://4.bp.blogspot.com/-YgyS5yKEMP4/XCh6ujnj77I/AAAAAAAABOg/vBvzY0hOZZsgpP4PdtJQ1RRuZ49_Az8uQCLcBGAs/s1600/17.png"; break;
		case 18: ogImage = "https://3.bp.blogspot.com/-B3CjCiaWdAs/XCh6uuJvhgI/AAAAAAAABOk/tIH84_OJdHgA7fV4YTb1PybDslwhFGfVQCLcBGAs/s1600/18.png"; break;
		case 19: ogImage = "https://2.bp.blogspot.com/-dlXYqk3OFSY/XCh6vCUOtAI/AAAAAAAABOo/h9_0Bk5JT2ArgW69TpcHTYV9aZ56vcOigCLcBGAs/s1600/19.png"; break;
		case 20: ogImage = "https://3.bp.blogspot.com/-WdreIYRCp5A/XCh6vkLxCMI/AAAAAAAABOw/bZYQXIBa4RQEnmHS2Po0LUBC8mYtNlryACLcBGAs/s1600/20.png"; break;
		case 21: ogImage = "https://2.bp.blogspot.com/-HX93MGMQ0c0/XCh6v1IBcSI/AAAAAAAABO0/dKiFQdNvl6Iqv8mw1vVRpaTrl0WTm6_zQCLcBGAs/s1600/21.png"; break;
		case 22: ogImage = "https://4.bp.blogspot.com/-DiHmL-Ne5zc/XCh6wbMsgRI/AAAAAAAABO4/XzFSaomqzt8A93jmzjaGdCyJy0JAd4MNgCLcBGAs/s1600/22.png"; break;
		case 23: ogImage = "https://3.bp.blogspot.com/-8pxLBRc5dCY/XCh6w1Zo-aI/AAAAAAAABO8/qVlQtDaDa9oQ6auhMlNffee4vLsAlNepACLcBGAs/s1600/23.png"; break;
		case 24: ogImage = "https://2.bp.blogspot.com/-vTzbRUdHOq4/XCh6xHrDTtI/AAAAAAAABPA/-4E5GTDkUMYczPDqLuxpcbvybfhi5IoHgCLcBGAs/s1600/24.png"; break;
		case 25: ogImage = "https://2.bp.blogspot.com/-Ezc75uwdJYQ/XCh6xVa1DoI/AAAAAAAABPE/h8PaTPi6KcU0whg_rNIfrsuFD41Mji_ywCLcBGAs/s1600/25.png"; break;
		case 26: ogImage = "https://2.bp.blogspot.com/-ltpyhl7e0dQ/XCh6xh_U8yI/AAAAAAAABPI/N1H1uN9j-xQoca1LVzjsaSex0fBICQCywCLcBGAs/s1600/26.png"; break;
		case 27: ogImage = "https://3.bp.blogspot.com/-Uc65sv7fA0Q/XCh6yAM84tI/AAAAAAAABPM/374KKsUTICk3mCa1HrYKKJQekwG0mA_wQCLcBGAs/s1600/27.png"; break;
		case 28: ogImage = "https://2.bp.blogspot.com/-4yoaC6_G48E/XCh6yDCifSI/AAAAAAAABPQ/RjLQEoIWiGcOjOB08i4ggaRKo67aDhT9wCLcBGAs/s1600/28.png"; break;
		case 29: ogImage = "https://2.bp.blogspot.com/-W0blt179P0w/XCh6ymb2PTI/AAAAAAAABPU/Ym_HRSjvOgcmfeaumFVTrd4adiy9rQTyACLcBGAs/s1600/29.png"; break;
		case 30: ogImage = "https://4.bp.blogspot.com/-w-jwdXmHAok/XCh6zTXWOZI/AAAAAAAABPc/xftkF0Dnp38PIHMmaxy8gwFzkM9xohGLwCLcBGAs/s1600/30.png"; break;
		case 31: ogImage = "https://3.bp.blogspot.com/-M-e2olsaOCI/XCh6zsxWQaI/AAAAAAAABPg/d49MGHOgCfUZ3n39MbQmbfshVaLD20qBQCLcBGAs/s1600/31.png"; break;
		case 32: ogImage = "https://2.bp.blogspot.com/-rBkFavexiok/XCh60FYVc_I/AAAAAAAABPk/7HWzCtirrLsgV-rEJS3Pj3gUfkQPLIuygCLcBGAs/s1600/32.png"; break;
		case 33: ogImage = "https://4.bp.blogspot.com/-PWfEZtv9lB8/XCh60JdKEoI/AAAAAAAABPo/qAgHfAPz-R8W8ejkbLuCe_iIRvu3aPejgCLcBGAs/s1600/33.png"; break;
		case 34: ogImage = "https://2.bp.blogspot.com/-DJjmNLFWjyE/XCh60UOaXEI/AAAAAAAABPs/QUfWckcDYwEn18bdcGwBo-DEESOKFAVRwCLcBGAs/s1600/34.png"; break;
		case 35: ogImage = "https://3.bp.blogspot.com/-uR8ln_NLJQE/XCh606saOqI/AAAAAAAABPw/P__DDM0WjF8rWjqxg4yRxuyveXXkjb3DgCLcBGAs/s1600/35.png"; break;
		case 36: ogImage = "https://3.bp.blogspot.com/-Gmnskf7oB0Y/XCh601nxmqI/AAAAAAAABP0/60XsXdZJBVoItYszemt6d5lUuH5yQxs9gCLcBGAs/s1600/36.png"; break;
		case 37: ogImage = "https://3.bp.blogspot.com/-qXXzj-UBlsU/XCh61HFzz9I/AAAAAAAABP4/h3xgkXMRPnkE8BX3w136st83WE6oZ0z0gCLcBGAs/s1600/37.png"; break;
		case 38: ogImage = "https://3.bp.blogspot.com/-dig6qlUCv1M/XCh61yUR1gI/AAAAAAAABP8/jKa63k0SltcWRI8k3hIMfXYYs3Yxi5VvgCLcBGAs/s1600/38.png"; break;
		case 39: ogImage = "https://3.bp.blogspot.com/-eWpn0-AaacA/XCh610GibRI/AAAAAAAABQA/J2pINrUo3SwJ4SD8Ok605Hb7Hd6WqwTsgCLcBGAs/s1600/39.png"; break;
		case 40: ogImage = "https://4.bp.blogspot.com/-74RqoOstBSA/XCh62hhIpRI/AAAAAAAABQI/sup0ERGQ_Rs7u3OEWlcyrPVuiyHHcOKXACLcBGAs/s1600/40.png"; break;
		case 41: ogImage = "https://1.bp.blogspot.com/-dPnVr2iCtaY/XCh628n2jiI/AAAAAAAABQM/u2yGLwWqKF8Q1LE9FRkfIMg9wJUrxf-KQCLcBGAs/s1600/41.png"; break;
		case 42: ogImage = "https://3.bp.blogspot.com/-ND9CWJjju2U/XCh63F_TDII/AAAAAAAABQQ/zGw46XTKv8gftCQtoiq9fXTW_lyr12J6wCLcBGAs/s1600/42.png"; break;
		case 43: ogImage = "https://3.bp.blogspot.com/-m0YeQ2yIIgs/XCh63gdsluI/AAAAAAAABQU/M3tzMLWwq5IC_VMu90o-nP-NsgffFLt6QCLcBGAs/s1600/43.png"; break;
		case 44: ogImage = "https://1.bp.blogspot.com/-JC8owKQKyKg/XCh63zggnCI/AAAAAAAABQY/t_nVmQOeURU-dtUlRUU29hUC6PmZKwqUACLcBGAs/s1600/44.png"; break;
		case 45: ogImage = "https://4.bp.blogspot.com/-YfLDEclA5mI/XCh64GW9GFI/AAAAAAAABQc/OqubLo0r4NgoEMaEz3Pg4-4TSz7gy66jQCLcBGAs/s1600/45.png"; break;
		case 46: ogImage = "https://2.bp.blogspot.com/-QvrRA2DIE1E/XCh64c3aysI/AAAAAAAABQg/UR1GxouKA5AyYTxkQ7DyFSEht9hdJpBTwCLcBGAs/s1600/46.png"; break;
		case 47: ogImage = "https://4.bp.blogspot.com/-nGBMv3auZWY/XCh64oR6sgI/AAAAAAAABQk/NOTT5g4_3n0dV-ERKS7dVhPjNa4MjCArACLcBGAs/s1600/47.png"; break;
		case 48: ogImage = "https://4.bp.blogspot.com/-pqxe2PdYwbc/XCh64xVUMYI/AAAAAAAABQo/0zj_Lo5mJX46elMUtmAjYd0is8B7uyWmwCLcBGAs/s1600/48.png"; break;
		case 49: ogImage = "https://4.bp.blogspot.com/-5NkoplsLaA4/XCh65HqThWI/AAAAAAAABQs/fCUJeJXSjjYKwQSkbTr2KIga11DUeaWgwCLcBGAs/s1600/49.png"; break;
		case 50: ogImage = "https://3.bp.blogspot.com/-jBkwLb6lHkc/XCh653j9JII/AAAAAAAABQ0/iHbBPebp3Fc-8whWMJ2QkL1aaxMR-82-gCLcBGAs/s1600/50.png"; break;
		case 51: ogImage = "https://2.bp.blogspot.com/-D7Wl_Ufx6_M/XCh66LAB4rI/AAAAAAAABQ4/_QAoBgefl_g2p8YI3-ClrvXHHRDYaMOfwCLcBGAs/s1600/51.png"; break;
		case 52: ogImage = "https://3.bp.blogspot.com/-jHulHVz3QL4/XCh66aF-5zI/AAAAAAAABQ8/jyyexg00ifc7EP-KRs7Mifkv4atnvu4yACLcBGAs/s1600/52.png"; break;
		case 53: ogImage = "https://2.bp.blogspot.com/-p9BGFMkxWVE/XCh662UbnwI/AAAAAAAABRA/zZQEaKBfVJct9m93GbOUHUqeEBTsHkcEQCLcBGAs/s1600/53.png"; break;
		case 54: ogImage = "https://2.bp.blogspot.com/-C_XCQxxc2jA/XCh67DbRqoI/AAAAAAAABRE/OC-Dag1ELS0zMZpk3SaRwaaHupIBz2OIgCLcBGAs/s1600/54.png"; break;
		case 55: ogImage = "https://3.bp.blogspot.com/-gt1h1Kcqjis/XCh67CxDAeI/AAAAAAAABRI/BdipBOjk7oostEvKwloU6blEETHP5y6QACLcBGAs/s1600/55.png"; break;
		case 56: ogImage = "https://4.bp.blogspot.com/-yF3fWHbdV-g/XCh67jSMipI/AAAAAAAABRM/AfwYIdkH2_Q8vqUJo0kUBx6gulctxkuGgCLcBGAs/s1600/56.png"; break;
		case 57: ogImage = "https://1.bp.blogspot.com/-BB3DPHvNpWQ/XCh67ziRDNI/AAAAAAAABRQ/538XD_xvEioDtY9hMHTRUdkUBAfnzqmwQCLcBGAs/s1600/57.png"; break;
		case 58: ogImage = "https://4.bp.blogspot.com/-0K17PnbVlXQ/XCh68FB3t0I/AAAAAAAABRU/kFT75XMNm14uLZXm24cyb2327zCAEb0YQCLcBGAs/s1600/58.png"; break;
		case 59: ogImage = "https://1.bp.blogspot.com/-Q5uxBPs8zec/XCh68UW6snI/AAAAAAAABRY/tNqwE-mslVYzXYVboguk6e7zAJskDaWqwCLcBGAs/s1600/59.png"; break;
		case 60: ogImage = "https://2.bp.blogspot.com/-bqWfc_j612E/XCh69FHcFJI/AAAAAAAABRg/OT-OHALqSxwkb5lS2ZatoioW5XsmVH75ACLcBGAs/s1600/60.png"; break;
		case 61: ogImage = "https://3.bp.blogspot.com/-M-x_tYYFIRc/XCh69QVvZWI/AAAAAAAABRk/L3u1g0T1Vo0XecfmuhdK4u1TTAdOpOMEACLcBGAs/s1600/61.png"; break;
		case 62: ogImage = "https://2.bp.blogspot.com/-fScbVktt7gw/XCh69wVT23I/AAAAAAAABRo/LI5-7BpS_y0Hfkabazo8HFbmrD8YY7rFQCLcBGAs/s1600/62.png"; break;
		case 63: ogImage = "https://4.bp.blogspot.com/-D4df9kyIj-w/XCh692Xk8CI/AAAAAAAABRs/KbONy7tdPWAcoA2J9vhunhhe-AvT2F4tQCLcBGAs/s1600/63.png"; break;
		case 64: ogImage = "https://4.bp.blogspot.com/-p9SPCUooc5Y/XCh6-EUAx0I/AAAAAAAABRw/8f7ue9AVIqAVkJTMdzC096azeOx24Oo8wCLcBGAs/s1600/64.png"; break;
		case 65: ogImage = "https://3.bp.blogspot.com/-5TEnwalV3c8/XCh6-sEvR3I/AAAAAAAABR0/rFKWBpfL-BIvmCOoJDwE93Rubv_DXo0xQCLcBGAs/s1600/65.png"; break;
		case 66: ogImage = "https://2.bp.blogspot.com/-zUCaFqvvjE0/XCh6-vog_WI/AAAAAAAABR4/XZjghCH9TlMT5I8JOqyKOJTZoFDonYpYACLcBGAs/s1600/66.png"; break;
		case 67: ogImage = "https://1.bp.blogspot.com/-RovRZ2aFQf4/XCh6_Cps3pI/AAAAAAAABR8/QXCeXE6HdcY-QGLssoL4_1xMUIyW007XQCLcBGAs/s1600/67.png"; break;
		case 68: ogImage = "https://3.bp.blogspot.com/-IAKV8xOHwXI/XCh6_eKWT5I/AAAAAAAABSA/EryOaogQttQbA1A3i9xaz0p_jL_SGNSsQCLcBGAs/s1600/68.png"; break;
		case 69: ogImage = "https://1.bp.blogspot.com/-4wnZeAjLydo/XCh6_qEOkhI/AAAAAAAABSE/DrPMU9ZShbE8mYjPMCvf4860xhKcZ-XKQCLcBGAs/s1600/69.png"; break;
		case 70: ogImage = "https://3.bp.blogspot.com/-qcsXp2kzpEM/XCh7Ao_RvbI/AAAAAAAABSM/FiEDsqBDD-kIo-Z72evGqlAmJHimfK56wCLcBGAs/s1600/70.png"; break;
		case 71: ogImage = "https://4.bp.blogspot.com/-d3ktlHfW0GA/XCh7AtOPaCI/AAAAAAAABSQ/i4vB8o5vJ7ApUzPcth2LGXwmg2P1dszdQCLcBGAs/s1600/71.png"; break;
		case 72: ogImage = "https://2.bp.blogspot.com/-M2TUIh4Clfs/XCh7AnzM4FI/AAAAAAAABSU/IJWMmntyWBQL0scRj8fE2ek7Xrr-ZiAdACLcBGAs/s1600/72.png"; break;
		case 73: ogImage = "https://1.bp.blogspot.com/-Z2UYHOlWYag/XCh7BlGpaLI/AAAAAAAABSY/3fKlVDnZqC8eViTjbqx1FfcRZORZNuUfACLcBGAs/s1600/73.png"; break;
		case 74: ogImage = "https://3.bp.blogspot.com/-O1lt4_VsUS4/XCh7Bo6NQGI/AAAAAAAABSc/NtrhXdKpUZE8P7q-cDnoqWmfNt65cWOJQCLcBGAs/s1600/74.png"; break;
		case 75: ogImage = "https://2.bp.blogspot.com/-__JAGFo4qNM/XCh7B_L6dzI/AAAAAAAABSg/baQydx9QJpIOj8EpDnA4pirAsqe8QSK7gCLcBGAs/s1600/75.png"; break;
		case 76: ogImage = "https://4.bp.blogspot.com/-xJVKZj3qRD4/XCh7CUXmIGI/AAAAAAAABSk/pMwk1A5luzYPdYetWg3hLIvte7cZqZdOACLcBGAs/s1600/76.png"; break;
		case 77: ogImage = "https://2.bp.blogspot.com/-kqJtZar3Ggk/XCh7CecfZzI/AAAAAAAABSo/IXzVWDR_U9EScRwBDdcFl4iN9gefQcWoACLcBGAs/s1600/77.png"; break;
		case 78: ogImage = "https://4.bp.blogspot.com/-AiWeyOoQyo8/XCh7CotTU9I/AAAAAAAABSs/JYYTG4mr58shI8nGhnGgyKbOB7NvEIaZQCLcBGAs/s1600/78.png"; break;
		case 79: ogImage = "https://3.bp.blogspot.com/-UDDR9UowrYk/XCh7DP5-7aI/AAAAAAAABSw/z_aN_ic_xiYnGKYTJxenBYCXgb33rO5egCLcBGAs/s1600/79.png"; break;
		case 80: ogImage = "https://2.bp.blogspot.com/-3ktIjUz5T0w/XCh7DuxwwpI/AAAAAAAABS4/0K36jrCxWFYw52n2EQDul_pDKmVZg6jBgCLcBGAs/s1600/80.png"; break;
		case 81: ogImage = "https://4.bp.blogspot.com/-fwYvi7Se5BQ/XCh7D_qmJKI/AAAAAAAABS8/oWAaJMeDq7EdZQ6jk_a6898dChvP9NEOACLcBGAs/s1600/81.png"; break;
		case 82: ogImage = "https://2.bp.blogspot.com/-Nd89CFb17tA/XCh7EGvbbGI/AAAAAAAABTA/K4Uw3beaoSoNh7WnzyR-HzZn6CijSbOnACLcBGAs/s1600/82.png"; break;
		case 83: ogImage = "https://1.bp.blogspot.com/-2dqMKoYZtlM/XCh7EWAE6II/AAAAAAAABTE/myrVOSRpHps75HWrShQthVFQ7usGw6aaACLcBGAs/s1600/83.png"; break;
		case 84: ogImage = "https://3.bp.blogspot.com/-13-4uBoUHUM/XCh7EozU-pI/AAAAAAAABTI/XK-arbXm-SA3pv4GJ7olFV9tpgoZyOqgQCLcBGAs/s1600/84.png"; break;
		case 85: ogImage = "https://3.bp.blogspot.com/-CMcZXu7FzvI/XCh7Ex_90uI/AAAAAAAABTM/8ixdylkvaOs5k2Vi0mtGEUVdk1YJ6wXxACLcBGAs/s1600/85.png"; break;
		case 86: ogImage = "https://3.bp.blogspot.com/-T4sD9lypHSk/XCh7FO3znVI/AAAAAAAABTQ/6_t7_g5ndowViQOU9IEYmcjbbSluo-g1wCLcBGAs/s1600/86.png"; break;
		case 87: ogImage = "https://3.bp.blogspot.com/-SqU6jPEzkoI/XCh7Fk_7eTI/AAAAAAAABTU/1VEvvDYNSr8shXty_pWUAYWjmtK6_x0aQCLcBGAs/s1600/87.png"; break;
		case 88: ogImage = "https://1.bp.blogspot.com/-7xrMofSwaoI/XCh7FtFNHBI/AAAAAAAABTY/3s3Afs9eBMITGUD9Itjy7DCJydBomt4mQCLcBGAs/s1600/88.png"; break;
		case 89: ogImage = "https://4.bp.blogspot.com/-k2CvY75XKfM/XCh7Fx7MWTI/AAAAAAAABTc/polyF8hc3oYckkSh-sR_BO51-DsEzASagCLcBGAs/s1600/89.png"; break;
		case 90: ogImage = "https://3.bp.blogspot.com/-JQhJKuKverE/XCh7GujwbBI/AAAAAAAABTk/t-XYr8vCMBoCoqQNgGM0wZEacNa5pt8DgCLcBGAs/s1600/90.png"; break;
		case 91: ogImage = "https://3.bp.blogspot.com/-JX7lyg1xkgY/XCh7GxQszbI/AAAAAAAABTo/KAJEYso5XpIhIAMSHnrm6EdQfzd2Jp16QCLcBGAs/s1600/91.png"; break;
		case 92: ogImage = "https://2.bp.blogspot.com/-xndSckvvz_U/XCh7HqoYRFI/AAAAAAAABTs/4cC7IqSDmyYtZ7A9kq2Ar0nRessghp4igCLcBGAs/s1600/92.png"; break;
		case 93: ogImage = "https://4.bp.blogspot.com/-FmTiOl5K0XU/XCh7H4a5qkI/AAAAAAAABTw/q0CLLRvEiGUyBzA1Iczz10bdKYxcbHCiQCLcBGAs/s1600/93.png"; break;
		case 94: ogImage = "https://3.bp.blogspot.com/-34pawMAYPJA/XCh7H16Gz0I/AAAAAAAABT0/FN1BGVW8zeMM878xdfZ2a67qjfsHkxJYACLcBGAs/s1600/94.png"; break;
		case 95: ogImage = "https://4.bp.blogspot.com/-dFgd_howDYw/XCh7IV9_gJI/AAAAAAAABT4/cogqPAeNArQVTrVIHekp5puRyIhTiYpqACLcBGAs/s1600/95.png"; break;
		case 96: ogImage = "https://4.bp.blogspot.com/-C8F2jNLK1IA/XCh7Iofw8hI/AAAAAAAABT8/54zyxc45pOw4GfZizYDHEN3cwle2lNchACLcBGAs/s1600/96.png"; break;
		case 97: ogImage = "https://1.bp.blogspot.com/-MxhWHHq1u6A/XCh7I2FpceI/AAAAAAAABUA/EVKs30xWPSklPr0YH6sydfcMHavescPJwCLcBGAs/s1600/97.png"; break;
		case 98: ogImage = "https://3.bp.blogspot.com/-63lwDqUApx8/XCh7JD9BvhI/AAAAAAAABUE/TDIkUfvX_Qc8EMWmulj6cGb17-utNxzQwCLcBGAs/s1600/98.png"; break;
		case 99: ogImage = "https://1.bp.blogspot.com/-uTeSLrwu5Ro/XCh7JYcEmdI/AAAAAAAABUI/YnQhpyQ7T8sQWVNlVObkDH6gCDTpqccggCLcBGAs/s1600/99.png"; break;
		case 100: ogImage = "https://1.bp.blogspot.com/-Zc3HbbSAxx8/XCh6sW3yeeI/AAAAAAAABOE/Pyl2Lg3i31Yt_-8VfQc1qs66fZFL1kb1ACLcBGAs/s1600/100.png"; break;
		default: ogImage = "";
	}
	console.log(score);
	console.log(ogImage);
	  
	FB.init(
	{		
		appId            : '235074027261158',
		autoLogAppEvents : true,
		xfbml            : true,
		version          : 'v3.1'		
	});
	FB.ui(
	{
		method: 'share_open_graph',
		action_type: 'og.shares',
		action_properties: JSON.stringify({
			object: {
				'og:url': ogUrl,
				'og:title': ogTitle,
				'og:description': ogDescription,
				'og:image': ogImage,
			},
		}),
	}, function (response) {});

}
