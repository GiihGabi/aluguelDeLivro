
<?php

require_once("util/param.php");

class Cadastraraluno_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function cadAluno()
    {
        $post = json_decode(file_get_contents('php://input'));
        $nome = $post->nome;

        if (strlen(trim($nome)) == 0) {
            $resposta = "É necessário preencher todos os campos";
        } else {
            $resposta = "Faça novamente o cadastro";
            $sql = $this->db->insert("biblioteca.aluno", array("nome" => $nome));

            if ($sql){
                $resposta = "****ALUNO CADASTRADO COM SUCESSO****";
            }
        }
        echo ($resposta);
    }

    public function listaAlunos()
    {
        $sql="select ra, nome from biblioteca.aluno order by ra";
        $result=$this->db->select($sql);
		echo(json_encode($result));
    }
}