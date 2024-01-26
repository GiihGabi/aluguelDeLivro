<?php

require_once("util/param.php");

class Alugarlivro_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function buscaNome()
    {
        $sql = $this->db->select("select ra, nome from biblioteca.aluno");
        echo json_encode($sql);
    }
    
    public function cadEmp(){
        $post = json_decode(file_get_contents('php://input'));
        $ra = $post->nome;
        $livro = $post->livro;
        $dataAluguel = $post->dataAluguel;
        $dataDevolucao = $post->dataDevolucao;

        $emp = $this->db->insert('biblioteca.emprestimo', array(
            'data' => $dataAluguel,
            'ra' => $ra
        ));
        
        if ($emp) {
            $idAluguel = $this->db->select("select numero, data, ra from emprestimo where data = date_format('$dataAluguel', '%Y-%m-%d') and ra = $ra");
            
            if (strlen(trim($ra)) == 0 || strlen(trim($livro)) == 0 || $dataAluguel == 0 || $dataDevolucao == 0 || $dataDevolucao < $dataAluguel) {
                $resposta = "PREENCHA OS CAMPOS CORRETAMENTE!";
            } else {
                $emprestimolivro = $this->db->insert('biblioteca.emprestimolivro', array(
                    'emprestimo' => $idAluguel[0]->numero,
                    'livro' => $livro,
                    'dataprevistadev' => $dataDevolucao
                ));
                $resposta = "EMPRÉSTIMO FEITO COM SUCESSO!!!";
            }
            echo $resposta;
        } else {
            echo "Error";
        }
    }

    public function livrosEmprestados() {
        $sql="select
                el.emprestimo,
                l.titulo,
                el.dataprevistadev 
            from
                biblioteca.emprestimolivro el
            inner join emprestimo e on
                e.numero = el.emprestimo
            inner join aluno a on
                a.ra = e.ra
            inner join livro l on
                l.codigo = el.livro";
        $result=$this->db->select($sql);	
		echo(json_encode($result));
    }
    
    public function listaLivros() {
        // $sql="select l.codigo, l.isbn, l.titulo, l.edicao, l.valor, a.nome from biblioteca.livro l inner join autor a on a.codigo = l.autor";
        $sql="select l.codigo, l.isbn, l.titulo, l.edicao, l.valor, l.autor from biblioteca.livro l";
        $result=$this->db->select($sql);	
        echo(json_encode($result));
    }
}