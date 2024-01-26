<?php

class Cadastrarautor extends Controller {

    function __construct() {
        parent::__construct();
		$this->view->js = array();
		$this->view->css = array();
    }

    function index()
    {
        $this->view->title = "CADASTRAR AUTOR";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/cadastrarautor/app.vue.js");
        array_push($this->view->css, "views/cadastrarautor/app.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    function listaAutor()
    {
        $this->model->listaAutor();
    }

    function cadAutor()
    {
        $this->model->cadAutor();
    }

}