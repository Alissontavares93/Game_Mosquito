
// Variáveis Globais
let borda = 5;
let larguraTela = 0;
let alturaTela = 0;
let nivel = document.getElementById('nivel')
let btn_start = document.getElementById('start')

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


btn_start.onclick = () => {
    if(nivel.value ===''){
        window.alert('Informe o nível do jogo!')
    }else{
        localStorage.setItem('nivel',nivel.value)
        location.href = "game.html"
        }
}