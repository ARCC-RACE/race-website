
(function($) {
  "use strict";

  // Vars
  var $body = $('body'),
    $preloader = $('#preloader'),
    preloaderDelay = 1200,
    preloaderFadeOutTime = 500,
    $siteHeader = $('.site-header'),
    $navToggle = $('#navigation-toggle'),
    firstPart = 'home';

  function getWindowWidth() {
    return Math.max($(window).width(), window.innerWidth);
  }

  function getWindowHeight() {
    return Math.max($(window).height(), window.innerHeight );
  }

  function getDocumentWidth() {
    return Math.max($(document).width(), document.body.clientWidth);
  }

  function preloader() {
    $preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
  }

  function pageLayout() {
    var siteParts = $('.site-part').length,
      sitePartsWidth = siteParts * getDocumentWidth();

    $('.site-part').css( 'width', getDocumentWidth() );
    $('.site-content-inner').css( 'width', sitePartsWidth );

    if ( getWindowWidth() >= 992  ) {
      $navToggle.removeClass('open');
      $('.header-collapse').css('display', 'block');
    } else {
      // $('#navigation-toggle').click();
    }
  }

  function backgrounds() {

    // Youtube Video
    if ($('#youtube-background').length > 0) {
      var videos = [
        {videoURL: "https://youtu.be/_JjSQDFJ3QA", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0 ,opacity:1, loop:true, showYTLogo:false, realfullscreen: true, addRaster:true}
      ];

      $('.player').YTPlaylist(videos, true);
    }

  }

  // [3. Navigation]
  function showSitePart(target) {
    if( $( target ).length > 0 ) {
      if ( $( target ).hasClass('active') ){
        return false;
      }

      var position = $(target).index();
      if ( position > 0 ){
        position = position * -1;
      }
      var	move = position * getDocumentWidth();

      $('.site-content-inner').css('transform', 'translate3d('+move+'px, 0px, 0px)');
      $('.site-part').removeClass('active');
      $('#navigation li').removeClass('active');
      $('#navigation a[href="'+target+'"]').parents('li').addClass('active');
      setTimeout(function(){

        if( !$body.hasClass('mobile') ) {
          $('.site-part .animated').each( function() {
            var elem = $(this),
              animation = elem.data('animation');
            elem.removeClass( animation + " visible" );
          });
        }

        $(target).addClass('active');

        if( !$body.hasClass('mobile') ) {
          $(target).find('.animated').each( function() {
            var elem = $(this),
              animation = elem.data('animation');
            if ( !elem.hasClass('visible') ) {
              var animationDelay = elem.data('animation-delay');
              if ( animationDelay ) {
                setTimeout(function(){
                  elem.addClass( animation + " visible" );
                }, animationDelay);
              } else {
                elem.addClass( animation + " visible" );
              }
            }
          });
        }

      }, 500);
    }
  }

  function showSitePartResponsive() {
    var currentPart = $('#navigation li.active').find('a').attr('href');
    if( $('#navigation li.active').length === 0 ){
      currentPart = $('#navigation li').first().find('a').attr('href');
    }
    var position = $(currentPart).index();
    if ( position > 0 ){
      position = position * -1;
    }
    var	move = position * getDocumentWidth();

    $('.site-content-inner').css('transform', 'translate3d('+move+'px, 0px, 0px)');
  }

  function navigation() {

    $navToggle.on('click', function(e) {
      e.preventDefault();
      if(!$(this).hasClass('open')){
        $(this).addClass('open');
        $('.header-collapse').slideDown(500);
      } else {
        $('.header-collapse').slideUp(500);
        $(this).removeClass('open');
      }
    });

    $('body').on( 'click', '#navigation a, a.scrollto', function(e) {
      if (this.hash !== '') {
        if( $( this.hash ).length > 0 ) {
          e.preventDefault();

          showSitePart(this.hash);
        }
      }
    });

    if ( getWindowWidth() <= 992  ) {
      $('#navigation').on('click', (e) => {
        $('#navigation-toggle').click();
      })
    }

      $(document).keydown(function(e) {
      if ($('input,select,textarea').is(':focus')){
        return true;
      }

      var currentPart = $('#navigation li.active');
      if( $('#navigation li.active').length === 0 ){
        currentPart = $('#navigation li').first();
      }

      if(e.keyCode == 37 || e.keyCode == 40) { // prev
        var prev_target = currentPart.prev().find('a').attr('href');

        showSitePart(prev_target);
      } else if(e.keyCode == 39 || e.keyCode == 38) { // next
        var next_target = currentPart.next().find('a').attr('href');

        showSitePart(next_target);
      }
    });

  }


  function showFirstPart() {
    $('#navigation a[href="#'+firstPart+'"]').trigger('click');
  }

  function slick() {
    $('.slick').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    })
  }

  $(window).on('load', () => {
    preloader();
    console.log('Page Layout')
    pageLayout();
  });

  $(document).ready(($) => {
    backgrounds();
    navigation();
    showFirstPart();
    $('#navigation-toggle').click();
    slick();
  });

  // window.resize function
  $(window).on('resize', function() {
    showSitePartResponsive();
  });

})(jQuery);
