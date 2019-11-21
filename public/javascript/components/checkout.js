
(`

<!----------------CHECKOUT------------>

    <section class="modal fade" id="checkout-modal" role="dialog">
      <div class="modal-dialog">

        <!-- CHECKOUT content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">×</button>
            <h4><span class="glyphicon glyphicon-shopping-cart"></span>Checkout</h4>
          </div>
          <div class="form-group"><label for="qty">Customer Name</label>
                <input name="name" type="text" class="form-control" id="customer_name" placeholder="Enter Name">
          </div>
          <div class="form-group"><label for="qty">Customer phone number</label>
                <input name="phone" type="number" class="form-control" id="customer_phone" placeholder="xxx-xxx-xxxx">
          </div>
          <div class="form-group"><label for="qty">Total Cost</label>
          <span>Total Order Cost: </span><span>${cartTotal}</span>
          </div>
          <button type="submit" class="btn btn-block">PLACE ORDER
                  <span class="glyphicon glyphicon-ok"></span>
          </button>
        </div>

      </div>
    </section>

  `)


