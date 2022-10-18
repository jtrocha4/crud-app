import React, {useState } from 'react'
import {db} from '../firebase';
import {collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc} from 'firebase/firestore';

function Formulario() {

    const [usuarios, setUsuarios] = useState([])
    const [primerNombre, setPrimerNombre] = useState("")
    const [primerApellido, setPrimerApellido] = useState("")
    const [segundoApellido, setSegundoApellido] = useState("")
    const [fechaNacimiento, setFechaNacimiento] = useState("")
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [pais, setPais] = useState("")

    const guardarUsuarios= async(e) =>{
        e.preventDefault()
        try {
            const data = await addDoc(collection(db,"usuarios"),{
                primerNombre:primerNombre,
                primerApellido:primerApellido,
                segundoApellido:segundoApellido,
                fechaNacimiento:fechaNacimiento,
                correo:correo,
                telefono:telefono,
                pais:pais
            })

            setUsuarios([
                ...usuarios,
                {primerNombre:primerNombre,
                    primerApellido:primerApellido,
                    segundoApellido:segundoApellido,
                    fechaNacimiento:fechaNacimiento,
                    correo:correo,
                    telefono:telefono,
                    pais:pais}
            ])

            setPrimerNombre("")
            setPrimerApellido("")
            setSegundoApellido("")
            setFechaNacimiento("")
            setCorreo("")
            setTelefono("")
            setPais("")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container'>
            <h4>Agregar usuarios</h4>
            <form onSubmit={guardarUsuarios}>
                <div className="mb-3">
                    <label htmlFor="" className='form-label'>Primer Nombre</label>
                    <input type="text" className='form-control' value={primerNombre} onChange={(e) => setPrimerNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className='form-label'>Primer apellido</label>
                    <input type="text" className='form-control' value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className='form-label'>Segundo apellido</label>
                    <input type="text" className='form-control' value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className='form-label'>Fecha de nacimiento</label>
                    <input type="text" className='form-control' value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className='form-label'>Correo electronico</label>
                    <input type="text" className='form-control' value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className='form-label'>Numero de telefono</label>
                    <input type="text" className='form-control' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className='form-label'>Pais</label>
                    <input type="text" className='form-control' value={pais} onChange={(e) => setPais(e.target.value)} />
                </div>

                <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                    <button className='btn btn-primary' type='submit'>Agregar</button>
                </div>

            </form>

            <div>
                <h4>Lista de usuarios</h4>
            </div>

        </div>
    )
}

export default Formulario