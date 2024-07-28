//menu
$('.menu li').hover(function(){
    $(this).children('.sub_menu').fadeIn();
},function(){$(this).children('.sub_menu').fadeOut();})


//search
$('.search').click(function(){
    if($(this).hasClass('show')){
        $(this).removeClass('show');
        $('.search_form').removeClass('show');
    }else{
        $(this).addClass('show');
        $('.search_form').addClass('show');
        $('.search_form input[type="text"]').focus();
    }
});



//company
($('.panel-title a').click(function(){
    $('.panel-default .fa').removeClass('fa-angle-down');
    $('.panel-default .fa').addClass('fa-angle-right');
    if($(this).attr('aria-expanded')=="false"){
        $(this).children('.fa').removeClass('fa-angle-right');
        $(this).children('.fa').addClass('fa-angle-down');
    }else{        
        $(this).children('.fa').removeClass('fa-angle-down');
        $(this).children('.fa').addClass('fa-angle-right');
    }
}))


$(window).scroll(function(){
      var scTop = $(document).scrollTop();         
      if(scTop>200){
          $('.scrollTop').addClass('show');
      }else{
          $('.scrollTop').removeClass('show');
      }; 
      var showdiv = $('.header'); 
      if(scTop > 0){
          showdiv[0].classList.add('move');
      }else{
          showdiv[0].classList.remove('move');
      }       
      
      
});
if($('.home_page .header').length>0){
    $(window).scroll(function(){
        var scTop = $(document).scrollTop();
        var showdiv = $('.home_page .header');
        var home_ =   $('.home_page');
        var divtop = showdiv[0].getBoundingClientRect().top;
        if(divtop <= 0){
            home_[0].classList.add('posi');
            showdiv[0].classList.add('move');
        }else{
            home_[0].classList.remove('posi');
            showdiv[0].classList.remove('move');
        }
        if(scTop<=0){
          showdiv[0].classList.remove('move');
        }

    });    
}

$('.scrollTop').click(function(){
     var scTop = $(document).scrollTop();
     var speed=0.2*scTop;//滑动的速度
      $('body,html').animate({ scrollTop: 0 }, speed);
      return false;
});








$('#contact_form .btn').click(function(){
        var btn =  $(this);
        var html = btn.html();
        $(this).text('Loading');
        $(this).attr('disabled','disabled');

        /*表单验证*/

          var name = $('#contact_form input[name="name"]').val();
          var email = $('#contact_form input[name="email"]').val(); 
          var phone = $('#contact_form input[name="phone"]').val();               
          var information = $('#contact_form textarea[name="content"]').val();                     
         
          
          if(name == ''){
             $('.form_feedback span').html('The full name cannot be empty.');  
             $(".form_feedback").fadeIn(400,function(){$(".form_feedback span").fadeIn()}).delay(2000).fadeOut();
             $('#contact_form input[name="name"]').focus();
             btn.html(html);
             btn.removeAttr("disabled");
            return false;
          }
        
          if(email == ''){
             $('.form_feedback span').html('The email address cannot be empty.');  
             $(".form_feedback").fadeIn(400,function(){$(".form_feedback span").fadeIn()}).delay(2000).fadeOut();
             $('#contact_form input[name="email"]').focus();
             btn.html(html);
             btn.removeAttr("disabled");
              return false;
          }else{
            var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(!re.test(email)) {           
                 $('.form_feedback span').html('The email address you entered is wrong. Please enter again.');  
                 $(".form_feedback").fadeIn(400,function(){$(".form_feedback span").fadeIn()}).delay(2000).fadeOut();
                 $('#contact_form input[name="email"]').focus();
                 btn.html(html);
                 btn.removeAttr("disabled");
                 return false;
            }   
          }
          if(phone == ''){
             $('.form_feedback span').html('The phone number cannot be empty.');  
             $(".form_feedback").fadeIn(400,function(){$(".form_feedback span").fadeIn()}).delay(2000).fadeOut();
             $('#contact_form input[name="phone"]').focus();
             btn.html(html);
             btn.removeAttr("disabled");
            return false;
          }       
          if(information == ''){
             $('.form_feedback span').html('The inquiry content cannot be empty.');  
             $(".form_feedback").fadeIn(400,function(){$(".form_feedback span").fadeIn()}).delay(2000).fadeOut();
             $('#contact_form textarea[name="content"]').focus();
             btn.html(html);
             btn.removeAttr("disabled");
              return false;
          }                      
           

        var form = new FormData(document.getElementById("contact_form"));
        $.ajax({
             url: "/message/",
                type: "post",
                data: form,
                processData: false,
                contentType: false,
                success: function (data) {
                    if(data.status == 0){
                         $('.form_feedback span').html(data.msg);  
                         $(".form_feedback").fadeIn(400,function(){$(".form_feedback span").fadeIn()}).delay(2000).fadeOut();
                    }else{
                         $('.form_feedback span').html(data.data); 
                         $(".form_feedback").fadeIn(400,function(){$(".form_feedback span").fadeIn()}).delay(2000).fadeOut();
                                                  

                    }                       
                    btn.html(html);
                    btn.removeAttr("disabled");
                    $('#contact_us_form')[0].reset(); 
                    
                },
                error: function (e) {                   
                    $('.form_feedback span').html('<span>Server failure, please try again.</span>');
                    $(".form_feedback").fadeIn(400,function(){$(".form_feedback span").fadeIn()}).delay(2000).fadeOut();
                    btn.html(html);
                    btn.removeAttr("disabled");
                }
        });

});

