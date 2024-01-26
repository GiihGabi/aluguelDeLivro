<?php

require_once("util/param.php");

class Devolucao_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function listaDevolucao()
    {
        $sql = "SELECT 	
                    a.nome, 
                    el.emprestimo,
                    el.livro,
                    l.titulo,
                    el.dataprevistadev
                FROM 
                    biblioteca.emprestimolivro el
                INNER JOIN 
                    emprestimo e 
                        on e.numero = el.emprestimo
                INNER JOIN 
                    aluno a
                        on a.ra = e.ra 
                INNER JOIN 
                    livro l 
                        on l.codigo = el.livro";
        $result = $this->db->select($sql);
        echo (json_encode($result));
    }

    public function validaDev()
    {
        $post = json_decode(file_get_contents('php://input'));
        $emprestimo = $post->emprestimo;
        $livro = $post->livro;
        $datadevolucao = date($post->datadevolucao);
        $multa = $post->multa;
        $sql = $this->db->select("SELECT 
                                    CASE WHEN (current_date - dataprevistadev) > 0 
                                            THEN (current_date - dataprevistadev) * 2 
                                    ELSE 0 END AS multa 
                                        FROM emprestimolivro");

        if ($sql[0]->multa > 0) {
            //se houver multa, atualiza a tabela emprestimolivro e insere na tabela devolucao
            $this->db->insert('devolucao', ['emprestimo' => $emprestimo, 'livro' => $livro, 'datadevolucao' => $datadevolucao, 'multa' => $multa]);
            echo "LIVRO DEVOLVIDO COM SUCESSO! PORÉM COM UMA TAXA DE R$ {$multa}";
            echo "<br>";
        } else {
            //se não houver multa, apenas insere na tabela devolucao
            $this->db->insert('devolucao', ['emprestimo' => $emprestimo, 'livro' => $livro, 'datadevolucao' => $datadevolucao]);
            echo "LIVRO DEVOLVIDO COM SUCESSO! NENHUMA MULTA GERADA!!!";
        }

        echo "LIVRO REMOVIDO DA LISTA DE EMPRÉTIMOS";
    }
}
