
<?php

require_once("util/param.php");

class Cadastrarautor_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function listaAutor() 
    {  
        $sql="select codigo, nome from biblioteca.autor order by codigo";
        $result=$this->db->select($sql);	
		echo(json_encode($result));
    }

    public function cadAutor() 
    {
        $post = json_decode(file_get_contents('php://input'));
        $nome = $post->nome;

        
        if (strlen(trim($nome)) == 0) {
            $resposta = "É necessário preencher todos os campos";
        } else {
            $resposta = "Faça novamente o cadastro";
            $sql = $this->db->insert("biblioteca.autor", array("nome" => $nome));

            if ($sql){
                $resposta = "****AUTOR CADASTRADO COM SUCESSO****";
            }
        }
        echo ($resposta);
    }
}