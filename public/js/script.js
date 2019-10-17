$(document).ready(function () {

    var userValid = $("#userN");
    var password = $("#passW");
    var signin = $("#userForm"); 
    //event handler for submit button
    $(signin).on("submit", function(event){
        event.preventDefault();
        console.log("This");
        //collect userName and password entered by users
        
    var validUser = {
        password: password.val().trim(),
        username: userValid.val().trim()
      }; 
  

          console.log(validUser);
        //call the authenticate function

        authenticate(validUser);
    });
    function authenticate(user){
        $.post("/api/users2/", user, function(res) {
            console.log(res);
            window.location.href = res
        });
}

});

//authenticate function to make ajax call
