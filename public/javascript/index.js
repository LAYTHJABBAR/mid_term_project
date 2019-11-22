$(() => {
  getPizzas().then(function(pizzas) {
    views_manager.show("pizzas", pizzas);
  });

  function getTotalPrice(arrItems) {
    return arrItems.reduce((sum, item) => {
      console.log('<=========================>')
      console.log(typeof(item.item_price, sum))
      console.log('<==========================>')
      return Number(sum + item.item_price);
    }, 0);
  }
  $("#check-out").click(function() {
    const orderItems = [];
    $(".cart-item").each((index, el) => {
      const $item = $(el);
      const orderItem = {
        name: $item.data('name'),
        quantity: $item.data("quantity"),
        size: $item.data("size"),
        item_price: Number($item.data("price")),
        Item_time: Number($item.data("time"))
      };
      orderItems.push(orderItem);
    });
 


    const totalTime = getPickUpTime(orderItems);
    const totalPrice = getTotalPrice(orderItems);



    function getPickUpTime(arrItems) {
      return arrItems.reduce((max, item) => {
        return max + item.Item_time;
      }, 0);}



    $("#checkout-modal form")
      .append(
        `<input name="orderItems" type="text" value=${JSON.stringify(orderItems)} hidden />`
      )
      .append(
        `<input name="total_price" type="text" value=${JSON.stringify(totalPrice)} hidden />`
      );

    $("#total").text(`$${totalPrice}`);

    $("#placeOrder").submit(function(event) {
      event.preventDefault();
      // get all data from form, including the orderItems and totalPrice we attached yesterday
      // const order = $(this).serialize();
      const name = $('#customer_name');
      const phone = $('#customer_phone');
  const order = {
  name: name.val(),
  phone: phone.val(),
  order_item: orderItems,
  total_price: totalPrice,
  total_time: totalTime

  }

      var $cart = $("#cart");
      $.ajax({
        type: "POST",
        url: "/api/orders",
        data: order,
        success: function(order) {
   
          $cart.html("<h1 id='thank'>Thank you for your order, ready in " + totalTime +"min") ;
        },
        error: function(err) {
          alert("error");
        }
      });
    });
  });

  $("#pizzas").on("click", ".pizza-btn", function(evt) {
    // $("#thank").remove();
    const pizzaId = $(this).data("id");
    const pizzaName = $(this).data("name");
    const pizzaPrice = $(this).data("price");
    const pizzaTime= $(this).data("time")
    $("#pizza_id").val(pizzaId);
    $("#pizza_name").val(pizzaName);
    $("#pizza_price").val(pizzaPrice);
    $("#pizza_time").val(pizzaTime)
  });

  $("#myModal form").submit(function(evt) {
    evt.preventDefault();
    const data = {
      pizza_id: evt.target.elements.pizza_id.value,
      name: evt.target.elements.name.value,
      price: evt.target.elements.price.value,
      size: evt.target.elements.size.value,
      crust: evt.target.elements.crust.value,
      quantity: evt.target.elements.quantity.value,
      time: evt.target.elements.pizza_time.value
    };
    // append to cart
    $("#cart").prepend(addToCart(data));

    $('#cart-close').click(function(e){
      e.preventDefault;
      e.target.parentElement.remove()
    
    })
  });
});

function calculateSubtotal(priceStr, quantity) {
  const price = Number(priceStr.replace("$", ""));
  return price * Number(quantity);
}

function addToCart(cartData) {
  const itemPrice = calculateSubtotal(cartData.price, cartData.quantity);
  return `
  <section class= "dismissOrder">
  <button id="cart-close" type="button" class="close cart-btn" >×</button>
  <div class="modal-header">

  
   <div class="cart-item" data-quantity=${cartData.quantity} data-size=${cartData.size} data-price=${itemPrice} data-time=${cartData.time}>
     <span>Order Name : ${cartData.name}</span><br>
     <span>Quantity: </span><span>${cartData.quantity}</span><br>
     <span>Size: </span><span>${cartData.size}</span><br>
     <span>Crust: </span><span>${cartData.crust}</span><br>
     <span>Preparing Time: </span><span>${cartData.time} min</span><br>
     </br>
     <span>Price: </span><span>$${itemPrice}</span><br>
   </div>
   </section>
`;
}


$("#add").click(function() {
  $("#check-out").show();
  $(".add_form").css("display", "block")
  $("#thank").remove()
  hideModal("#myModal");
  
});

function hideModal(modalId) {
  $(modalId).hide();
  $('body')
  .removeClass('modal-open')
  .attr('style', "");

  $('.modal-backdrop').remove();
}

$('#placeOrder').click(function(){
hideModal('#checkout-modal')
})


