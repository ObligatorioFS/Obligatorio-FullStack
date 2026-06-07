import { Actividad } from "../modelos/actividad.model.js";
import { Clase } from "../modelos/clase.model.js";
import { Rutina } from "../modelos/rutina.model.js";
import { Sala } from "../modelos/sala.model.js";
import { Usuario } from "../modelos/user.model.js";

const obtenerEstadisticasAdmin = async () => {
  const clases = await Clase.find().populate("actividad", "nombre")
  const actividades = await Actividad.find()
  const salas = await Sala.find()
  const rutinas = await Rutina.find()

  const cuposOcupados = clases.reduce((total, clase) => {
    return total + (clase.inscriptos?.length || 0)
  }, 0)

  const capacidadTotal = clases.reduce((total, clase) => {
    return total + Number(clase.capacidadMax || 0)
  }, 0)

  const cuposDisponibles = capacidadTotal - cuposOcupados

  const ocupacionPromedio = capacidadTotal > 0
    ? Math.round((cuposOcupados / capacidadTotal) * 100)
    : 0

  const clasesLlenas = clases.filter(clase => {
    return (clase.inscriptos?.length || 0) >= clase.capacidadMax
  }).length

  const rutinasPendientes = rutinas.filter(rutina => {
    return !rutina.ejercicios || rutina.ejercicios.length === 0
  }).length

  const actividadesConClases = actividades.filter(actividad => {
    return clases.some(clase => {
      return clase.actividad?._id?.toString() === actividad._id.toString()
    })
  }).length

  const popularidad = {}

  clases.forEach(clase => {
    const nombreActividad = clase.actividad?.nombre || "Sin actividad"
    const inscriptos = clase.inscriptos?.length || 0

    popularidad[nombreActividad] = (popularidad[nombreActividad] || 0) + inscriptos
  })

  const actividadMasPopularArray = Object.entries(popularidad)
    .sort((a, b) => b[1] - a[1])

  const actividadMasPopular = actividadMasPopularArray.length > 0
    ? {
        nombre: actividadMasPopularArray[0][0],
        cuposOcupados: actividadMasPopularArray[0][1]
      }
    : {
        nombre: "Sin datos",
        cuposOcupados: 0
      }

  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

  const ocupacionPorDia = dias.map(dia => {
    const clasesDelDia = clases.filter(clase => clase.dia === dia)

    const ocupados = clasesDelDia.reduce((total, clase) => {
      return total + (clase.inscriptos?.length || 0)
    }, 0)

    const capacidad = clasesDelDia.reduce((total, clase) => {
      return total + Number(clase.capacidadMax || 0)
    }, 0)

    const ocupacion = capacidad > 0
      ? Math.round((ocupados / capacidad) * 100)
      : 0

    return {
      dia,
      ocupacion,
      ocupados,
      capacidad
    }
  })

  return {
    clasesActivas: clases.length,
    cuposOcupados,
    actividadesDisponibles: actividades.length,
    actividadesConClases,
    actividadMasPopular,
    salasDisponibles: salas.length,
    cuposDisponibles,
    ocupacionPromedio,
    rutinasPendientes,
    clasesLlenas,
    ocupacionPorDia
  }
}

const obtenerEstadisticasCliente = async (idUsuario) => {
    try {
        const usuario = await Usuario.findById(idUsuario)

        if (!usuario) {
            throw new UsuarioNoEncontradoError()
        }

        const clasesInscriptas = await Clase.find({
            inscriptos: idUsuario
        })
            .populate("actividad", "nombre descripcion")
            .populate("sala", "nombre")
            .sort({ dia: 1, hora: 1 })

        const rutinas = await Rutina.find({
            usuario: idUsuario
        }).populate("actividad", "nombre descripcion")

        const rutinasAsignadas = rutinas.filter(rutina =>
            rutina.ejercicios && rutina.ejercicios.length > 0
        ).length

        const rutinasPendientes = rutinas.filter(rutina =>
            !rutina.ejercicios || rutina.ejercicios.length === 0
        ).length

        const limitePlan = usuario.plan === "premium" ? null : 4
        const clasesUsadas = clasesInscriptas.length

        const cuposRestantes = limitePlan === null
            ? "Ilimitado"
            : Math.max(limitePlan - clasesUsadas, 0)

        const porcentajePlanUsado = limitePlan === null
            ? 100
            : Math.round((clasesUsadas / limitePlan) * 100)

        const proximaClase = obtenerProximaClase(clasesInscriptas)

        return {
            plan: usuario.plan,
            clasesInscriptas: clasesUsadas,
            cuposRestantes,
            porcentajePlanUsado,
            proximaClase,
            rutinasAsignadas,
            rutinasPendientes
        }
    } catch (e) {
        throw e
    }
}

const obtenerProximaClase = (clases) => {
    if (!clases || clases.length === 0) {
        return null
    }

    const ordenDias = {
        lunes: 1,
        martes: 2,
        miercoles: 3,
        jueves: 4,
        viernes: 5,
        sabado: 6
    }

    const clasesOrdenadas = [...clases].sort((a, b) => {
        const diaA = ordenDias[a.dia] || 99
        const diaB = ordenDias[b.dia] || 99

        if (diaA !== diaB) {
            return diaA - diaB
        }

        return a.hora.localeCompare(b.hora)
    })

    const clase = clasesOrdenadas[0]

    return {
        id: clase._id,
        dia: clase.dia,
        hora: clase.hora,
        actividad: clase.actividad?.nombre,
        sala: clase.sala?.nombre,
        cupos: `${clase.inscriptos.length} / ${clase.capacidadMax}`
    }
}

export  { obtenerEstadisticasAdmin, obtenerEstadisticasCliente }