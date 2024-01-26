<?php

class Cadastrarlivro extends Controller {

    function __construct() {
        parent::__construct();
		$this->view->js = array();
		$this->view->css = array();
    }

    function index()
    {
        $this->view->title = "CADASTRAR LIVRO";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/cadastrarlivro/app.vue.js");
        array_push($this->view->css, "views/cadastrarlivro/app.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    function cadLivro()
    {
        $this->model->cadLivro();
    }

    function listaLivro()
    {
        $this->model->listaLivro();
    }

}