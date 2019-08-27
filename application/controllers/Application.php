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
      $game['categories'] = $entry->categories;
      array_push($games, $game);
    }

    print json_encode($games);
  }

  public function get_categories() {
    $data = file_get_contents('data.json');
    $categories = [];
    foreach (json_decode($data) as $entry) {
      foreach ($entry->cats as $category) {
        $already_exists = false;
        for ($i = 0; $i < count($categories); $i++) {
          if ($categories[$i]->id == $category->id) {
            $already_exists = true;
            break;
          }
        }
        if (!$already_exists) {
          array_push($categories, $category);
        }
      }
    }
    print json_encode($categories);
  }
}
