
let borda = 5;
let intervalo;
let vidas = 1;
let palco = document.getElementById('palco');
let nivel = localStorage.getItem('nivel')
let velocidade=0

//verifica se o nível existe
if(!nivel){
    location.href = "index.html"
}

if(nivel === 'facil'){
    velocidade = 1800

    }else if(nivel === 'medio'){
        velocidade = 1200

        }else if(nivel === 'dificil'){
            velocidade = 800

            }else if(nivel === 'ninja'){
                velocidade = 400
}

// Ajusta a tela
function ajustarTamanho() {
    const painel = document.querySelector('.painel')

    if (!painel) return;

    larguraTela = window.innerWidth;
    alturaTela = window.innerHeight;

    palco.style.width = (larguraTela - (borda * 2)) + 'px';
    palco.style.height = ((alturaTela - (borda * 2))- painel.offsetHeight) + 'px'
}

ajustarTamanho();

window.addEventListener('resize', ajustarTamanho);

// Criação do personagem
function criarMosquito() {

    if(!palco) return

    const mosquito = document.createElement('img');

    mosquito.id = 'mosquito';
    mosquito.src = 'imagens/mosquito.png';
    mosquito.style.position = 'absolute';

    mosquito.onclick = function () {
        this.remove();
    };

    // Espera a imagem ter 50px
    let tamanhoMosquito = 50;

    const posicaoX = Math.floor(
        Math.random() * (palco.clientWidth - tamanhoMosquito)
    );

    const posicaoY = Math.floor(
        Math.random() * (palco.clientHeight - tamanhoMosquito)
    );

    tamanhoMosquito = Math.floor(Math.random()*50) + 50

    mosquito.style.width = tamanhoMosquito + 'px'
    mosquito.style.height = tamanhoMosquito + 'px'

    mosquito.style.left = posicaoX + "px";
    mosquito.style.top = posicaoY + "px";
    // mosquito.style.animation = `pulse ${velocidade/1000}s ease-in-out forwards`
    mosquito.style.animation = "pulse 0.3s ease-in-out infinite alternate"
    palco.appendChild(mosquito);
}

// Movimentação randômica do personagem

function moverPersonagem() {
    clearInterval(intervalo);

    criarMosquito();

    intervalo = setInterval(() => {
        const mosquitoAntigo = document.getElementById('mosquito');

        if (mosquitoAntigo) {
            document.getElementById('vida'+vidas).src = 'imagens/vazio.png'
            vidas +=1;
            mosquitoAntigo.remove();
            return;
        }

        if(vidas === 4 ){
            clearInterval(intervalo);
            window.location.href = 'fim.html'
        }

        criarMosquito();
    }, velocidade);
}


// Criação da raquete
const raquete = document.createElement('img');

raquete.src = 'imagens/mata_mosca.png';
raquete.className = 'raquete';
raquete.style.position = 'absolute';
raquete.style.display = 'block';
raquete.style.transform = 'rotate(50deg)';

if (palco) palco.appendChild(raquete);

// Parar o jogo
function parar() {
    clearInterval(intervalo);

    const mosquito = document.getElementById("mosquito");

    if (mosquito) {
        mosquito.remove();
    }

}

// Movimentação da raquete
if (palco) palco.addEventListener('mousemove', (evento) => {

    const rect = palco.getBoundingClientRect();

    const x = evento.clientX - rect.left;
    const y = evento.clientY - rect.top;

    const ajusteRaqueteX = -6;
    const ajusteRaqueteY = -27;

    raquete.style.left =
        x - ((raquete.offsetWidth / 2) + ajusteRaqueteX) + "px";

    raquete.style.top =
        y - ((raquete.offsetHeight / 2) + ajusteRaqueteY) + "px";

});


// Sumir a raquete na área dos botões
const areabotao = document.querySelector(".areabotao");

if (areabotao) {
    areabotao.addEventListener("mouseenter", () => {
        raquete.style.display = "none";
    });
    
    areabotao.addEventListener("mouseleave", () => {
        raquete.style.display = "block";
    });

}

// Animação da raquete ao clicar
document.addEventListener("mousedown", () => {
    raquete.style.transform =
        "scale(0.7) translateZ(10px) rotate(50deg)";
});

document.addEventListener("mouseup", () => {
    raquete.style.transform =
        "translate(0) rotate(50deg)";
});

setTimeout(()=>{
    moverPersonagem()
} 
,1000)
