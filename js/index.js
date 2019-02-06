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
//---------------------------------------------
//-- QUIZ -------------------------------------
//-- OLD ---------------------
function getScore() {
	
	score = 0;
	var quest = $("#quiz ul");
	var chois = $("#quiz ul li input"); 		
	var answer = $("#quiz ul li input"); 	

	for (i=0; i<chois.length; i++) {
		
		answer.eq(i).css({'color':''}); 
		if (chois[i].checked == true && chois[i].value == "1") {
			score++;
		}

		if (chois[i].checked == true && chois[i].value == "0") {
			console.log('-------------------------------');
			console.log(answer.eq(i).parent());
			answer.eq(i).parent().css({'color':'#ff0000'}); 
		}
		
		
	}			
	
	score = Math.round(score/quest.length*100);
	$("#modal1Desc").html(score + "%")

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

	$('[data-remodal-id=modal]').remodal();


	
}	

function getAnswers() {
	
	var correctAnswers = "";

	var quest = $("#quiz ul");			
	var chois = $("#quiz ul li input"); 	
	var answer = $("#quiz ul li"); 	
	
	
	for (i=0; i<quest.length; i++) {
		var idx = i*chois.length/quest.length;

		for (j=idx; j<idx+chois.length/quest.length; j++) {
			if (chois[j].value == "1") {
				correctAnswers += "\tQestion " + (i+1) + ": " + answer.eq(j).text() + "\r\n";
				answer.eq(j).css({'color':'#0066ff'}); 
			}				
			
		}
	}			
	
	//alert("ANSWERS: \n"
	//		+ "▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬\n\n" 
	//		+ correctAnswers + "\n");
	
}	

function resetAnswers() {

	var chois = $("#quiz ul li input"); 	
	var answer = $("#quiz ul li"); 	

	for (i=0; i<chois.length; i++) {
		
		answer.eq(i).css({'color':''}); 				
		
	}			

}



//------------------- TICK QUIZ -------------------------------
function tickGetScore() {
	
	var score = 0;
	var quest = $("#quiz ul");
	var chois = $("#quiz ul li input"); 		
	var answer = $("#quiz ul li"); 	

	for (i=0; i<chois.length; i++) {
		
		answer.eq(i).css({'color':''}); 
		if (chois[i].checked == true && chois[i].value == "1") {
			score++;
		}

		if (chois[i].checked == true && chois[i].value == "0") {
			answer.eq(i).css({'color':'#ff0000'}); 
		}
		
		
	}			
	
	score = Math.round(score/quest.length*100);
	alert("▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬\n\n" 
			+ "\t\t\t\t SCORE: " + score + "%"
			+ "\n\n▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬\n");
	
}	

function tickGetAnswers() {
	
	var correctAnswers = "";

	var quest = $("#quiz ul");			
	var chois = $("#quiz ul li input"); 	
	var answer = $("#quiz ul li"); 	
	
	
	for (i=0; i<quest.length; i++) {
		var idx = i*chois.length/quest.length;

		for (j=idx; j<idx+chois.length/quest.length; j++) {
			if (chois[j].value == "1") {
				correctAnswers += "\tQestion " + (i+1) + ": " + answer.eq(j).text() + "\r\n";
				answer.eq(j).css({'color':'#0066ff'}); 
			}				
			
		}
	}			
	
	//alert("ANSWERS: \n"
	//		+ "▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬\n\n" 
	//		+ correctAnswers + "\n");
	
}	

function tickResetAnswers() {
	var chois = $("#quiz ul li input"); 	
	var answer = $("#quiz ul li"); 	

	for (i=0; i<chois.length; i++) {
		answer.eq(i).css({'color':''}); 				
	}			
}
//------------------- INPUT QUIZ -------------------------------
function inputGetScore() {
	var score = 0;
	var answer = $("#quiz input[type=text]"); 		

	for (i=0; i<answer.length; i++) {
		
		answer.eq(i).css({'color':'','background-color':''}); 
		if (answer[i].value == answer[i].name) {
			score++;
		} else {
			//answer.eq(i).css({'color':'#fff !important','background-color':'#f00'}); 
			answer.eq(i).attr('style', 'color: #fff !important;background-color:#f00');
		}
	}			
	
	score = Math.round(score/answer.length*100);
	alert("▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬\n\n" 
			+ "\t\t\t\t SCORE: " + score + "%"
			+ "\n\n▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬\n");
}	

