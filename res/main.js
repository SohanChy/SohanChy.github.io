//Animate cards entry on scroll
    $(window).scroll(function() {
        $('#centerify').each(function(){
        var imagePos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+290) {
                $(this).addClass("slideUp");
            }
        });
    });

//Animate graphs entry on scroll
    $(window).scroll(function() {
        $('#landgraph').each(function(){
        var imagePos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+330) {
                $(this).addClass("pullUp");
            }
        });
    });


//Animate Scrolls to Divs

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


//<![CDATA[ 
$( document ).ready(function(){

//Begining Cover Splash
var vHeight = $(window).height(),
    vWidth = $(window).width(),
    cover = $('.cover');
    cover.css({"height":vHeight});

// main cards container
 centerify = $('.centerify');
// centerify.css({"width":vWidth});

//Navbar
  $(window).scroll(function () {
    if ($(window).scrollTop() >= vHeight-48) {
      $('#nav_bar').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < vHeight-48) {
      $('#nav_bar').removeClass('navbar-fixed');
    }
  });

//Typed
//Center the text
$('.covertyped').css("height", vHeight-53-(vHeight*.36) + 'px');
$('.covertyped').css("padding-top", vHeight-53-(vHeight*.550) + 'px');

$(function(){
      $("#typed").typed({
        strings: ["Hey there. :)     ‌", "I am <b>Sohan Chowdhury</b>","I mostly spend my time reading books, exploring the web, listening to music and coding...","This website is basically for acting as a index of whatever stuff I'm up to.","I'm a pretty bad procrastinator.","So most personal projects I start are usually done 40-55% and never finished.","Thats why you probably wont find anything of much interest here.","But since you're here anyway... ;)","...feel free to explore.^8000"],
        typeSpeed: 80,
        backDelay: 800,
            loop: true,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
      });
  });


//Cache the clone since we have to select it a couple of times
$clone = $('#cardClone');

//Set a global for the card we just clicked so we can track it
$lastelement = "";

//Set up an object for last clicked element so we know where to return to on collapse
lastelement = {
    'top': 0,
        'left': 0,
        'width': 0,
        'height': 0
};

//Set a flag to determine the current flip state of our clone
cloneflipped = false;



//Bind a handler to the clone so we can detect when the transition is done
$('#cardClone').on("transitionend webkitTransitionEnd oTransitionEnd", function (e) {
    if (e.target === e.currentTarget) {
        if (e.originalEvent.propertyName == 'top') {

            //Toggle the clone state
            cloneflipped = !cloneflipped;

            //Detect if our clone has returned to the original position and then hide it
            if (!cloneflipped) {
                $($lastelement).css('opacity', 1);
                $($clone).hide();
            } else {
                //Need to dynamically alter contents of the clone rear AFTER it animates? Do it here
                //$('#cloneBack').html('hi');
            }
        }
    }
});

//onclick stuff

//animate ANY CLICKED anchor div
$('[id^="anchor_"]').click( function() {
    $floatdiv = $(this).attr('id')+'L';
    $('div[name=' + $floatdiv + ']').addClass('floating');
});



$(".cards").click(function () {
    if (!cloneflipped) {
        //Cache clicked card
        $lastelement = $(this);

        //Store position of this element for the return trip
        //[hack: subtract 30 due to the margin of .cards in this demo]
        var offset = $lastelement.offset();
        lastelement.top = offset.top - 30 - $(document).scrollTop();
        lastelement.left = offset.left - 30;
        lastelement.height = $lastelement.height();
        lastelement.width = $lastelement.width();
        
        //BONUS: lets check to see if the clicked card is further to the left or the right of the screen
        //This way we can make the animation rotate inwards toward the center, google doesn't do this
        var rotatefront = "rotateY(180deg)";
        var rotateback = "rotateY(0deg)";
        if ((lastelement.left + lastelement.width / 2) > $(window).width() / 2) {
            rotatefront = "rotateY(-180deg)";
            rotateback = "rotateY(-360deg)";
        }


        //Copy contents of the clicked card into the clones front card
        $clone.find('#cloneFront').html($lastelement.html());


        //Show the clone on top of the clicked card and hide the clicked card
        //[hack: using opacity for hiding here, visibility:hidden has a weird lag in win chrome]
        $clone.css({
            'display': 'block',
                'top': lastelement.top,
                'left': lastelement.left,
                'height': lastelement.height,
                'width': lastelement.width
        });
        $lastelement.css('opacity', 0);

        //Need to dynamically alter contents of the clone rear BEFORE it animates? Do it here
        $('#cloneBack').html($('#placeholder').html());
        $('#cloneBack').html($('#'+$lastelement.attr('id')+'b').html());

        //Flip the card while centering it in the screen
        //[hack: we have to wait for the clone to finish drawing before calling the transform so we put it in a 100 millisecond settimeout callback]
        setTimeout(function () {
            $clone.css({
                'top': '15%',
                    'left': '20%',
                    'height': '60%',
                    'width': '60%'
            });
            $clone.find('#cloneFront').css({
                'transform': rotatefront
            });
            $clone.find('#cloneBack').css({
                'transform': rotateback
            });
            $clone.css("height", null);

        }, 100);
    } else {
        $('body').click();
    }
});


//If user clicks outside of the flipped card, return to default state
//Also Disable floating,Pulse for anchors
$('.iambody, .myname, .covertyped, .centerify, .nav_links, .landing').click(function (e) {

//anchors
$('div').removeClass('floating');

//card flips
    if (cloneflipped) {
        if (e.target === e.currentTarget) {
            //Reverse the animation
            $clone.css({
                'top': lastelement.top + 'px',
                    'left': lastelement.left + 'px',
                    'height': lastelement.height + 'px',
                    'width': lastelement.width + 'px'
            });
            $clone.find('#cloneFront').css({
                'transform': 'rotateY(0deg)'
            });
            $clone.find('#cloneBack').css({
                'transform': 'rotateY(-180deg)'
            });
        }
    }
});

});//]]>  
