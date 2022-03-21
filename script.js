let seuVotoPara = document.querySelector('.display-up-left-1 span');
let cargo = document.querySelector('.display-up-left-2 span');
let descricao = document.querySelector('.display-up-left-4');
let aviso = document.querySelector('.display-down');
let lateral = document.querySelector('.display-up-right');
let numeros = document.querySelector('.display-up-left-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votos = [];

function comecarEtapa() {
    let etapa = etapas [etapaAtual];
    
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0; i<etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        }
        else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=> {
        if (item.numero === numero) {
            return true;
        }
        else {
            return false;
        }
    });

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br\> Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if(candidato.fotos[i].small){
            fotosHtml += `<div class="display-up-right-img small"><img src="images/${candidato.fotos[i].url}" alt=""/> ${candidato.fotos[i].legenda}</div>`;

            }
            else{
                fotosHtml += `<div class="display-up-right-img"><img src="images/${candidato.fotos[i].url}" alt=""/> ${candidato.fotos[i].legenda}</div>`;
            }
        };

        lateral.innerHTML = fotosHtml;
    }
    else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class = "aviso-grande pisca">VOTO NULO</div>';
    }

    console.log("Canditado", candidato);
}

function clicou (n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        
        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        }
        else {
            atualizaInterface();
        }
    }
}
function branco() {
    
    numero = '';
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class = "aviso-grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';

}
function corrige() {
    comecarEtapa();

}
function confirma() {
    let etapa = etapas [etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });        
        console.log("Confirmando voto como BRANCO...");
    }
    else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });  
        console.log("Confirmando como " + numero);
    }

    if(votoConfirmado) {
        etapaAtual++;

        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        }
        else {
            document.querySelector('.tela').innerHTML = '<div class = "aviso-gigante">FIM</div>';
            console.log(votos);
            console.log("FIM!");
        }
    }

}

comecarEtapa();