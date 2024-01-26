
<?php

class Alugarlivro extends Controller {

    function __construct() {
        parent::__construct();
		$this->view->js = array();
		$this->view->css = array();
    }

    function index()
    {
        $this->view->title = "ALUGAR LIVRO";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/alugarlivro/app.vue.js");
        array_push($this->view->css, "views/alugarlivro/app.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    function buscaNome(){
        $this->model->buscaNome();
    }
    
    function cadEmp() {
        $this->model->cadEmp();
    }

    function livrosEmprestados() {
        $this->model->livrosEmprestados();
    }

    function listaLivros() {
        $this->model->listaLivros();
    }

}