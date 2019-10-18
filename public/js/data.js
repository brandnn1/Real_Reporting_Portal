$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    
    var updating = false;
    var searchData = {};
    var calcLat = 0;
    var calcLong = 0;
    var districtSelect =[];
    // Giving the postCategorySelect a default value
    // Adding an event listener for when the form is submitted

    
    $('#downloadReport').on("click", function(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      $(".chosen-select").each(function () {
        
        if ($(this).val() === "") {
            //figure this out
          isValid = false;
        }
      });
      // Constructing a newSearch object to hand to the database
      
      districtSelect.push($('#district').val())
      console.log(districtSelect);
      if (!$('#district').val()){
        districtSelect = ['Q',	'K',	'D',	'E',	'M',	'O',	'C',	'F',	'G',	'R',	'N',	'B',	'S',	'J',	'L',	'W',	'U',	'99']
      }  else districtSelect = districtSelect;
      console.log(districtSelect);

      searchData = {
        Summarized_Offense_Description : $('#crimeType').val(),
        Date_Occurred: $('#dateFrom').val(),
        Date_Occurred_End: $('#dateTo').val(),
        District_Sector: districtSelect
      };
      console.log(searchData);
      
        submitDownload(searchData);
        districtSelect = []
      });

      function submitDownload(search){
        $.post("/api/report/", search, function(results) {
          // window.location = results;
          console.log('results: ', results);
          window.location.assign(results);
      })
      };


    $('#submit').on("click", function(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      $(".chosen-select").each(function () {
        
        if ($(this).val() === "") {
            //figure this out
          isValid = false;
        }
      });
      // Constructing a newSearch object to hand to the database
      
      districtSelect.push($('#district').val())
      console.log(districtSelect);
      if (!$('#district').val()){
        districtSelect = ['Q',	'K',	'D',	'E',	'M',	'O',	'C',	'F',	'G',	'R',	'N',	'B',	'S',	'J',	'L',	'W',	'U',	'99']
      }  else districtSelect = districtSelect;
      console.log(districtSelect);

      searchData = {
        Summarized_Offense_Description : $('#crimeType').val(),
        Date_Occurred: $('#dateFrom').val(),
        Date_Occurred_End: $('#dateTo').val(),
        District_Sector: districtSelect
      };
      console.log(searchData);
      
        submitSearch(searchData);
        districtSelect = []
      });
  
    // Submits a new post and brings user to blog page upon completion
    function submitSearch(search) {
      $.post("/api/data/", search, function(results) {
        console.log(results.length)
        for (var i = 0; i < results.length; i++) {
            var currentEvent = results[i];
            var crimeLongitude = currentEvent.Longitude;
            var crimeLatitude = currentEvent.Latitude;

            if (crimeLongitude === 0) {
                crimeLongitude =  -122.332
            };
            if (crimeLatitude === 0) {
                crimeLatitude =  47.606
            };

            console.log(crimeLatitude, crimeLongitude);
            calcLat = parseFloat(calcLat) + parseFloat(crimeLatitude)
            calcLong = parseFloat(calcLong) + parseFloat(crimeLongitude)
          }

          avgLat = (calcLat / results.length)
          avgLong = (calcLong / results.length)
          calcLat = 0
          calcLong = 0
    
    
          myLatLng = { lat: avgLat, lng: avgLong };
          map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 12,
            mapTypeId: 'terrain'
          });


          var marker, i;
          var circleObject = [];
          function circles(){

            console.log('inside circles results length', results.length);

            for (i = 0; i < results.length; i++) {
              
              // Add the circle for this city to the map.
              currentCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: {lat:results[i].Latitude, lng:results[i].Longitude},
                radius: 250,
                title: results[i].Date_Occurred
              });
              circleObject.push(currentCircle) 

              google.maps.event.addListener(currentCircle, 'click', (function (currentCircle, i) {
                return function () {
                  infowindow.setContent('Date of Crime: ' + results[i].Date_Occurred);
                  infowindow.open(map, currentCircle);
                }
              })(currentCircle, i));

      }


      google.maps.event.addListener(map, 'zoom_changed', function() {

        zoomLevel = map.getZoom();
        for (i = 0; i < circleObject.length; i++) {        
        if (zoomLevel === 12) {
          circleObject[i].setRadius(250);
              } else if (zoomLevel === 13) {
                circleObject[i].setRadius(125);
              } else if (zoomLevel === 14) {
                circleObject[i].setRadius(50);
            }else if (zoomLevel === 15) {
              circleObject[i].setRadius(25);
          } else if (zoomLevel === 16) {
            circleObject[i].setRadius(12);

        } else circleObject[i].setRadius(600)
      }
        }); 
      };

          var infowindow = new google.maps.InfoWindow();
  
          
          function markers() {
            for (i = 0; i < results.length; i++) {
              if (i < results.length) {
                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(results[i].Latitude, results[i].Longitude),
                  map: map,
                  title: results[i].Offense_Type
                });
    
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                  return function () {
                    infowindow.setContent('Zoom: ' + map.getZoom());
                    infowindow.open(map, marker);
                  }
                })(marker, i));
              }
            }
            

          }


          circles();
         // markers();


          console.log(results);
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
