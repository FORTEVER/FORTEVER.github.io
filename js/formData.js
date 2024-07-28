var closeBtn = document.getElementById("colse_btn");//询盘关闭按钮
var showBtn = document.getElementsByClassName("showBtn").length==0?document.getElementById("showBtn"):document.getElementsByClassName("showBtn");//询盘打开按钮
var right_Inquiries_box = document.getElementById("form_data_box");//询盘showBtn
var dataBtn=document.getElementById("F_submit");
var close_state_box = document.getElementById("close_state_box");//追加
var forms={
    form_name : document.getElementById("form_name"),//name值
    form_email : document.getElementById("form_email"),//email值
    form_content : document.getElementById("form_content"),//content值
    form_country : document.getElementById("form_country"),//name值
    form_tel : document.getElementById("form_tel"),//email值
    form_choose : document.getElementById("form_choose")//content值
}
for(let i = 0;i<showBtn.length;i++){
  showBtn[i].onclick=function ()
  {
    clearTimeout(clears);
    startMove(close_state_box, 'right', -(right_Inquiries_box.offsetWidth==0?close_state_box.offsetWidth:right_Inquiries_box.offsetWidth),function(){
        close_state_box.style.display='none';
    });

    right_Inquiries_box.style.display='block';
    startMove(right_Inquiries_box, 'right', 0);
  };
}

closeBtn.onclick=function(){
  startMove(close_state_box, 'right', 0);
  close_state_box.style.display='block';
  startMove(right_Inquiries_box, 'right', -right_Inquiries_box.offsetWidth, function (){
    right_Inquiries_box.style.display='none';
  });
}
var clears=setTimeout(function(){
  close_state_box.style.display='block';
  startMove(close_state_box, 'right', 0);
  // right_Inquiries_box.style.display='block';
  // startMove(right_Inquiries_box, 'right', 0);
  // close_state_box.style.display='none';
  // startMove(close_state_box, 'right', -right_Inquiries_box.offsetWidth);
  clearTimeout(clears);
},5000);
dataBtn.addEventListener("click",formSubmit,false);
function formSubmit(){
  console.log("123");
  PromptText("name_Prompt","","none");
  PromptText("email_Prompt","","none");
  PromptText("content_Prompt","","none");
  var formdata = new FormData(document.getElementById("data_conter_box"));
  var email=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  if(forms.form_name.value==""&&forms.form_email.value==""&&forms.form_content.value==""){
    PromptText("name_Prompt","Name值不能为空！","block");
    PromptText("email_Prompt","E-mail值不能为空！","block");
    PromptText("content_Prompt","Content值不能为空！","block");
    return;
  }else{
    if(!email.test(forms.form_email.value)){
      PromptText("email_Prompt","E-mail格式错误！","block");
      return;
    }
  }
  if(forms.form_name.value==""){
    PromptText("name_Prompt","Name值不能为空！","block");
    return;
  }
  if(forms.form_email.value==""){
    PromptText("email_Prompt","E-mail值不能为空！","block");
    return;
  }
  if(forms.form_content.value==""){
    PromptText("content_Prompt","Content值不能为空！","block");
    return;
  }
  dataBtn.style.backgroundColor="#c1c1c1";
  dataBtn.removeEventListener("click",formSubmit,false);
  ajax({
    url:"/ajax/message",
    type:"post",
    data:formdata,
    processData: false,
    contentType: false,
    success:function (res){
      console.log(res)
      var data=JSON.parse(res);
      if(data.code=1){
        dataLayer.push({'event':'form-submitted'});
        dataBtn.style.backgroundColor="#424242";
        dataBtn.addEventListener("click",formSubmit,false);
        PromptModel("Mask",data.data,function(target){
          target.style.display="block";
          startMove(target,"opacity",70,function(){
            var clearTime=setTimeout(function(){
              startMove(target,"opacity",30,function(){
                target.style.display="none";
                startMove(right_Inquiries_box, 'right', -right_Inquiries_box.offsetWidth, function (){
                  right_Inquiries_box.style.display='none';
                });
                //追加
                close_state_box.style.display='block';
                startMove(close_state_box, 'right', 0);
              });
            },2000)
          });
        });
        PromptModel("Prompt_msg",data.data,function(target){
          target.style.display="block";
          startMove(target,"opacity",100,function(){
            var clearTime=setTimeout(function(){
              startMove(target,"opacity",0,function(){
                 target.style.display="none";
                 startMove(right_Inquiries_box, 'right', -right_Inquiries_box.offsetWidth, function (){
                   right_Inquiries_box.style.display='none';
                 });
                 //追加
                 close_state_box.style.display='block';
                 startMove(close_state_box, 'right', 0);
              });
            },2000)
          });
        });
        for (item in forms) {
          forms[item].value="";
        }
      }
    },
    error:function(){
      dataBtn.style.backgroundColor="#424242";
      dataBtn.addEventListener("click",formSubmit,false);
      PromptModel("Mask","服务器错误,请稍后重试！",function(target){
        dataBtn.addEventListener("click",formSubmit,false);
        startMove(target,"opacity",70,function(){
          var clearTime=setTimeout(function(){
            startMove(target,"opacity",30,function(){
              target.style.display="none";
            });
          },2000)
        });
      });
      PromptModel("Prompt_msg","服务器错误,请稍后重试！",function(target){
        target.style.display="block";
        startMove(target,"opacity",100,function(){
          var clearTime=setTimeout(function(){
            startMove(target,"opacity",0,function(){
               target.style.display="none";
            });
          },2000)
        });
      });
    }
  })
}
// var Back_to_top = document.getElementsByClassName("Back_to_top") || null;
// for(let i = 0;i<Back_to_top.length;i++){
//   Back_to_top[i].onclick=function (){
//     cancelAnimationFrame(timer);
//     var startTime = +new Date();
//     var b = document.body.scrollTop || document.documentElement.scrollTop;
//     var d = 350;
//     var c = b;
//     timer = requestAnimationFrame(function func(){
//         var t = d - Math.max(0,startTime - (+new Date()) + d);
//         document.documentElement.scrollTop = document.body.scrollTop = t * (-c) / d + b;
//         timer = requestAnimationFrame(func);
//         if(t == d){
//           cancelAnimationFrame(timer);
//         }
//     });
//   };
// }
$(function(){
  $(".Back_to_top").click(function() {
      $("html,body").animate({scrollTop:0}, 500);
  }); 
 })
function PromptText(targets,PromptText,display) {
  var target=document.getElementById(targets)
  target.innerText=PromptText;
  target.style.display=display;
}
function PromptModel(targets,PromptText,call) {
  var target=document.getElementById(targets)
  target.innerText=PromptText;
  if(call)call(target);
}
