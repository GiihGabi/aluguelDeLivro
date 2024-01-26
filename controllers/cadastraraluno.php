<?php

class Cadastraraluno extends Controller {

    function __construct() {
        parent::__construct();
		$this->view->js = array();
		$this->view->css = array();
    }

    function index()
    {
        $this->view->title = "CADASTRAR ALUNO";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/cadastraraluno/app.vue.js");
        array_push($this->view->css, "views/cadastraraluno/app.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }
    
    function cadAluno()
    {
        $this->model->cadAluno();
    }

    function listaAlunos()
    {
        $this->model->listaAlunos();
    }
}