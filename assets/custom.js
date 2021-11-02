$(window).on("scroll", function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 50) {
    $(".sticky").addClass("stickyadd");
  } else {
    $(".sticky").removeClass("stickyadd");
  }
});
$(".navbar-nav a, .scroll_down a").on("click", function (event) {
  var $anchor = $(this);
  $("html, body")
    .stop()
    .animate(
      { scrollTop: $($anchor.attr("href")).offset().top - 0 },
      1500,
      "easeInOutExpo"
    );
  event.preventDefault();
});
$("#navbarCollapse").scrollspy({ offset: 20 });
$("#owl-demo").owlCarousel({
  autoPlay: 3000,
  stopOnHover: !0,
  navigation: !1,
  paginationSpeed: 1000,
  goToFirstSpeed: 2000,
  singleItem: !0,
  autoHeight: !0,
});
$(document).ready(function () {
  $("#app_testi").owlCarousel({
    autoPlay: 28000,
    items: 3,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [979, 3],
  });
});
$(".img-zoom").magnificPopup({
  type: "image",
  closeOnContentClick: !0,
  mainClass: "mfp-fade",
  gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] },
});
$(".features_video").magnificPopup({
  disableOn: 700,
  type: "iframe",
  mainClass: "mfp-fade",
  removalDelay: 160,
  preloader: !1,
  fixedContentPos: !1,
});
$(window).on("load", function () {
  var $container = $(".work-filter");
  var $filter = $("#menu-filter");
  $container.isotope({
    filter: "*",
    layoutMode: "masonry",
    animationOptions: { duration: 750, easing: "linear" },
  });
  $filter.find("a").on("click", function () {
    var selector = $(this).attr("data-filter");
    $filter.find("a").removeClass("active");
    $(this).addClass("active");
    $container.isotope({
      filter: selector,
      animationOptions: { animationDuration: 750, easing: "linear", queue: !1 },
    });
    return !1;
  });
});
var a = 0;
$(window).on("scroll", function () {
  var oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter_value").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count");
      $({ countNum: $this.text() }).animate(
        { countNum: countTo },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          },
        }
      );
    });
    a = 1;
  }
});
