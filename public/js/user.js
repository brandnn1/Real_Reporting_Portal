$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    
    var url = window.location.search;
    var userID;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, userID is 1
    if (url.indexOf("?post_id=") !== -1) {
      userID = url.split("=")[1];
      getPostData(userID);
    }
  
    // Getting jQuery references to the post body, title, form, and category select
    var username = $("#userEntry");
    var password = $("#passEntry");
    var email = $("#email");
    var signup = $("#signupForm"); 
    // Giving the postCategorySelect a default value
    // Adding an event listener for when the form is submitted
    $(signup).on("submit", function(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      if (!password.val().trim() || !username.val().trim()) {
        return;
      }
      // Constructing a newUser object to hand to the database
      var newUser = {
        password: password.val().trim(),
        username: username.val().trim(),
        email: email.val().trim()
      }; 
  
      console.log(newUser);
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitUser to create a whole new post
      if (updating) {
        newUser.id = userID;
        updatePost(newUser);
      }
      else {
        submitUser(newUser);
      }
    });
  
    // Submits a new post and brings user to blog page upon completion
    function submitUser(user) {
      $.post("/api/users/", user, function() {
        window.location.href = "/";
      });
    }
  
    // Gets post data for a post if we're editing
    function getPostData(id) {
      $.get("/api/users/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our cms forms with its data
          password.val(data.password);
          username.val(data.username);
          email.val(data.email);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // Update a given post, bring user to the blog page when done
    function updateUser(user) {
      $.ajax({
        method: "PUT",
        url: "/api/users",
        data: user
      })
        .then(function() {
          window.location.href = "/";
        });
    }
  });
  