function inputGetAnswers() {
	var answer = $("#quiz input[type=text]"); 		

	for (i=0; i<answer.length; i++) {
		if (answer[i].value == answer[i].name) {
			//answer.eq(i).css({'color':'#fff !important','background-color':'#0080FF'}); 
			answer.eq(i).attr('style', 'color: #fff !important;background-color:#0080FF');
		}
		else {
			if (answer[i].value.indexOf("(") == -1) {
				//answer.eq(i).css({'color':'#fff !important','background-color':'#f00'}); 
				answer.eq(i).attr('style', 'color: #fff !important;background-color:#f00');
				answer[i].value = answer[i].value + ' (' + answer[i].name + ') ';
			}
		}

	}
}	

function inputResetAnswers() {
	var answer = $("#quiz input[type=text]"); 	
	for (i=0; i<answer.length; i++) {
		answer.eq(i).css({'color':'','background-color':''});  				
	}			
}
//------------------------------------------------
$(function() {
$('#quiz li').click(function() {
      $(this).find('input:radio').prop('checked', true);
});
}); 

//-- QUIZ END-------------------------------------
//------------------------------------------------
//------------------------------------------------
function sharefbimage(title, description) {
	ogUrl = window.location.href;
	ogUrl = ogUrl.replace('#modal','');
	console.log(ogUrl);
	ogTitle = title;
	ogDescription = description;
	ogImage = "";

	switch(score) {
		case 0: ogImage = "https://4.bp.blogspot.com/-3tdRjvQePIc/XCiMWGkKIQI/AAAAAAAABVE/bXkCjE5Vt4AEffcghyReR98V7qwSA4c8gCLcBGAs/s1600-rj-c0xffffff/0.png"; break;
		case 1: ogImage = "https://1.bp.blogspot.com/-hCgIZKbG_g8/XCiOVZGYfSI/AAAAAAAABVY/SE2otvDvofMD02_4Tbj1LgUf-rIsmiw-wCLcBGAs/s1600-rj-c0xffffff/1.png"; break;
		case 2: ogImage = "https://3.bp.blogspot.com/-oaeiqw91hbk/XCiOY07kjNI/AAAAAAAABWA/TIMRkg4id-EddzUwUHStX18LSZXc3HcBgCLcBGAs/s1600-rj-c0xffffff/2.png"; break;
		case 3: ogImage = "https://4.bp.blogspot.com/--y1tSiwEvrc/XCiOcfU6rmI/AAAAAAAABWs/3vE1SRa_Cyg4IJT9gfxlSrUt13kbpxnnwCLcBGAs/s1600-rj-c0xffffff/3.png"; break;
		case 4: ogImage = "https://2.bp.blogspot.com/-KSMP1gATQaA/XCiOf5D2VaI/AAAAAAAABXY/zSaw-a2q6mkoSzBYLClevfbZ9_cGJ2uCACLcBGAs/s1600-rj-c0xffffff/4.png"; break;
		case 5: ogImage = "https://4.bp.blogspot.com/-4N4fDQo-ME0/XCiOjAuQWoI/AAAAAAAABYE/1e1lcvpb9a0D-YZmcBtly04tnX8em-_CACLcBGAs/s1600-rj-c0xffffff/5.png"; break;
		case 6: ogImage = "https://2.bp.blogspot.com/-KVRWxLpGeos/XCiOm85cDjI/AAAAAAAABYw/x_f8pGNLvngvSnUpVoJ0OQ-TBTUOIiliQCLcBGAs/s1600-rj-c0xffffff/6.png"; break;
		case 7: ogImage = "https://1.bp.blogspot.com/-MlK4Rc2jx88/XCiOqPELPnI/AAAAAAAABZc/aka7pWCk2R4-4pbG3Ej14A_l7cJkEf09gCLcBGAs/s1600-rj-c0xffffff/7.png"; break;
		case 8: ogImage = "https://3.bp.blogspot.com/-4Qn2cKfI50s/XCiOtTujLbI/AAAAAAAABaI/jJo_IefOXXgChx7eWWHZF46hoixvV0C7ACLcBGAs/s1600-rj-c0xffffff/8.png"; break;
		case 9: ogImage = "https://2.bp.blogspot.com/-Qkj0AmGtfug/XCiOwklrGvI/AAAAAAAABa0/O_4PF1wLJokeb5HnHBuD6lYQ83mrK_uGACLcBGAs/s1600-rj-c0xffffff/9.png"; break;
		case 10: ogImage = "https://3.bp.blogspot.com/-_OnDa_bXKus/XCiOVY8q4jI/AAAAAAAABVU/jatyeE3R0AIMBhvWVya_XryX0KwHtRxbwCLcBGAs/s1600-rj-c0xffffff/10.png"; break;
		case 11: ogImage = "https://2.bp.blogspot.com/-pxU1XKBeIYA/XCiOWD55ENI/AAAAAAAABVc/LXtiY1ZyVI4cSiJk88HMMOsN_06IiVbeACLcBGAs/s1600-rj-c0xffffff/11.png"; break;
		case 12: ogImage = "https://4.bp.blogspot.com/-zmg3gPwzOGM/XCiOWUh1VnI/AAAAAAAABVg/v9OV1_-MJn8Zrgj7-Ve_ihvcocVVqe_FgCLcBGAs/s1600-rj-c0xffffff/12.png"; break;
		case 13: ogImage = "https://3.bp.blogspot.com/-p5A38YcTeSY/XCiOWihe3fI/AAAAAAAABVk/d8cSz1HUsV8MT80KmYp--Y8N1Iq8EG4hACLcBGAs/s1600-rj-c0xffffff/13.png"; break;
		case 14: ogImage = "https://2.bp.blogspot.com/-M7fOXzrklPw/XCiOXDS8aqI/AAAAAAAABVo/A3fL7U-By4cUydGLJ9xqYZeKJ6EWlMQngCLcBGAs/s1600-rj-c0xffffff/14.png"; break;
		case 15: ogImage = "https://4.bp.blogspot.com/--_JmWXD9KS4/XCiOXdXo7cI/AAAAAAAABVs/djHwWDygnnAiTf0vS4GvHV7Oh4tyMlmMQCLcBGAs/s1600-rj-c0xffffff/15.png"; break;
		case 16: ogImage = "https://2.bp.blogspot.com/-h3bbPuw2LLs/XCiOXS7R7jI/AAAAAAAABVw/PGQs05hFJck4xZdmV62X2OT-CbJj1wb0wCLcBGAs/s1600-rj-c0xffffff/16.png"; break;
		case 17: ogImage = "https://2.bp.blogspot.com/-eWKBI1VQQRk/XCiOYEdzbOI/AAAAAAAABV0/JeoJohtxNoYuX0Aae-fpHzsJq8vUL2nCACLcBGAs/s1600-rj-c0xffffff/17.png"; break;
		case 18: ogImage = "https://2.bp.blogspot.com/-9i6bsvyAzos/XCiOYevMVpI/AAAAAAAABV4/eMMomhKVKOUPic056L1yZ24dbDr6quJVgCLcBGAs/s1600-rj-c0xffffff/18.png"; break;
		case 19: ogImage = "https://2.bp.blogspot.com/-Ddz8DcG0vkc/XCiOYnZPaCI/AAAAAAAABV8/xcLiOyoGpTg4930V4MKxHec232bfRh1QQCLcBGAs/s1600-rj-c0xffffff/19.png"; break;
		case 20: ogImage = "https://3.bp.blogspot.com/-2Q_1tuER8cg/XCiOZeApkKI/AAAAAAAABWE/M19okDmHXYEgqiU9lqbi0_om78hCMkFKgCLcBGAs/s1600-rj-c0xffffff/20.png"; break;
		case 21: ogImage = "https://1.bp.blogspot.com/-UCCQpvc6NTc/XCiOZ2K_CKI/AAAAAAAABWI/U_w0Ra6qyRM0CENKqj9oRS45lcu0AO3kwCLcBGAs/s1600-rj-c0xffffff/21.png"; break;
		case 22: ogImage = "https://1.bp.blogspot.com/-86OvdVIUgLM/XCiOZyPsvkI/AAAAAAAABWM/oOH4T-j7KkMkIMN5ostkuZfdk-z1Bw0egCLcBGAs/s1600-rj-c0xffffff/22.png"; break;
		case 23: ogImage = "https://4.bp.blogspot.com/-qNMCW1qhXhI/XCiOaadVnII/AAAAAAAABWQ/zixGBUsJBV4mcCGxdEP0OmATgcNqm9UtACLcBGAs/s1600-rj-c0xffffff/23.png"; break;
		case 24: ogImage = "https://2.bp.blogspot.com/-qw_1F5QZVCI/XCiOardNV8I/AAAAAAAABWU/3Rp98-RcQgsPHCrFedc3tkPDzFq65q_rgCLcBGAs/s1600-rj-c0xffffff/24.png"; break;
		case 25: ogImage = "https://4.bp.blogspot.com/-YIVwgZmPiu4/XCiOapX-RnI/AAAAAAAABWY/Cn9ilqebO4AIRQh1ThDcZpra3b8gwkz_ACLcBGAs/s1600-rj-c0xffffff/25.png"; break;
		case 26: ogImage = "https://4.bp.blogspot.com/-o9nQLCurhLA/XCiObVAmQRI/AAAAAAAABWc/zootWOMu0AAvmCFxV_TGocrYfRMTi9eMACLcBGAs/s1600-rj-c0xffffff/26.png"; break;
		case 27: ogImage = "https://2.bp.blogspot.com/-7GBrqoPWQO8/XCiObj8-XcI/AAAAAAAABWg/hi7VCp9PhhUYvNiY0CgV6VLacAmfNXX_ACLcBGAs/s1600-rj-c0xffffff/27.png"; break;
		case 28: ogImage = "https://3.bp.blogspot.com/-RlOVpBWirCg/XCiObu39Z7I/AAAAAAAABWk/72amsL_Bq0QabUgOvNaOWepsutai7aIogCLcBGAs/s1600-rj-c0xffffff/28.png"; break;
		case 29: ogImage = "https://2.bp.blogspot.com/-QnUB1o_Mq_A/XCiOcBEqdlI/AAAAAAAABWo/ejO7AgGSt7MTZTJ4INywDnbOMHJdBslGgCLcBGAs/s1600-rj-c0xffffff/29.png"; break;
		case 30: ogImage = "https://3.bp.blogspot.com/-2uLScc-ddow/XCiOchA8reI/AAAAAAAABWw/ITw_6REa0EYBYN8s8jkDhfv9LCqzw7DngCLcBGAs/s1600-rj-c0xffffff/30.png"; break;
		case 31: ogImage = "https://1.bp.blogspot.com/-YNbKpTMMV5M/XCiOdBRMAiI/AAAAAAAABW0/M-zStYZaoEYgSWLhw1j1oIzcOteIEu55wCLcBGAs/s1600-rj-c0xffffff/31.png"; break;
		case 32: ogImage = "https://2.bp.blogspot.com/-8DgNv2MYa0s/XCiOdTNnXkI/AAAAAAAABW4/0oarIJH886oIadZbOCx739C-KG59w4lEwCLcBGAs/s1600-rj-c0xffffff/32.png"; break;
		case 33: ogImage = "https://3.bp.blogspot.com/-Rtx-YvT_lxY/XCiOdbmGiFI/AAAAAAAABW8/LZ5Ce62GQgsusBPeL_mpNO2ELoJEJ1evACLcBGAs/s1600-rj-c0xffffff/33.png"; break;
		case 34: ogImage = "https://1.bp.blogspot.com/-4visARNsprg/XCiOd1xRSRI/AAAAAAAABXA/rsYhie49OLwZBMFnx_V9z9_FcKpkIYcowCLcBGAs/s1600-rj-c0xffffff/34.png"; break;
		case 35: ogImage = "https://3.bp.blogspot.com/-aR5lHhgewCQ/XCiOepBDo7I/AAAAAAAABXE/_bo-pbVHpMQ1J1PAwT4QYOvn0m8ge-SzACLcBGAs/s1600-rj-c0xffffff/35.png"; break;
		case 36: ogImage = "https://3.bp.blogspot.com/-WCYVPpA9kwo/XCiOet2LuwI/AAAAAAAABXI/693AY4baZ_wQTRcRr8_FhDOCOhPmKdJZQCLcBGAs/s1600-rj-c0xffffff/36.png"; break;
		case 37: ogImage = "https://4.bp.blogspot.com/-Eqnm-JGirvI/XCiOe5JQ3qI/AAAAAAAABXM/EpnBueSofTMVWFl-jYJSth_CIX9aBwAKgCLcBGAs/s1600-rj-c0xffffff/37.png"; break;
		case 38: ogImage = "https://2.bp.blogspot.com/-LGO_bjVS_8E/XCiOflAf9FI/AAAAAAAABXQ/E0AMwBY9Ij0f5JDC7r6iXdnvj1cIP4PiwCLcBGAs/s1600-rj-c0xffffff/38.png"; break;
		case 39: ogImage = "https://4.bp.blogspot.com/-EaQ5HFHEKyo/XCiOf96qDXI/AAAAAAAABXU/SKhRhsG5Y6U9yWzXYY2W4VhFtTdig6TiACLcBGAs/s1600-rj-c0xffffff/39.png"; break;
		case 40: ogImage = "https://3.bp.blogspot.com/-VbiJXF-ZwYQ/XCiOgeNI_kI/AAAAAAAABXc/a97i58PWCKoCjscVC6ipsjGkh4wKR0ZXACLcBGAs/s1600-rj-c0xffffff/40.png"; break;
		case 41: ogImage = "https://2.bp.blogspot.com/-SQxexsKbAlQ/XCiOgoSqrVI/AAAAAAAABXg/mCmWmfVKmLEvU9o-F2MNL0cdyKdFz8ZxwCLcBGAs/s1600-rj-c0xffffff/41.png"; break;
		case 42: ogImage = "https://2.bp.blogspot.com/-t0Wv82CmHVY/XCiOg4NmnYI/AAAAAAAABXk/S68eKxaypGIhmxDCi-WtYJOYxT2fsa5EACLcBGAs/s1600-rj-c0xffffff/42.png"; break;
		case 43: ogImage = "https://1.bp.blogspot.com/-g1vnxXxw3ZE/XCiOhdCnhvI/AAAAAAAABXo/Cr9d541yUQkRVyPpMMEXNkWddvGccgICACLcBGAs/s1600-rj-c0xffffff/43.png"; break;
		case 44: ogImage = "https://4.bp.blogspot.com/-Yi4RyK3Yxzw/XCiOhs1O-MI/AAAAAAAABXs/IBak-deBUssNA4bgCMFZqknwfLihOQPLACLcBGAs/s1600-rj-c0xffffff/44.png"; break;
		case 45: ogImage = "https://3.bp.blogspot.com/-KjV1X97HdOo/XCiOh8PUd5I/AAAAAAAABXw/P3eP89iyPr4U-EHTspErozuMPN0wrHQaACLcBGAs/s1600-rj-c0xffffff/45.png"; break;
		case 46: ogImage = "https://2.bp.blogspot.com/-lEI27fgEoEs/XCiOiMYVZ6I/AAAAAAAABX0/r84p4imbsCsUqbs7WoCdQxu0JhqDc7FoQCLcBGAs/s1600-rj-c0xffffff/46.png"; break;
		case 47: ogImage = "https://3.bp.blogspot.com/-2MpjqtMi8IM/XCiOif-m2oI/AAAAAAAABX4/6hU8nRFZsforEWxyaXdp6bjSJsALWagxACLcBGAs/s1600-rj-c0xffffff/47.png"; break;
		case 48: ogImage = "https://4.bp.blogspot.com/-1URRpl_ujGk/XCiOirOashI/AAAAAAAABX8/0gc8RXoNnKAouPHeGhoCRywmthaO6UAwgCLcBGAs/s1600-rj-c0xffffff/48.png"; break;
		case 49: ogImage = "https://3.bp.blogspot.com/-wch37LDI-Eo/XCiOjHUH5uI/AAAAAAAABYA/XbyKa9mH-v4HEnMTvRcpZGnGqpFNLhVVACLcBGAs/s1600-rj-c0xffffff/49.png"; break;
		case 50: ogImage = "https://1.bp.blogspot.com/-PJBs_yCiSAY/XCiOjncKJnI/AAAAAAAABYI/MjGVsn0MAfQNS1aeRMDAgvFT36I__xZvwCLcBGAs/s1600-rj-c0xffffff/50.png"; break;
		case 51: ogImage = "https://1.bp.blogspot.com/-WR-yYb6ETSw/XCiOj7GtZvI/AAAAAAAABYM/SUW1XVs9m3MOVtqjmbf_oRhwHjFyQTDbQCLcBGAs/s1600-rj-c0xffffff/51.png"; break;
		case 52: ogImage = "https://3.bp.blogspot.com/-heGZ6o8K7mI/XCiOkK73aqI/AAAAAAAABYQ/J8QhgeMzlYg_uMjcRv74jRIMbEG-sL4KACLcBGAs/s1600-rj-c0xffffff/52.png"; break;
		case 53: ogImage = "https://2.bp.blogspot.com/-ag3z8nSNoaU/XCiOkjqiCOI/AAAAAAAABYU/C2iHwd5q5lkquVfC_jSFLWjTj-NjD9_cQCLcBGAs/s1600-rj-c0xffffff/53.png"; break;
		case 54: ogImage = "https://2.bp.blogspot.com/-IJjLhPyWAuY/XCiOlC1p7hI/AAAAAAAABYY/bEGWseWFGlEng6t_RIv7FxtcXD7Yv2pTgCLcBGAs/s1600-rj-c0xffffff/54.png"; break;
		case 55: ogImage = "https://1.bp.blogspot.com/-E9YMgfg0so8/XCiOlbgGK4I/AAAAAAAABYc/BdVnFBaeEKcdnj6d924yCMQ9Nlf-a2NNQCLcBGAs/s1600-rj-c0xffffff/55.png"; break;
		case 56: ogImage = "https://4.bp.blogspot.com/-4rTPCCM62-M/XCiOlb8CSDI/AAAAAAAABYg/h2P5kdgrimAGI77fF-ytMZaY0UgtZHIAwCLcBGAs/s1600-rj-c0xffffff/56.png"; break;
		case 57: ogImage = "https://3.bp.blogspot.com/-sZmTROCGA0Q/XCiOlyq0YyI/AAAAAAAABYk/9IO4POUp014NvP-zz9aZyyrxrcVDJvg0QCLcBGAs/s1600-rj-c0xffffff/57.png"; break;
		case 58: ogImage = "https://1.bp.blogspot.com/-oRSacDP3xys/XCiOmfWL-8I/AAAAAAAABYo/sbdOn6mjfPg7-NsyqPbi27czJyi10RPzgCLcBGAs/s1600-rj-c0xffffff/58.png"; break;
		case 59: ogImage = "https://3.bp.blogspot.com/-1Han--7yg-8/XCiOmTBXCII/AAAAAAAABYs/9XBMtkacoQULHUcASu3kCS2LTfJ7wLG1wCLcBGAs/s1600-rj-c0xffffff/59.png"; break;
		case 60: ogImage = "https://2.bp.blogspot.com/-k3V0uISf_jY/XCiOnLxGJMI/AAAAAAAABY0/H8Sztz6H3fkxANG1lYc5DreUrnuT_fHfACLcBGAs/s1600-rj-c0xffffff/60.png"; break;
		case 61: ogImage = "https://1.bp.blogspot.com/-XVF9XYP2_A0/XCiOnZgXg9I/AAAAAAAABY4/T3b0kGMwMVQRpIqi-YsGXrK4f7cV6SFMgCLcBGAs/s1600-rj-c0xffffff/61.png"; break;
		case 62: ogImage = "https://3.bp.blogspot.com/-zd-W3lWJsus/XCiOn1S5geI/AAAAAAAABY8/y_pwfvlz158sv1Q4U3o38HKbCqeVQYNkACLcBGAs/s1600-rj-c0xffffff/62.png"; break;
		case 63: ogImage = "https://3.bp.blogspot.com/-TD2qvZ4M3fc/XCiOoKU5m0I/AAAAAAAABZA/7ZfuvrbpP2I1OH-URGX8k1VqgeKOexAZgCLcBGAs/s1600-rj-c0xffffff/63.png"; break;
		case 64: ogImage = "https://2.bp.blogspot.com/-fnScZ4vK2rI/XCiOofUbVbI/AAAAAAAABZE/YsjCxn365FQHU67IOLyT9xZcV20J6AicwCLcBGAs/s1600-rj-c0xffffff/64.png"; break;
		case 65: ogImage = "https://1.bp.blogspot.com/-uU1aY_XVJ70/XCiOoqZmmrI/AAAAAAAABZI/0uZNrKGjAR8YIMpRN2X1X_KansmFc5eGACLcBGAs/s1600-rj-c0xffffff/65.png"; break;
		case 66: ogImage = "https://3.bp.blogspot.com/-jJfm69Y-87Y/XCiOoxoyRDI/AAAAAAAABZM/q_6SKAUdy0klx4gv3blHgxTH4P9tc1TRACLcBGAs/s1600-rj-c0xffffff/66.png"; break;
		case 67: ogImage = "https://4.bp.blogspot.com/-rShKIbfUbNk/XCiOpEGBi1I/AAAAAAAABZQ/-Nkj_X2HYeser0VIlwPu920cdNXM55hQQCLcBGAs/s1600-rj-c0xffffff/67.png"; break;
		case 68: ogImage = "https://1.bp.blogspot.com/-uPVYkfB2BSY/XCiOphIWLZI/AAAAAAAABZU/byYMA8m6CP0ZUYbm5p6UZPPxjB9JAI_UgCLcBGAs/s1600-rj-c0xffffff/68.png"; break;
		case 69: ogImage = "https://3.bp.blogspot.com/-jbED48FuC9k/XCiOp0G8e4I/AAAAAAAABZY/KGeOWrv8a80rimnJ-OIbSGdUB2LRg5vigCLcBGAs/s1600-rj-c0xffffff/69.png"; break;
		case 70: ogImage = "https://3.bp.blogspot.com/-wZD3OttlKEY/XCiOqXFuQxI/AAAAAAAABZg/tB7bS80uyZ8VvuCQ0NZ2SD7VBB2n1aprgCLcBGAs/s1600-rj-c0xffffff/70.png"; break;
		case 71: ogImage = "https://3.bp.blogspot.com/-8WB2-qHjcS4/XCiOq-NLsEI/AAAAAAAABZk/grYA_dCrmJ8lM9jVnFJIrMUGgGxawDJXgCLcBGAs/s1600-rj-c0xffffff/71.png"; break;
		case 72: ogImage = "https://4.bp.blogspot.com/-beOjq916eKI/XCiOq3tNQMI/AAAAAAAABZo/MeB2ZHN9elgBFLUzuGQeslYfdUA-HlbxgCLcBGAs/s1600-rj-c0xffffff/72.png"; break;
		case 73: ogImage = "https://2.bp.blogspot.com/-XdRWITstKJk/XCiOrXuw2PI/AAAAAAAABZs/yzTS3PkwGs4z9uk0d_Xtnoep91sh7F-swCLcBGAs/s1600-rj-c0xffffff/73.png"; break;
		case 74: ogImage = "https://2.bp.blogspot.com/-nP8ghMp7XP8/XCiOrolrJYI/AAAAAAAABZw/GtkumCxwchsUSX2PApcs2NMd1Xs-4krNQCLcBGAs/s1600-rj-c0xffffff/74.png"; break;
		case 75: ogImage = "https://4.bp.blogspot.com/-qoqdcTunh6w/XCiOrvbJGPI/AAAAAAAABZ0/h6ZRXQ7mzSo3rwHDk0y__XRAGIAqUKd6QCLcBGAs/s1600-rj-c0xffffff/75.png"; break;
		case 76: ogImage = "https://1.bp.blogspot.com/-03h72VRb1aA/XCiOsByZumI/AAAAAAAABZ4/d5W-sGQt9_MTlP7aPiinayh9yxCOTZYJACLcBGAs/s1600-rj-c0xffffff/76.png"; break;
		case 77: ogImage = "https://2.bp.blogspot.com/-jXvveDb-PyU/XCiOsUXht5I/AAAAAAAABZ8/Z73aW9cfqwgWrEwiXlJefRFl1W-JSNS5ACLcBGAs/s1600-rj-c0xffffff/77.png"; break;
		case 78: ogImage = "https://2.bp.blogspot.com/-Lzw0yxcXf_E/XCiOshsGeqI/AAAAAAAABaA/olsEstZqZoYP7dMcDn1jVzqc0NKYiVLbQCLcBGAs/s1600-rj-c0xffffff/78.png"; break;
		case 79: ogImage = "https://1.bp.blogspot.com/-mfcL-ywJqE0/XCiOtHBaNkI/AAAAAAAABaE/qx3acq6AM-UjWZ-DB7z1PD1P2fOr24S9ACLcBGAs/s1600-rj-c0xffffff/79.png"; break;
		case 80: ogImage = "https://3.bp.blogspot.com/-xKg6KeIj_Y4/XCiOtWqe7FI/AAAAAAAABaM/-fEJrOa-dIAiyIHgvLk7KcJZ4XWfhPItACLcBGAs/s1600-rj-c0xffffff/80.png"; break;
		case 81: ogImage = "https://4.bp.blogspot.com/-wRKB98eQ9Ec/XCiOuE0Wu1I/AAAAAAAABaQ/t8XQKY-qroQFp_8xAs76-xZlNyiLDFP1ACLcBGAs/s1600-rj-c0xffffff/81.png"; break;
		case 82: ogImage = "https://4.bp.blogspot.com/-60YrlExGlkc/XCiOuA9ViEI/AAAAAAAABaU/eN7gm_Z1mLELoZPsyDgGbKioRefmDj7FwCLcBGAs/s1600-rj-c0xffffff/82.png"; break;
		case 83: ogImage = "https://3.bp.blogspot.com/-XbVlrkAO0yk/XCiOuTkQYiI/AAAAAAAABaY/Z5iCVJEDULMcp2hUnrooJ7giYQo9nAv3ACLcBGAs/s1600-rj-c0xffffff/83.png"; break;
		case 84: ogImage = "https://3.bp.blogspot.com/-NNyCRVmeHMo/XCiOuwGr2CI/AAAAAAAABac/thEyHsCXR8gf9E8n7UQ2ffMiWurD7TYBACLcBGAs/s1600-rj-c0xffffff/84.png"; break;
		case 85: ogImage = "https://2.bp.blogspot.com/-QWGOw01QgyY/XCiOvNWdrFI/AAAAAAAABag/oUrytYCoO8QeqkXUjtH0_V8VjsuJU1HFwCLcBGAs/s1600-rj-c0xffffff/85.png"; break;
		case 86: ogImage = "https://4.bp.blogspot.com/-4LsYyxLPO98/XCiOvazaxUI/AAAAAAAABak/l3Nw5VY-5yAc7lU8zYU6hBOllfd9g1hDwCLcBGAs/s1600-rj-c0xffffff/86.png"; break;
		case 87: ogImage = "https://3.bp.blogspot.com/-TW9I7wiQqK4/XCiOv6XzXcI/AAAAAAAABao/N2aKQgvoipoAIc9bHu2BqdUp27Yd1Fa-wCLcBGAs/s1600-rj-c0xffffff/87.png"; break;
		case 88: ogImage = "https://3.bp.blogspot.com/-_sw8pg7SbBA/XCiOwBRGEWI/AAAAAAAABas/lfgXdKmFLaUX8UumGeo04P5m_L492OAVgCLcBGAs/s1600-rj-c0xffffff/88.png"; break;
		case 89: ogImage = "https://4.bp.blogspot.com/-bRuuHEMRzic/XCiOwC-WQnI/AAAAAAAABaw/_qkZvW6mNW4mV-CYuzY11W5TgA4Zx8wXwCLcBGAs/s1600-rj-c0xffffff/89.png"; break;
		case 90: ogImage = "https://2.bp.blogspot.com/-yMMNrvINie4/XCiOw2KBySI/AAAAAAAABa4/5XH9u6O9FZsLSEQWlQT69ico1LVVbiccACLcBGAs/s1600-rj-c0xffffff/90.png"; break;
		case 91: ogImage = "https://1.bp.blogspot.com/-4LZsg4DnfAM/XCiOxNa5NdI/AAAAAAAABa8/zObWGc4JCWQj36ZU7B6T49OxAWpyjRVTQCLcBGAs/s1600-rj-c0xffffff/91.png"; break;
		case 92: ogImage = "https://1.bp.blogspot.com/-BJm4vbGkA1E/XCiOxkZcvmI/AAAAAAAABbA/CCygfk9ST6c_CEoX1vhTVWsIeaHEMQS7gCLcBGAs/s1600-rj-c0xffffff/92.png"; break;
		case 93: ogImage = "https://1.bp.blogspot.com/-0D67XG4Vt_8/XCiOxgGuF0I/AAAAAAAABbE/qi_REQp8JEkRrjT0p0Btp_eiXoqZGP6BACLcBGAs/s1600-rj-c0xffffff/93.png"; break;
		case 94: ogImage = "https://4.bp.blogspot.com/-5HS2EK_kcVU/XCiOxz8OdSI/AAAAAAAABbI/9eysqJieGCo3IHYcMzCz7KIpIEif1CONwCLcBGAs/s1600-rj-c0xffffff/94.png"; break;
		case 95: ogImage = "https://3.bp.blogspot.com/-EZySwEQtUNg/XCiOyUtHOOI/AAAAAAAABbM/SOKsDGoMMt8L5DTYR5loceSgtNOveaNNQCLcBGAs/s1600-rj-c0xffffff/95.png"; break;
		case 96: ogImage = "https://3.bp.blogspot.com/-lvs1PR7qNqE/XCiOyvnty3I/AAAAAAAABbQ/I4p0CLMrrH447M3vQW8Oh45zWxhv_3uiQCLcBGAs/s1600-rj-c0xffffff/96.png"; break;
		case 97: ogImage = "https://3.bp.blogspot.com/-G4PiMz_-V0w/XCiOy3cgh4I/AAAAAAAABbU/i_mumZYIg_I4JFh70re2XhQTC5POVLhGwCLcBGAs/s1600-rj-c0xffffff/97.png"; break;
		case 98: ogImage = "https://1.bp.blogspot.com/-QOZCK8vsNww/XCiOzKwlpVI/AAAAAAAABbY/Ky1qSuztpZ0QqY2ijdC5rcSxXNui5UaJACLcBGAs/s1600-rj-c0xffffff/98.png"; break;
		case 99: ogImage = "https://4.bp.blogspot.com/-qbqGeDpCpEI/XCiOzaAs5bI/AAAAAAAABbc/341u4gVi2UIp_IbthjAShZVxWJZ5sp5rACLcBGAs/s1600-rj-c0xffffff/99.png"; break;
		case 100: ogImage = "https://3.bp.blogspot.com/-lNt9ewSLKBQ/XCiOVdQ3b0I/AAAAAAAABVQ/2VyKW5pUj0U9KVIEZG5_A6PSSO6j6zlwgCLcBGAs/s1600-rj-c0xffffff/100.png"; break;
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
				'og:image:width': 600,
				'og:image:height': 315
			},
		}),
	}, function (response) {});

}
