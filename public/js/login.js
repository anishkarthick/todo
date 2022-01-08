

$(document).ready(function () {
    $("#login").on("click", function (event) {
      event.preventDefault();
      let email = $("#email").val();
      let password = $("#password").val();

      $.ajax({
        url: `${window.location.origin}/login`,
        method: "POST",
        data: { email: email, password: password },
        success: function (data) {
          alert("login success!");
          window.location.href = "/tasks";
        },
        error: function (err) {
          alert("Email or password is incorrect. Please try again!");
        }
      })
    });
  })