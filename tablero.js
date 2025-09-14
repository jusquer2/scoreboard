// Al inicio de tu código, añade estas variables globales
let gameState = {
    ballIndex: 0,
    strikeIndex: 0,
    outsIndex: 0,
    scoreLocal: 0,
    scoreVisitor: 0,
    inning: 1,
    localName: "Local",
    visitorName: "Visitor",
    bases: [false, false, false], // base1, base2, base3
    triangleDown: false
};
let ballIndex = 0; // Índice de la bola actual a activar
let strikeIndex = 0; // Índice de la bola actual a activar
let outsIndex = 0; // Índice de la bola actual a activar
let scoreLocal = 0;
let scoreVisitor = 0;
let inning = 1;
let localName="Local";
let visitorName="Visitor";

const localEvtName= document.getElementById("label-local");
const inputLocal = document.getElementById("input-local");
const visitorEvtName= document.getElementById("label-visitor");
const inputVisitor = document.getElementById("input-visitor");
document.addEventListener("keydown", function (event) {
    const balls = document.querySelectorAll(".balls .circle");
    const strikes = document.querySelectorAll(".strikes .circle");
    const outs = document.querySelectorAll(".outs .circle");
    const base1 = document.querySelector(".base1");
    const base2 = document.querySelector(".base2");
    const base3 = document.querySelector(".base3");
    const triangle = document.querySelector(".triangle");
    
    if (event.key === "F1" && !event.shiftKey) {
        // Activa la siguiente bola
        if (ballIndex < balls.length) {
            balls[ballIndex].style.backgroundColor = "#ffcc00"; // Color activo
            ballIndex++;
        } else {
            // Desactiva las bolas y reinicia el índice
            for (let i = 0; i < balls.length; i++) {
                balls[i].style.backgroundColor = "#ddd"; // Color inactivo
            }
            ballIndex = 0; // Reinicia el índice
        }
        event.preventDefault(); // Previene el comportamiento predeterminado de F1
    }

    if (event.key === "F1" && event.shiftKey) {
        // Desactiva las bolas y reinicia el índice
        for (let i = 0; i < balls.length; i++) {
            balls[i].style.backgroundColor = "#ddd"; // Color inactivo
        }
        ballIndex = 0; // Reinicia el índice
        event.preventDefault(); // Previene el comportamiento predeterminado de Shift + F1
    }
    // Manejo de strikes con F2
    if (event.key === "F2" && !event.shiftKey) {
        if (strikeIndex < strikes.length) {
            strikes[strikeIndex].style.backgroundColor = "#ff0000"; // Color activo para strikes
            strikeIndex++;
        } else {
            for (let i = 0; i < strikes.length; i++) {
                strikes[i].style.backgroundColor = "#ddd"; // Color inactivo
            }
            strikeIndex = 0; // Reinicia el índice
        }
        event.preventDefault(); // Previene el comportamiento predeterminado de F2
    }

    if (event.key === "F2" && event.shiftKey) {
        for (let i = 0; i < strikes.length; i++) {
            strikes[i].style.backgroundColor = "#ddd"; // Color inactivo
        }
        strikeIndex = 0; // Reinicia el índice
        event.preventDefault();
    }
    // Manejo de OUTS con F3
    if (event.key === "F3" && !event.shiftKey) {
        if (outsIndex < outs.length) {
            outs[outsIndex].style.backgroundColor = "#ff0000"; // Color activo para outs
            outsIndex++;
        } else {
            for (let i = 0; i < outs.length; i++) {
                outs[i].style.backgroundColor = "#ddd"; // Color inactivo
            }
            outsIndex = 0; // Reinicia el índice
            for (let i = 0; i < strikes.length; i++) {
                strikes[i].style.backgroundColor = "#ddd"; // Color inactivo
            }
            strikeIndex = 0; // Reinicia el índice
            for (let i = 0; i < balls.length; i++) {
                balls[i].style.backgroundColor = "#ddd"; // Color inactivo
            }
            ballIndex = 0; // Reinicia el índice
            if (!triangle.classList.contains("down")) {
                inning++;
            }
            if (base1.classList.contains("active")) {
                toggleBase(base1)
            }
            if (base2.classList.contains("active")) {
                toggleBase(base2)
            }
            if (base3.classList.contains("active")) {
                toggleBase(base3)
            }
            triangle.classList.toggle("down")


            document.getElementById("inning").innerHTML = inning + ""
        }
        event.preventDefault(); // Previene el comportamiento predeterminado de F2
    }

    if (event.key === "F3" && event.shiftKey) {
        for (let i = 0; i < outs.length; i++) {
            outs[i].style.backgroundColor = "#ddd"; // Color inactivo
        }
        outsIndex = 0; // Reinicia el índice
        event.preventDefault();
    }
    if (event.key === "5" && !event.shiftKey) {
        scoreVisitor++;
        document.getElementById("visitor-score").innerHTML = scoreVisitor + ""
    }
    if (event.key === "%" && event.shiftKey) {
        if (scoreVisitor != 0) {
            scoreVisitor--;
        }

        document.getElementById("visitor-score").innerHTML = scoreVisitor + ""
    }
    if (event.key === "6" && !event.shiftKey) {
        scoreLocal++;
        document.getElementById("local-score").innerHTML = scoreLocal + ""
    }
    if (event.key === "^" && event.shiftKey) {
        if (scoreLocal != 0) {
            scoreLocal--;
        }

        document.getElementById("local-score").innerHTML = scoreLocal + ""
    }
    if (event.key === "7" && !event.shiftKey) {
        inning++;
        document.getElementById("inning").innerHTML = inning + ""
    }
    if (event.key === "&" && event.shiftKey) {
        if (inning != 1) {
            inning--;
        }

        document.getElementById("inning").innerHTML = inning + ""
    }
    if (event.key === "+" || event.key === "=") {
        // Añadir clase para activar la animación
        let scoreElement = null;
        if (!triangle.classList.contains("down")) {
                    scoreElement = document.getElementById('local-score');
                } else {
                    scoreElement = document.getElementById('visitor-score');
                }
            scoreElement.classList.add('changing');
            
            // Cambiar el valor después de que comience la animación
            setTimeout(() => {
                if (!triangle.classList.contains("down")) {
                    scoreLocal++;
                } else {
                    scoreVisitor++;
                }
                document.getElementById("local-score").innerHTML = scoreLocal + ""
                document.getElementById("visitor-score").innerHTML = scoreVisitor + ""
            }, 300); // La mitad del tiempo de la animación
            
            // Remover la clase después de que termine la animación
            setTimeout(() => {
                scoreElement.classList.remove('changing');
            }, 600);
        
    }
    if (event.key === "-") {
         // Añadir clase para activar la animación
        let scoreElement = null;
        if (!triangle.classList.contains("down")) {
                    scoreElement = document.getElementById('local-score');
                } else {
                    scoreElement = document.getElementById('visitor-score');
                }
            scoreElement.classList.add('changing');
            
            // Cambiar el valor después de que comience la animación
            setTimeout(() => {
                if (!triangle.classList.contains("down")) {
                    if (scoreLocal != 0) {
                        scoreLocal--;
                    }
                } else {
                    if (scoreVisitor != 0) {
                        scoreVisitor--;
                    }
                }
                document.getElementById("local-score").innerHTML = scoreLocal + ""
                document.getElementById("visitor-score").innerHTML = scoreVisitor + ""
            }, 300); // La mitad del tiempo de la animación
            
            // Remover la clase después de que termine la animación
            setTimeout(() => {
                scoreElement.classList.remove('changing');
            }, 600);
    }
    if (event.key === "8" && !event.shiftKey) {
        let carreras = 1;
        if(base1.classList.contains('active')){
            carreras++;
        }
        if(base3.classList.contains('active')){
            carreras++;
        }
        if(base2.classList.contains('active')){
            carreras++;
        }
        const slidertext =document.getElementsByClassName('slider-text')
        if(carreras==4){
            slidertext.item(0).textContent = "¡GRAND SLAM!"
        }else{
             slidertext.item(0).textContent = carreras==1?`¡HOME RUN!`:`¡${carreras}RUN HOME RUN!`
        }
        let elementId ="";
        if (!triangle.classList.contains("down")) {
                scoreLocal+=carreras;
                elementId='local-score';
            
        } else {
            
                scoreVisitor+=carreras;
                elementId='visitor-score';
            
        }
          const scoreElement = document.getElementById(elementId);
            
            // Añadir clase para activar la animación
            scoreElement.classList.add('changing');
            
            // Cambiar el valor después de que comience la animación
            setTimeout(() => {
                document.getElementById("local-score").innerHTML = scoreLocal + ""
                document.getElementById("visitor-score").innerHTML = scoreVisitor + ""
            }, 300); // La mitad del tiempo de la animación
            
            // Remover la clase después de que termine la animación
            setTimeout(() => {
                scoreElement.classList.remove('changing');
            }, 600);
        
        homeRun();
    }



    switch (event.key) {
        case "1":
            toggleBase(base1);
            break;
        case "2":
            toggleBase(base2);
            break;
        case "3":
            toggleBase(base3);
            break;
        case "4":
            triangle.classList.toggle("down")
            break;
    }



});

