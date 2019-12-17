// DESENVOLVIDO POR: Wallace Frota
// GitHub: https://github.com/wallacefrota
// Instagram: @frotadev
// Site: http://frotadev.com

// abre o banco cursos, com bd com 2000 registros
var db = window.openDatabase("Database", "1.0", "Cursos", 2000);
db.transaction(createDB, errorDB, successDB);

// fica verificando se o dispositivo já está pronto
document.addEventListener("deviceready", onDeviceReady, false);

// cria tabela na bd
function onDeviceReady() {
    db.transaction(createDB, errorDB, successDB);
}

// trata erro de criação do bd
function errorDB(err) {
    console.log(err);
}

// executa se criou corretamente
function successDB() {}

// cria das tabelas se a mesma não existir
function createDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Cursos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome VARCHAR(50), desc VARCHAR(50), qtd NUM(120), preco NUM(120))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Compras(id INTEGER PRIMARY KEY, nome VARCHAR(50), valor NUM(15), vagas NUM(15))');
}
// prepara para incluir registros na tabela cursos
function cursos_insert() {
    db.transaction(cursos_insert_db, errorDB, successDB);
}

// incluir registros na tabela cursos
function cursos_insert_db(tx) {
    var nome = $("#curso_name").val();
    var desc = $("#curso_desc").val();
    var qtd = $("#curso_qtd").val();
    var preco = $("#curso_price").val();

    tx.executeSql('INSERT INTO Cursos (nome, desc, qtd, preco) VALUES ("' + nome + '", "' + desc + '", "' + qtd + '", "' + preco + '")');

    alert("CURSO CADASTRADO COM SUCESSO!")

    // telas exibição
    location.reload(true); // recarrega
    $("#tela_inserir").hide();
    $("#tela_carrinho").hide();
}

// buscando valores da bd
function cursos_view() {
    db.transaction(cursos_view_db, errorDB, successDB);
}

// monta a matriz com os registros da tabela cursos
function cursos_view_db(tx) {
    tx.executeSql('SELECT * FROM Cursos', [], cursos_view_data, errorDB);
}

// mostra os registros da tabela cursos
function cursos_view_data(tx, results) {
    $("#cursos_listagem").empty();

    var len = results.rows.length;

    for(var i = 0; i < len; i++) {
        if (len === "" || len === 0) {
            $("#alert").append(
                "<div class='alert alert-warning' role='alert'>" +
                     "NENHUM CURSO DISPONÍVEL NO MOMENTO!" +
                 "</div>"
            );
        } else {
            // lista os cursos na div cursos_listagem
            $("#cursos_listagem").append(
            "<div class='col-sm-6 col-md-4 mb-3 no-padding'>" +
            "<div class='card'>" +
            "<div class='card-body'>" +
            "<h4 class='card-title'>" + results.rows.item(i).nome + "</h4>" +
            "<p class='card-text'>" + results.rows.item(i).desc + "</p>" +
            "<p class='card-text'>" + "Vagas Disponíveis: " + results.rows.item(i).qtd + "</p>" +
            "<p class='card-text font-weight-bold'>" + "Valor R$ " + results.rows.item(i).preco + ",00" + "</p>" +
            "<input type='button' class='btn btn-primary form-control' data-toggle='modal' data-target='#tela_carrinho' value='Comprar' onclick='curso_abrir_carrinho(" + results.rows.item(i).id + ")'></input>" +
            "</div>" +
            "</div>" +
            "</div>"
            );
        }
    }
}