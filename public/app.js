
$.getJSON("/all", function(data) {
  console.log(data);
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
        `);
  }

});