localEvtName.addEventListener("click",function (){
    
    inputLocal.classList.toggle("show");
    inputLocal.focus();
    inputLocal.select();
    localEvtName.classList.toggle("hide");
}

)
visitorEvtName.addEventListener("click",function (){
    
    inputVisitor.classList.toggle("show");
    inputVisitor.focus();
    inputVisitor.select();
    visitorEvtName.classList.toggle("hide");
});
// Selecciona el input por su ID
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');

btn1.addEventListener("click",function (){
    debugger;
    const stat = document.querySelector('.stat-group.balls')
    stat.classList.toggle('hide')
});
btn2.addEventListener("click",function (){
    const stat = document.querySelector('.stat-group.strikes')
    stat.classList.toggle('hide')
});
btn3.addEventListener("click",function (){
    const stat = document.querySelector('.stat-group.outs')
    stat.classList.toggle('hide')
});


// Agrega un evento keydown al input
inputLocal.addEventListener("keydown", function(event) {
    // Verifica si la tecla presionada es Enter
    if (event.key === "Enter") {
        // Evita que se envíe el formulario si está dentro de uno
        event.preventDefault();
        localName=inputLocal.value;
        localEvtName.innerHTML = localName;
        localEvtName.classList.toggle("hide");
        inputLocal.classList.toggle("show");
        
    }
});
inputVisitor.addEventListener("keydown", function(event) {
    // Verifica si la tecla presionada es Enter
    if (event.key === "Enter") {
        // Evita que se envíe el formulario si está dentro de uno
        event.preventDefault();
        visitorName=inputVisitor.value;
        visitorEvtName.innerHTML = visitorName;
        visitorEvtName.classList.toggle("hide");
        inputVisitor.classList.toggle("show");
        
    }
});

