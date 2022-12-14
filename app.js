const formulario = document.querySelector("#formulario");
const cardsEstudiantes = document.querySelector("#cardsEstudiantes");
const cardsProfesores = document.querySelector("#cardsProfesores");
const templateEstudiante = document.querySelector("#templateEstudiante").content
const templateProfesor = document.querySelector("#templateProfesor").content
const alert = document.querySelector('.alert');

const estudiantes = []
const profesores = []


// Aca 1h05m vamos a hacer delegacion de eventos para evitar el burbujeo
document.addEventListener('click', (e)=> {
    // console.log(e.target.dataset.nombre);
    if (e.target.dataset.nombre) {
        // console.log(e.target.matches(".btn-success"))
        if (e.target.matches(".btn-success")) {
            estudiantes.map((item) => {
                if (item.nombre === e.target.dataset.nombre) {
                    item.setEstado = true;
                }
                console.log(item);
                return item;
            });
        }
        if (e.target.matches(".btn-danger")) {
            estudiantes.map((item) => {
                if (item.nombre === e.target.dataset.nombre) {
                    item.setEstado = false;
                }
                console.log(item);
                return item;
            });
        }
        // Toca volver a pintarlo ya que se modifico
        Persona.pintarPersonaUI(estudiantes, "Estudiante")
    }
    
})


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
        alert.classList.add('d-none')

    
    const datos = new FormData(formulario);
    const [nombre, edad, opcion] = [...datos.values()];

    // Validacion.
    if (!nombre.trim() || !edad.trim() || !opcion.trim()) {
        console.log('Datos en blanco');
        alert.classList.remove('d-none')
        return;
    }
    
    if (opcion === "Estudiante") {
        const estudiante = new Estudiante(nombre, edad);
        estudiantes.push(estudiante);   
        Persona.pintarPersonaUI(estudiantes,opcion)
    }

    if (opcion === "Profesor") {
        const profesor = new Profesor(nombre, edad);
        profesores.push(profesor);
        Persona.pintarPersonaUI(profesores,opcion)
    }


    
    
});

class Persona{
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    // Metodo estatico

    static pintarPersonaUI(personas, tipo) {
        if (tipo === "Estudiante") {
            
            cardsEstudiantes.textContent = "";
            const fragment = document.createDocumentFragment();

            personas.forEach((item) => {
                fragment.appendChild(item.agregarNuevoEstudiante());
            });

            cardsEstudiantes.appendChild(fragment);
        }    

        if (tipo === "Profesor") {
            cardsProfesores.textContent = "";
            const fragment = document.createDocumentFragment();
            personas.forEach((item) => {
                fragment.appendChild(item.agregarNuevoProfesor());
            });

            cardsProfesores.appendChild(fragment);    
        }    
            
     }
 }



class Estudiante extends Persona{
    #estado = false;
    #estudiante = "Estudiante"

    // como son propiedades privadas para modificarlas necesitamos set

    set setEstado(estado) {
        this.#estado = estado
    }

    // Lo mismo para poder pintar el estudiante necesito un get

    get getEstudiante() {
        return this.#estudiante

    }

    // Ponemos un metodo
    agregarNuevoEstudiante() {
        const clone = templateEstudiante.cloneNode(true);
        clone.querySelector('h5 .text-primary').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.getEstudiante;
        clone.querySelector('p').textContent = this.edad;

        if (this.#estado) {
            clone.querySelector('.badge').className = "badge bg-success"
            clone.querySelector('.btn-success').disabled = true;
            clone.querySelector('.btn-danger').disabled = false;

        } else {
            clone.querySelector('.badge').className = "badge bg-danger"
            clone.querySelector('.btn-danger').disabled = true;
            clone.querySelector('.btn-success').disabled = false;
            
        }
            clone.querySelector('.badge').textContent = this.#estado ? "Aprobado" : "Reprobado"

        clone.querySelector('.btn-success').dataset.nombre = this.nombre;
        clone.querySelector('.btn-danger').dataset.nombre = this.nombre;
        

        return clone;
    }
}

class Profesor extends Persona{
    #profesor = "Profesor"

    agregarNuevoProfesor(){
        const clone = templateProfesor.cloneNode(true);
        clone.querySelector('h5').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.#profesor;
        clone.querySelector('p').textContent = this.edad;

        return clone;
    }
}


































































































































































