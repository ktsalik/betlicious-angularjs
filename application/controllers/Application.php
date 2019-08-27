<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Application extends CI_Controller {

  public function __construct() {
    parent::__construct();
  }

	public function index() {
		$this->load->view('app');
  }
  
  public function get_games() {
    $data = file_get_contents('data.json');

    $games = [];
    foreach (json_decode($data) as $entry) {
      $game = [];
      $game['thumbnail'] = $entry->icon_2;
      $game['title'] = $entry->name;
      $game['provider'] = $entry->provider_title;
      array_push($games, $game);
    }

    print json_encode($games);
  }
}
