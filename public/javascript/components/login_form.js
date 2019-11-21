
$(() => {

  const $logInForm = $(`
  <form >  <section >
      <div class="modal-content">
        <div class="modal-header">
          <h4>MANAGER LOGIN</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <h6>Email</h6>
            <input name="email" required id="email" type="email"  placeholder="Enter email">
            <h6>Password</h6>
            <input name="password" id="password" type="password"  placeholder="Enter password">
          </div>
  
        </div>
              <button class="btn btn-primary" type="submit">Login</button>
                <span class="glyphicon glyphicon-ok"></span>
                <button class="btn btn-primary" id="login-form__cancel" href="#">Cancel</button>
              </button>
          </form>
        </div>
        </div>
  </section>
</form>
  `);

  window.$logInForm = $logInForm;

  $logInForm.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    logIn(data)
      .then(json => {
        if (!json.user) {
          views_manager.show('error', 'Failed to login');
          return;
        }
        header.update(json.user);
        views_manager.show('listings');
      });
  });

  $('body').on('click', '#login-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });
      
});