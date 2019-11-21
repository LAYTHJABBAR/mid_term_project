$(() => {
  window.header = {};
  const $pageHeader = $('#page-header');
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;
    if (!user) {
      userLinks = `
      <nav id="page-header__user-links"  class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand hidden-xs" ><img src="images/AllaVodka.jpg"></a>
          <a class="navbar-brand">Pzza Day</a>
        </div>
          <ul class="nav navbar-nav navbar-right">

           <li><a href="#menu">MENU</a></li>
               <li><a href="#contact" >CONTACT</a></li>
               <li><a href="#location">LOCATION</a></li>
               <li><a href="#about">ABOUT</a></li>
               <li><a class="my_order">MY-ORDER</a></li>
          </ul>
        </div>
      </div>
     </nav>
      `
      }
    $pageHeader.append(userLinks);
  }
  window.header.update = updateHeader;
  getMyDetails()
    .then(function( json ) {
    updateHeader(json.user);
  });
 
  $("header").on("click", '.menu', function() {
    propertyListings.clearListings();
    getAllListings()
      .then(function(json) {
        propertyListings.addProperties(json.properties);
        views_manager.show('listings');
    });
  });
  $("header").on('click', '.manager', () => {
    views_manager.show('logIn');
  });
  $("header").on('click', '.sign_out', () => {
    logOut().then(() => {
      header.update(null);
    });
  });
  $('header').on('click', '.create_order', function() {
    views_manager.show('newProperty');
  });
 });
