//-------------
var survey = []; //Bidimensional array: [ [1,3], [2,4] ]
var ogUrl = "";
var ogTitle = "";
var ogDescription = "";
var ogImage = "";
var score = 0;
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
    //debug += "Nº " + survey[i][0] + " = " + survey[i][1] + "\n";
  };
  
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
		case 0:
			ogImage = "https://1.bp.blogspot.com/-KBEXvL64a2c/XBkO6rWKV9I/AAAAAAAABMQ/nsE5htq4GjIzAXgoApcfk0NkG2uoUqsGgCKgBGAs/s1600/t1_ys_0.png";
			break;
		case 10:
			ogImage = "https://2.bp.blogspot.com/-Vjpt-zfVx64/XBkO6iaUQyI/AAAAAAAABMQ/2OjXdlcL8sAq96fVg0l1bcXMQJN-Jor4ACKgBGAs/s1600/t1_ys_10.png";
			break;
		case 20:
			ogImage = "https://1.bp.blogspot.com/-acRdtE9rnW8/XBkO6nYUBfI/AAAAAAAABMQ/-zTfCuEncJIb56n2EUBw4oue48hVQZF2QCKgBGAs/s1600/t1_ys_20.png";
			break;
		case 30:
			ogImage = "https://4.bp.blogspot.com/-lKZg4nHpsaY/XBkO6q5XYyI/AAAAAAAABMQ/N0gwHq3zmncviXNG0UL-LHp5i-66t1XjACKgBGAs/s1600/t1_ys_30.png";
			break;
		case 40:
			ogImage = "https://1.bp.blogspot.com/-hWMaBBaPvu4/XBkO6ptH7fI/AAAAAAAABMQ/fyv1lLYOiPI8krAcLni_sxOqDp2Ulf2JwCKgBGAs/s1600/t1_ys_40.png";
			break;
		case 50:
			ogImage = "https://3.bp.blogspot.com/-aPgLB7BOKgA/XBkO6v3RarI/AAAAAAAABMQ/WXAwdhKfWqEh3GjJX0Hljbk2dKmq3PBKQCKgBGAs/s1600/t1_ys_50.png";
			break;		
		case 60:
			ogImage = "https://1.bp.blogspot.com/-L5_BJRpN7Aw/XBkO6qP-prI/AAAAAAAABMQ/VR_WhBbXbuQwh-0lzY977fMgY8EfBa_ZQCKgBGAs/s1600/t1_ys_60.png";
			break;
		case 70:
			ogImage = "https://4.bp.blogspot.com/-JVyUbuZTNb4/XBkO6iLEDAI/AAAAAAAABMQ/HRJ9rAKE6UkRNkSr9depi63hkfViu-boQCKgBGAs/s1600/t1_ys_70.png";
			break;
		case 80:
			ogImage = "https://2.bp.blogspot.com/-wctQCBWCX-g/XBkO6jl3sHI/AAAAAAAABMQ/qdFeYIH1DLInNVfga682XmUiwSdMQ8LkQCKgBGAs/s1600/t1_ys_80.png";
			break;
		case 90:
			ogImage = "https://1.bp.blogspot.com/-JASQxBTl58c/XBkO6rdFXRI/AAAAAAAABMQ/asvzKav0hg47ikt1r7h8rGbhIKlggOpawCKgBGAs/s1600/t1_ys_90.png";
			break;
		case 100:
			ogImage = "https://4.bp.blogspot.com/-qc1znkCVczk/XBkO6twprfI/AAAAAAAABMQ/l0mCMNiTpFEXAATJin_C35GHK-Au1yjFwCKgBGAs/s1600/t1_ys_100.png";
			break;		
		default:
			ogImage = "";
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
