$(document).ready(function()
{
       console.log('Jquery front end before ajax call');
        $.ajax("/",{type:'GET'}).then(function(data) {
                  console.log('After Ajax call',data);
                  for (var i = 0; i < data.length ; i++)
                  {
                        $("#content").append(`
                        <tr>
                             <td>
                                <h4 class ="htheadline">${data[i].headline}</h4>
                                 <p class = "newscontent">${data[i].description}</p>
                             </td>
                             <td>
                                <p class ="comments">${data[i].comment}</p>
                             </td>

                        </tr>
                        `); // End append statement
                  } // end for loop
        }); // end of ajax - get all movie detils on page

        $("#htaddcomment").on("click",function()
        {
              var newcomment = {
                 username: $("#htusername"),
                 opinion: $("#htopinion"),
                 rating: $("#htrating") };

              $.ajax("/addcomment", {
                    type:"POST",
                    data: newcomment
                  }).then(function(response) {
                      console.log("Ajax Response",response);
                  }); //end of ajax post - to add comments
          }); // end of add comment button click event
}); // end of document ready
