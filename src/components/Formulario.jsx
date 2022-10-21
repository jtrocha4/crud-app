import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, query } from 'firebase/firestore';
import { async } from '@firebase/util';

function Formulario() {

    const [usuarios, setUsuarios] = useState([])
    const [primerNombre, setPrimerNombre] = useState("")
    const [primerApellido, setPrimerApellido] = useState("")
    const [segundoApellido, setSegundoApellido] = useState("")
    const [fechaNacimiento, setFechaNacimiento] = useState("")
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [pais, setPais] = useState("")
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState("")

    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)

    const [img, setImg] = useState(null)

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await onSnapshot(collection(db, "usuarios"), query => {
                    setUsuarios(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos()
    }, [])

    //Obtencion de imagenes al momento de agregar un usuario
    const url = `https://picsum.photos/id/${img}/450`
    const numAletorio = () => {
        const img = Math.floor(Math.random() * 100);
        setImg(img)
    }

    const guardarUsuarios = async (e) => {
        e.preventDefault()

        const numTelefono = /^\d{7,14}$/
        const nombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
        const correoElectronico = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        if (!primerNombre.trim()) {
            setError("Por favor ingrese su primer nombre")
            console.log("Por favor ingrese su primer nombre")
            return
        }
        if (!primerNombre.match(nombre)) {
            setError("El nombre solo puede contener letras y espacios")
            return
        }

        if (!primerApellido.trim()) {
            setError("Por favor ingrese su primer apellido")
            console.log("Por favor ingrese su primer apellido")
            return
        }
        if (!primerApellido.match(nombre)) {
            setError("El nombre solo puede contener letras y espacios")
            return
        }

        if (!segundoApellido.trim()) {
            setError("Por favor ingrese su segundo apellido")
            console.log("Por favor ingrese su segundo apellido")
            return
        }
        if (!segundoApellido.match(nombre)) {
            setError("El nombre solo puede contener letras y espacios")
            return
        }

        if (!fechaNacimiento.trim()) {
            setError("Por favor ingrese su fecha de nacimiento")
            console.log("Por favor ingrese su fecha de nacimiento")
            return
        }

        if (!correo.trim()) {
            setError("Por favor ingrese su correo electronico")
            console.log("Por favor ingrese su correo electronico")
            return
        }
        if (!correo.match(correoElectronico)) {
            setError("Su direccion de correo no es valida. Esta debe ser usuario@correo.com")
            return
        }

        if (!telefono.trim()) {
            setError("Por favor ingrese su numero de telefono")
            console.log("Por favor ingrese su numero de telefono")
            return
        }
        if (!telefono.match(numTelefono)) {
            setError("El telefono solo puede contener numeros. Entre 7 y 14 digitos")
            return
        }

        if (!pais.trim()) {
            setError("Por favor ingrese su pais de origen")
            console.log("Por favor ingrese su pais de origen")
            return
        }
        if (!pais.match(nombre)) {
            setError("El pais solo puede contener letras y espacios")
            return
        }

        //


        try {
            const data = await addDoc(collection(db, "usuarios"), {
                primerNombre: primerNombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                fechaNacimiento: fechaNacimiento,
                correo: correo,
                telefono: telefono,
                pais: pais,
                img: url
            })

            setUsuarios([
                ...usuarios,
                {
                    primerNombre: primerNombre,
                    primerApellido: primerApellido,
                    segundoApellido: segundoApellido,
                    fechaNacimiento: fechaNacimiento,
                    correo: correo,
                    telefono: telefono,
                    pais: pais,
                    id: data.id,
                    img: url
                }
            ])

            setPrimerNombre("")
            setPrimerApellido("")
            setSegundoApellido("")
            setFechaNacimiento("")
            setCorreo("")
            setTelefono("")
            setPais("")
            setExito("El usuario ha sido agregado correctamente")

            setTimeout(() => {
                setExito(null)
            }, 3000);

            setError(null)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarUsuario = async (id) => {
        try {
            await deleteDoc(doc(db, "usuarios", id))
        } catch (error) {
            console.log(error)
        }
    }

    const editar = (element) => {
        setPrimerNombre(element.primerNombre)
        setPrimerApellido(element.primerApellido)
        setSegundoApellido(element.segundoApellido)
        setFechaNacimiento(element.fechaNacimiento)
        setCorreo(element.correo)
        setTelefono(element.telefono)
        setPais(element.pais)
        setModoEdicion(true)
        setId(element.id)
    }

    const cancelar = () => {
        setModoEdicion(false)
        setPrimerNombre("")
        setPrimerApellido("")
        setSegundoApellido("")
        setFechaNacimiento("")
        setCorreo("")
        setTelefono("")
        setPais("")
        setId("")
        setError(null)
        setExito(null)
    }

    const EditarUsuarios = async (e) => {
        e.preventDefault()

        const numTelefono = /^\d{7,14}$/
        const nombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
        const correoElectronico = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        if (!primerNombre.trim()) {
            setError("Por favor ingrese su primer nombre")
            console.log("Por favor ingrese su primer nombre")
            return
        }
        if (!primerNombre.match(nombre)) {
            setError("El nombre solo puede contener letras y espacios")
            return
        }

        if (!primerApellido.trim()) {
            setError("Por favor ingrese su primer apellido")
            console.log("Por favor ingrese su primer apellido")
            return
        }
        if (!primerApellido.match(nombre)) {
            setError("El nombre solo puede contener letras y espacios")
            return
        }

        if (!segundoApellido.trim()) {
            setError("Por favor ingrese su segundo apellido")
            console.log("Por favor ingrese su segundo apellido")
            return
        }
        if (!segundoApellido.match(nombre)) {
            setError("El nombre solo puede contener letras y espacios")
            return
        }

        if (!fechaNacimiento.trim()) {
            setError("Por favor ingrese su fecha de nacimiento")
            console.log("Por favor ingrese su fecha de nacimiento")
            return
        }

        if (!correo.trim()) {
            setError("Por favor ingrese su correo electronico")
            console.log("Por favor ingrese su correo electronico")
            return
        }
        if (!correo.match(correoElectronico)) {
            setError("Su direccion de correo no es valida. Esta debe ser usuario@correo.com")
            return
        }

        if (!telefono.trim()) {
            setError("Por favor ingrese su numero de telefono")
            console.log("Por favor ingrese su numero de telefono")
            return
        }
        if (!telefono.match(numTelefono)) {
            setError("El telefono solo puede contener numeros. Entre 7 y 14 digitos")
            return
        }

        if (!pais.trim()) {
            setError("Por favor ingrese su pais de origen")
            console.log("Por favor ingrese su pais de origen")
            return
        }
        if (!pais.match(nombre)) {
            setError("El pais solo puede contener letras y espacios")
            return
        }

        try {
            const docRef = doc(db, "usuarios", id)
            await updateDoc(docRef, {
                primerNombre: primerNombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                fechaNacimiento: fechaNacimiento,
                correo: correo,
                telefono: telefono,
                pais: pais,
                img: url
            })

            const nuevaLista = usuarios.map(
                (element) =>
                    element.id === id ?
                        {
                            id: id,
                            primerNombre: primerNombre,
                            primerApellido: primerApellido,
                            segundoApellido: segundoApellido,
                            fechaNacimiento: fechaNacimiento,
                            correo: correo,
                            telefono: telefono,
                            pais: pais,
                            img: url
                        } : element

            )

            setUsuarios(nuevaLista)
            setPrimerNombre("")
            setPrimerApellido("")
            setSegundoApellido("")
            setFechaNacimiento("")
            setCorreo("")
            setTelefono("")
            setPais("")
            setExito("El usuario ha sido editado correctamente")

            setTimeout(() => {
                setExito(null)
            }, 3000);

            setError(null)

            setModoEdicion(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='container'>

            <div className='container mt-4 col-md-8'>
                <h4 className='text-center mb-3'>
                    {
                        modoEdicion ? "Editar usuario" : "Agregar usuario"
                    }
                </h4>
                <form onSubmit={modoEdicion ? EditarUsuarios : guardarUsuarios}>

                    {
                        error != null ? (<div className='alert alert-danger' role="alert"><i className='bi bi-exclamation-triangle'> {error}</i></div>) : null
                    }
                    {
                        exito != null ? (<div className='alert alert-success' role="alert"><i className='bi bi-check-circle'></i> {exito}</div>) : null
                    }

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
                        <input type="date" className='form-control' value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
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

                        {
                            modoEdicion ? (
                                <><button className='btn btn-info' type='submit' onClick={numAletorio}>Editar</button>
                                    <button className='btn btn-danger' type='submit' onClick={() => cancelar()}>Cancelar</button></>
                            ) : (
                                <button className='btn btn-primary' type='submit' onClick={numAletorio}>Agregar</button>
                            )
                        }
                    </div>

                </form>
            </div>

            <hr />
            <div className='mt-3'>
                <h4>Lista de usuarios</h4>
                <div className="row">
                    {
                        usuarios.map((element) => (
                            <div className="col col-auto col-sm-auto col-md-4" key={element.correo}>
                                <div className="card mb-3">
                                    <div className='d-grid gap-1 d-md-flex justify-content-md-end my-2 me-1'>
                                        <button className='btn btn-warning' type='button' onClick={() => editar(element)}>Editar</button>
                                        <button className='btn btn-danger' type='button' onClick={() => eliminarUsuario(element.id)}>Eliminar</button>
                                    </div>
                                    <img className='card-img-top' src={element.img} height="200px"></img>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{element.primerNombre} {element.primerApellido} {element.segundoApellido}</h5>
                                        <ul className='card-text mb-3 list-unstyled'>
                                            <li>
                                                <i className='bi bi-calendar-event'> {element.fechaNacimiento}</i>
                                            </li>
                                            <li>
                                                <i className='bi bi-geo'> {element.pais}</i>
                                            </li>
                                            <li>
                                                <i className='bi bi-envelope'> {element.correo}</i>
                                            </li>
                                            <li>
                                                <i className='bi bi-telephone'> {element.telefono}</i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Formulario