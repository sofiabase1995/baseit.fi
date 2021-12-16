(function () {
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $(".sticky").addClass("stickyadd");
    } else {
      $(".sticky").removeClass("stickyadd");
    }
  });

  // new bootstrap.ScrollSpy(document.body, {
  //   target: "#navbarCollapse",
  //   offset: 20,
  // });

  if ($(".typedjs-slogan").length) {
    const strings = {
      "fi-FI": ["ammattilaiseksi.", "freelanceriksi.", "alihankkijaksi."],
      "en-GB": ["professional.", "freelancer.", "subcontractor."]
    }
    const locale = $(".typedjs-slogan").data("slogan-locale")
    new Typed(".typedjs-slogan", {
      strings: strings[locale],
      typeSpeed: 90,
      loop: true,
      backSpeed: 30,
      backDelay: 2500,
    });
  }

  // $("input#fc-phone").intlTelInput({
  //   utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js"
  // });
  const phoneInputs = document.querySelectorAll("#entry\\.1325652914, #entry\\.1653417635");
  if (phoneInputs.length > 0) {
    window.intlTelInputGlobals.loadUtils("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.min.js");
    Array.prototype.forEach.call(
      phoneInputs, (phoneInput) => {
        window.intlTelInput(phoneInput, {
          initialCountry: "auto",
          geoIpLookup: function (success, failure) {
            $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
              var countryCode = (resp && resp.country) ? resp.country : "fi";
              success(countryCode);
            });
            // NOTE: https://imask.js.org/
            // NOTE: https://github.com/jackocnr/intl-tel-input
          },
        });
      }
    );
  }
})();
