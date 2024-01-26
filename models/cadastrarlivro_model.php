
<?php

require_once("util/param.php");

class Cadastrarlivro_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function cadLivro() 
    {
        $post = json_decode(file_get_contents('php://input'));
        $isbn = $post->isbn;
        $titulo = $post->titulo;
        $edicao = $post->edicao;
        $valor = $post->valor;
        $autor = $post->autor;


        if (strlen(trim($isbn)) == null || strlen(trim($titulo)) == null || strlen(trim($edicao)) == null || strlen(trim($valor)) == null || strlen(trim($autor)) == null) {
            $resposta = "É necessário preencher todos os campos";
        } else {
            $resposta = "Faça novamente o cadastro do livro";
            $sql = $this->db->insert("biblioteca.livro", array("isbn" => $isbn, "titulo" => $titulo, "edicao" => $edicao, "valor" => $valor, "autor" => $autor));

            if ($sql){
                $resposta = "****LIVRO CADASTRADO COM SUCESSO****";
            }
        }
        echo ($resposta);
    }

    public function listaLivro() 
    {  
        $sql="select codigo, isbn, titulo, edicao, valor, autor from biblioteca.livro order by titulo";
        $result=$this->db->select($sql);	
		echo(json_encode($result));
    }
    
}