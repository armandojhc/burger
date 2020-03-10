$(document).ready(function() {

  $(() => {
    $(".change-devoured").on("click", function (event) {
      const id = $(this).data("id");
      const newlyDevoured = $(this).data("newlyDevoured");
  
      // Send the PUT request.
      $.ajax(`/api/burger/${id}`, {
        type: "PUT",
      }).then(
        () => {
          // console.log("changed sleep to", newSleep);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });


    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        const newBurger = {
          name: $("#ca").val().trim()
        };
    
        // Send the POST request.
        $.ajax("/api/burger", {
          type: "POST",
          data: newBurger
        }).then(
          (data) => {
            console.log("POST Request finished");
            console.log(data);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });

});