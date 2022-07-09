let imagem = document.querySelector("#foto-pascoal");
imagem.addEventListener("mouseenter", entrou);
imagem.addEventListener("mouseleave", saiu);
let projetos = document.querySelector(".grid");
let ver_mais = document.querySelector(".ver-mais");
ver_mais.addEventListener("click", addProjetos);
const btnMobile = document.querySelector("#btn-mobile");
btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart ", toggleMenu);


const links = document.querySelectorAll(".menu-itens a");
const HEADER_HEIGHT = 87.33


links.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const secao = document.querySelector(link.getAttribute("href"));
        smoothScrollTo(0, secao.offsetTop - HEADER_HEIGHT);
    });
});

function toggleMenu(event) {
    if (event.type === "touchstart") event.preventDefault();
    nav = document.querySelector(".nav");
    nav.classList.toggle("active");
    const active = nav.classList.contains("active");
    event.currentTarget.setAttribute("aria-expanded", active);
    if (active) event.currentTarget.setAttribute("aria-label", "Fechar Menu");
    else event.currentTarget.setAttribute("aria-label", "Abrir Menu");
}
const itensLista = document.querySelectorAll('.itemLista')
itensLista.forEach(elem => {
    elem.addEventListener('click', () => {
        nav.classList.toggle('active')
    })
})


function entrou() {
    imagem.setAttribute("src", "img/foto-pascoal01.png");
}

function saiu() {
    console.log("Saiu");
    imagem.setAttribute("src", "img/foto-pascoal.png");
}

let cont_projetos_a_demonstrar = 0;
const por_vez = 3;
const listaProjetos = [{
        nome: "",
        img: "/img/analizadordenumeros.png",
        link: "https://github.com/PascoalKahamba/AnalisadordeNumeros",
    },
    {
        nome: "",
        img: "/img/supercontador.png",
        link: ""
    },
    {
        nome: "",
        img: "/img/fotoprojeto.png",
        link: "https://github.com/PascoalKahamba/-ContaDiasdoAno"
    },
    {
        nome: "",
        img: "/img/verificadordeidade.png",
        link: "https://github.com/PascoalKahamba/VerificadordeIdade"
    },
    {
        nome: "",
        img: "/img/horadodia.png",
        link: ""
    },
    {
        nome: "",
        img: "/img/Capturar.png",
        link: ""
    },
    {
        nome: "",
        img: "/img/trocavalores.png",
        link: "https://github.com/PascoalKahamba/TrocaValores"
    },
    {
        nome: "",
        img: "/img/layout1.png",
        link: "https://github.com/PascoalKahamba/Layout02"
    },
    {
        nome: "",
        img: "/img/layout3.png",
        link: ""
    },
];

function addProjetos() {
    if (!listaProjetos[cont_projetos_a_demonstrar]) {
        cont_projetos_a_demonstrar = 0;
        projetos.innerHTML = "";
        smoothScrollTo(0, document.querySelector('#projetos').offsetTop - HEADER_HEIGHT)
        addProjetos();
        return;
    }
    for (
        let cont = cont_projetos_a_demonstrar; cont < cont_projetos_a_demonstrar + por_vez; cont++
    ) {
        projetos.innerHTML += `
        <a href="${listaProjetos[cont].link}" target="__blank">
            <div style="background-image:url(${listaProjetos[cont].img})">${listaProjetos[cont].nome}</div>
        </a>
        `;
    }

    cont_projetos_a_demonstrar = cont_projetos_a_demonstrar + 3;
    if (!listaProjetos[cont_projetos_a_demonstrar]) {
        ver_mais.innerHTML = "Ver menos";
    } else {
        ver_mais.innerHTML = "Ver mais";
    }
}

addProjetos();
// console.log(cont_projetos_a_demonstrar);

function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== "undefined" ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1)
            return (distance / 2) * time * time * time * time + from;
        return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 100 / 60); // 60 fps
}