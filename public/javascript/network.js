function getMyDetails() {
  return $.ajax({
    url: "/api/owner/me",
  });
}
function getPizzas() {
  return $.ajax({
    url: "/api/pizzas",
  });
}


function checkout(data) {
  $.post('/api/orders', data, function(err, res) {
    console.log(data)

    $('').replaceWith('<h1>Thank you for your order</h1>');
  })

  return $.ajax({
    url: "/api/pizzas",
    type: 'post'
  })
}





function createListing(params) {
  let url = "/api/listing";
  if (params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  });
 }
