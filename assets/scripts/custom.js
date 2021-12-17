function disableButton(id, toggle = true, success) {
  const btn = document.getElementById(id + '-submit');
  btn.disabled = toggle;
  let className = 'btn btn-secondary';
  switch (typeof success) {
    case 'boolean':
      className = success ? 'btn btn-success' : 'btn btn-danger'
      break;

    default:
      break;
  }
  btn.className = className;
}

function disableForm(id, disable = true, reset) {
  if (reset) {
    $('#' + id).trigger('reset');
  }
  disableButton(id, disable, reset);
  document.querySelector('#' + id + ' fieldset').disabled = disable;
}

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
  const phoneInputs = document.querySelectorAll("#fc-phone");
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

  const url = 'https://script.google.com/macros/s/AKfycbwslIccm4KXmZIsbOOOzF6XGaNdhcoVZNY8AW6byQ8Gze48BdQ3tDAp5xIVVtYCzsJ0/exec';
  const formQuestionsId = 'form-questions';
  const formQuestions = document.forms[formQuestionsId];
  if (formQuestions)
    formQuestions.addEventListener('submit', e => {
      e.preventDefault();
      const body = new FormData(formQuestions);
      disableForm(formQuestionsId, true);
      fetch(url, { method: 'POST', body })
        .then(response => {
          disableForm(formQuestionsId, false, true);
        })
        .catch(error => {
          disableForm(formQuestionsId, false, false);
          console.error('Error!', error.message)
        });
    });

  const formCustomerId = 'form-customer';
  const formCustomer = document.forms[formCustomerId];
  if (formCustomer)
    formCustomer.addEventListener('submit', e => {
      e.preventDefault();
      const body = new FormData(formCustomer);
      disableForm(formCustomerId, true);
      fetch(url, { method: 'POST', body })
        .then(response => {
          disableForm(formCustomerId, false, true);
        })
        .catch(error => {
          disableForm(formCustomerId, false, false);
          console.error('Error!', error.message)
        });
    });
})();
