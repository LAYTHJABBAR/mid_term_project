$(() => {
  windows = {};

  function createListing(pizza) {
    return `

    <!-- Container (MENU Section) -->
          <article class="col-xs-12 col-sm-6 col-md-4 col-lg-3 hvr-grow slideanim">
            <div class="thumbnail">
              <img  src="${pizza.picture}" >
              <p><strong>${pizza.name} - ${pizza.price}</strong></p>
              <p><strong>(pizza time - ${pizza.pizza_time} min)</strong></p>
              <p data-toggle="tooltip" title="${pizza.topping}">Toppings Info <i class="fa fa-info-circle"></i></p>
              <button class="btn pizza-btn" data-time="${pizza.pizza_time}" data-price="${pizza.price}" data-name="${pizza.name}" data-id="${pizza.id}" data-toggle="modal" data-target="#myModal">Order</button>
            </div>
          </article>
`}
  window.createListing = createListing;

});
