// Agregar dinámicamente campos de texto

const numeroInput = document.getElementById('numero_armazones');
const numeroLentes = () => {
    const numeroArmazones = parseInt(numeroInput.value) || 0;
    const infoArmazones = document.getElementById('armazones_field');
    const infoGraduaciones = document.getElementById('graduaciones');
    
    
    fetch('/user/empleado/crear-contrato/get-json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(result => result.json())
    .then(data => {
        console.log(data);
        let html = "";
        let html2 = "";

        html2+=`
        <table class="table is-bordered is-fullwidth">
            <tr>
                <th>OJO</th>
                <th>ESFERA</th>
                <th>CILINDRO</th>
                <th>EJE</th>
                <th>ADD</th>
                <th>DIP/AO</th>
            </tr>
        `

        
        for (let i = 0; i < numeroArmazones; i++){
            html+=`
                <div class="field is-horizontal">
                    <div class="field-body">
                        <p class="control is-expanded has-icons-left">
                            <input class="input" type="text" id="paciente[${i}]" name="paciente[${i}]" autocomplete="off" placeholder="Paciente">
                            <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                            </span>
                        </p>
                        <div class="select mx-3 is-fullwidth">
                            <select name="armazones[]">
                                <option>Armazón</option>`
                                for (let armazon of data.armazones) {
                                    html+=`<option value="${armazon.marca} ${armazon.modelo} ${armazon.material} ${armazon.color}">` 
                                    if(armazon.marca) html+= `${armazon.marca} `
                                    if(armazon.modelo) html+= `${armazon.modelo} ` 
                                    if(armazon.material) html+= `${armazon.material} `
                                    if(armazon.color) html+= `${armazon.color} `
                                    html+=`</option>`
                                }
                            html+=`</select>
                        </div>
                        <div class="select mr-3">
                            <select name="tipos_lentes[]">
                                <option>Monofocal</option>
                                <option>Flaptop</option>
                                <option>Blended</option>
                                <option>Progresivos</option>
                            </select>
                        </div>
                        <div class="select">
                            <select name="tratamientos[]">
                                <option>Tratamientos</option>`
                                for (let tratamiento of data.tratamientos) {
                                html+=`<option>${tratamiento.tratamiento}</option>`
                                }
                            html+=`</select>
                        </div>
                    </div>
                </div>
            `

            html2+=`
                <tr>
                    <th>
                        DERECHO
                        <p id="output_d[${i}]"></p>
                    </th>
                    <td><input class="input" 
                        type="text" 
                        autocomplete="off" 
                        name="graduaciones[${i}][esfera_d]" 
                        placeholder="Esfera OD"
                        pattern="([+\-]\d*\.\d*)|N"
                        title="Graduación Esfera"
                        ></td>
                    <td><input class="input" 
                        type="text"
                        autocomplete="off" 
                        name="graduaciones[${i}][cilindro_d]" 
                        placeholder="Cilindro OD"
                        pattern="([+\-]\d*\.\d*)|N"
                        ></td>
                    <td>
                        <div class="field has-addons">
                            <div class="control">
                            <input class="input" 
                            type="text"
                            autocomplete="off" 
                            name="graduaciones[${i}][eje_d]" 
                            placeholder="Eje OD"
                            pattern="([+\-]\d*\.\d*)|N"
                            >
                            </div>
                            <div class="control">
                            <span class="button is-static">º</span>
                            </div>
                        </div>
                    </td>
                    <td><input class="input"
                        type="text"  
                        autocomplete="off" 
                        name="graduaciones[${i}][add_d]" 
                        placeholder="Add OD"
                        pattern="([+\-]\d*\.\d*)|N"
                        ></td>
                    <td>
                        <div class="field has-addons">
                            <div class="control">
                            <input class="input" 
                            type="text" 
                            autocomplete="off" 
                            name="graduaciones[${i}][dip_d]" 
                            placeholder="DIP OD"
                            pattern="([+\-]\d*\.\d*)|N"
                            >
                            </div>
                            <div class="control">
                            <span class="button is-static">mm</span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        IZQUIERDO
                        <p id="output_i[${i}]"></p>
                    </th>
                    <td><input class="input" 
                        type="text" 
                        autocomplete="off" 
                        name="graduaciones[${i}][esfera_i]" 
                        placeholder="Esfera OI"
                        pattern="([+\-]\d*\.\d*)|N"
                        ></td>
                    <td><input class="input" 
                        type="text"
                        autocomplete="off" 
                        name="graduaciones[${i}][cilindro_i]" 
                        placeholder="Cilindro OI"
                        pattern="([+\-]\d*\.\d*)|N"
                        ></td>
                    <td>
                        <div class="field has-addons">
                            <div class="control">
                            <input class="input" 
                            type="text"
                            autocomplete="off" 
                            name="graduaciones[${i}][eje_i]" 
                            placeholder="Eje OI"
                            pattern="([+\-]\d*\.\d*)|N"
                            >
                            </div>
                            <div class="control">
                            <span class="button is-static">º</span>
                            </div>
                        </div>
                    </td>
                    <td><input class="input"
                        type="text"  
                        autocomplete="off" 
                        name="graduaciones[${i}][add_i]" 
                        placeholder="Add OI"
                        pattern="([+\-]\d*\.\d*)|N"
                        ></td>
                    <td>
                        <div class="field has-addons">
                            <div class="control">
                            <input class="input" 
                            type="text" 
                            autocomplete="off" 
                            name="graduaciones[${i}][dip_i]" 
                            placeholder="DIP OI"
                            pattern="([+\-]\d*\.\d*)|N"
                            >
                            </div>
                            <div class="control">
                            <span class="button is-static">mm</span>
                            </div>
                        </div>
                    </td>
                </tr>
            `
        }
        html2+=`</table>`
        infoArmazones.innerHTML = html;
        infoGraduaciones.innerHTML = html2;
        mismoNombre(numeroArmazones);
    })

}

numeroInput.onkeyup = numeroLentes;
if(numeroInput.value) numeroLentes()

// Autorrellenado de valor saldo
const total_venta = document.getElementById('total_venta');
const anticipo = document.getElementById('anticipo');
const saldo = document.getElementById('saldo');

total_venta.addEventListener('input', () => {
    saldo.value = total_venta.value - anticipo.value;
})

anticipo.addEventListener('input', () => {
    if (total_venta.value - anticipo.value > 0){
        saldo.value = total_venta.value - anticipo.value;
        saldo.style.color = "black";
    } else {
        saldo.value = 0;
        saldo.style.color = "red";
    }
})

// Autorrellenado de nombres
const mismoNombre = (numeroArmazones) => {
    for (let i = 0; i < numeroArmazones; i++){
        const textInput = document.getElementById(`paciente[${i}]`);
        const textOutputD = document.getElementById(`output_d[${i}]`);
        const textOutputI = document.getElementById(`output_i[${i}]`);
        
        textInput.addEventListener("input", () => {
            console.log("Text Input", textInput)

            textOutputD.textContent = textInput.value;
            textOutputI.textContent = textInput.value;
        })

    }

    const inputs = document.querySelectorAll('table input');

    inputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const fila = event.target.closest('tr');
            const celdaNombre = fila.querySelector('th');
            
            const nombre = celdaNombre.textContent.trim();

            
            const otrasFilas = document.querySelectorAll('tr');
            
            otrasFilas.forEach(otraFila => {
                const otraCeldaNombre = otraFila.querySelector('th');
                const otroNombre = otraCeldaNombre.textContent.trim()
                // console.log(otraCeldaNombre.textContent.trim());
                
                if(otroNombre != "DERECHO" && otroNombre != "IZQUIERDO" && otroNombre === nombre){
                    const otrosInputs = otraFila.querySelectorAll('input');
                    const actualInputs = fila.querySelectorAll('input');

                    otrosInputs.forEach((otroInput, index) => {
                        if (actualInputs[index]){
                            otroInput.value = actualInputs[index].value;
                        }
                    })
                }

            })
            
            
            

        })
    })
}