console.log("app.js");

$.getJSON("/review", function(data) {
  console.log("inside");
  for (var i = 0; i < data.length; i++) {
     //console.log(data[i]);
     var clen = Number(data[i].rating.length);
     var avgrating = 0;
     if (clen > 0)
     {
       var totalrating =0;
       for(var j =0 ; j < clen ; j++)
       {
         totalrating = Number(data[i].rating[j]);
         console.log("tr"+totalrating);
       }
       avgrating = totalrating / clen;
     }
    $("#movieslist").append(
      "<tr data-id='" + data[i]._id + "'><td>" +
      data[i].title +"</td><td><p>Number of Response:"+clen+"</p><p>Average Rating: "+avgrating+
      "</td><td><select class='rating' id = 'r-"+data[i]._id+"'data-id = '"+data[i]._id+"'><option value ='1'>1</option>"+
      "<option value ='2'>2</option>" +
      "<option value ='3'>3</option>" +
      "<option value = '4'>4</option>" +
      "<option value ='5'>5</option></select></td>" +
      "<td><button class = 'addrating btn btn-info' data-id='"+data[i]._id +"'>Add Rating</button></td>"+
      "</td><td><button class = 'remmovie btn btn-danger' data-id='"+data[i]._id +"'>Delete this Review</button></td></tr>");
  }; // End for loop for each movie review
});

$(document).on("click",".addrating",function(){
     event.preventDefault();
    var  thisId = $(this).attr("data-id");
    var vrating = {
      rati: $(`#r-${thisId}`).val()
    };
    console.log("In the click event of Add Rating",vrating);
    $.ajax({
      method: "PUT",
      url: "/rating/" + thisId,
      data: vrating
    }).done(function(data) {
        console.log("Rating updated for Movie ID:",data);
        location.reload()
      }); // End of Ajax
}); // End of Add rating click event


$(document).on("click",".remmovie",function(event){
        event.preventDefault();
        console.log("On click Remove Movie");
        var thisId = $(this).attr("data-id");
        $.ajax({
          method:"DELETE",
          url:"/review/"+thisId
        }).done(function(result){
          console.log("Delete Movie",result);
          location.reload();
        });

}); // End of click event for Remove Movie details and all rating for the movie

/*
$(document).on("click",".delrating",function (){
     event.preventDefault();
    var thisId = $(this).attr("data-id");
    var vrating = $(this).text();
    console.log("In the click event of DeleteRating",vrating,"....");
    $.ajax({
      method: "DELETE",
      url: "/rating/" + thisId,
      data: vrating
    }).then(function(data,err) {
        if (err) throw(err);
        console.log("Deleted All Rating for the movie:",data);
        location.reload();
    }); // End of Ajax
}); //End of Del rating click event

*/
