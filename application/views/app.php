<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <link rel="shortcut icon" href="#">
  <title>Betlicious - AngularJS</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="For the reason of Web Development skills demonstration">
  <meta name="author" content="K.Tsalikidis">

  <link href="assets/css/app.css?v=<?= uniqid() ?>" rel="stylesheet">
  <link href="assets/css/search-bar.css?v=<?= uniqid() ?>" rel="stylesheet">

</head>

<body ng-app="BetliciousApp" ng-controller="AppController as vm" ng-cloak>

  <div id="header">
    <div class="logo">
      <i class="fa fa-gamepad fa-2x"></i>
      <span>&nbsp;Betlicious</span>
    </div>

    <div class="options">
      <input-field input-type="text" placeholder="User Name"></input-field>
      <input-field input-type="password" placeholder="••••••"></input-field>
      <div class="btn-login">Login</div>
      <div class="btn-signup">Sign Up</div>
    </div>
  </div>

  <div id="navbar">
    <div link>Promotions</div>
    <div link>Banking</div>
    <div link>Support</div>
    <div link>VIP</div>
  </div>

  <div ng-view></div>

  <script src="https://kit.fontawesome.com/ce46ce4a0e.js"></script>
  <script src="assets/lib/anime.min.js"></script>
  <script src="assets/lib/angular.min.js"></script>
  <script src="assets/lib/angular-route.min.js"></script>
  <script src="assets/js/app.js"></script>
  <script src="assets/js/app.controller.js"></script>
  <script src="assets/js/game.controller.js"></script>
  <script src="assets/js/input-field.directive.js"></script>
  <script src="assets/js/search-bar.directive.js"></script>
  <script src="assets/js/game.directive.js"></script>
</body>
</html>