function validateInput(email, password) {
    //check email
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    if(email.match(EMAIL_REG)){
        $("#email").removeClass("is-invalid");
    }else {//empty email input or invalid email
        $("#email").addClass("is-invalid");
    }

    //check password
    if(password.length > 2){
        $("#password").removeClass("is-invalid");
    }else {
        $("#password").addClass("is-invalid");
    }

    if(!email.match(EMAIL_REG) || password.length <= 2 )
        return true; //has errors

    return false;
}

$(document).ready(function() {
  $("#register").on("click", function(event) {
        event.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();
        let name = $("#name").val();

        //validate input
        let check = validateInput(email, password);

        if (!check) {
            $.ajax({
                url: `${window.location.origin}/register`,
                method: "POST",
                data: {name: name, email: email, password: password},
                success: function(data) {
                    alert("Successfully Registered!");
                    window.location.href = "/login";
                },
                error: function(err) {
                   alert(err.responseText);
                }
            });
        }else(alert('error'))
    });
});