function toggleBase(base) {
    base.classList.toggle("active"); // Alterna la clase active
}
function homeRun(){
    const homeruntext = document.querySelector(".slider-container");
    const base1 = document.querySelector(".base1");
    const base2 = document.querySelector(".base2");
    const base3 = document.querySelector(".base3");
    homeruntext.classList.toggle('active-slide');
    if(base1.classList.contains('active')){
        toggleBase(base1)
    }
    if(base2.classList.contains('active')){
        toggleBase(base2)
    }
    if(base3.classList.contains('active')){
        toggleBase(base3)
    }

    setTimeout(() => {
        homeruntext.classList.toggle('active-slide');
    }, 10000);
    
    
}
    // Obtén el elemento select
    const localsSelect = document.getElementById('locals-select');
    
    // Obtén el elemento donde se mostrará el jugador seleccionado
    const localAtBate = document.getElementById('local-at-bate');

    const localHoy = document.getElementById('local-hoy');

  

        // Obtén el elemento select
        const visitorsSelect = document.getElementById('visitors-select');
    
        // Obtén el elemento donde se mostrará el jugador seleccionado
        const visitorAtBate = document.getElementById('visitor-at-bate');
    
        const visitorHoy = document.getElementById('visitor-hoy');
        const selectedvisitorinp = document.getElementById('selectedvisitorinp');
        const selectedvisitorinp2 = document.getElementById('selectedvisitorinp2');
    
 
        const btnselectedvisitor =  document.getElementById("btnselectedvisitor");
        btnselectedvisitor.addEventListener("click", function () {
            const correctedValue = visitorsSelect.value.replace(/(\w+):'/g, '"$1":"') // Agrega comillas dobles alrededor de claves y valores
            .replace(/'/g, '"');     
            const player=JSON.parse(correctedValue) 

            player.hit = selectedvisitorinp.value;
            player.turns = selectedvisitorinp2.value;

            visitorsSelect.value = JSON.stringify(player);
        })
		


