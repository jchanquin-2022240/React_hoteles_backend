import { validationResult } from "express-validator";
import User from '../user/user.model.js';
import Hotel from '../hoteles/hotel.model.js';
import Habitacion from '../bedrooms/bedrooms.model.js';

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol){
        throw new Error(`El role ${role} no existe en la base datos`);
    }
} 

export const existenteEmail = async (email = '') => {
    const existeEmail = await User.findOne({email});
    if (existeEmail){
        throw new Error(`El email ${email} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`El ID: ${email} No existe`);
    }
}

export const validateFields = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }
    next();
};

//Hoteles

export const existsHotel = async (id = '') => {

    const hotelExists = await Hotel.findOne({ id });
    if (hotelExists) {
        throw new Error(`Hotel with ${id} does not exists.`);
    }
}

export const existsNameHotel = async (nameHotel = '') => {

    const nameHotelExists = await Hotel.findOne({ nameHotel });
    if (nameHotelExists) {
        throw new Error(`The hotel called ${nameHotel} is already registered.`);
    }
}

export const existsLocation = async (location = '') => {

    const locationExists = await Hotel.findOne({ location });
    if (locationExists) {
        throw new Error(`The location ${location} is already in use, by another hotel.`)
    }
}

export const hotelStatus = async (id = '') => {

    const hotel = await Hotel.findById(id);
    if (!hotel.status) {
        throw new Error(`Hotel ${hotel.nameHotel} is alredy disable`);
    }
}

//habitaciones

export const validarNumeroHabitacionUnico = async (numero) => {
    const habitacionExistente = await Habitacion.findOne({ numero });
    if (habitacionExistente) {
        throw new Error('El número de habitación ya está en uso');
    }
};

export const validarExistenciaHabitacion = async (habitacionId) => {
    const habitacion = await Habitacion.findById(habitacionId);
    if (!habitacion) {
        throw new Error('La habitación no existe');
    }
};

export const validarReservacionesAsociadas = async (habitacionId) => {
    const reservaciones = await Reservacion.find({ habitacion: habitacionId });
    if (reservaciones.length > 0) {
        throw new Error('No se puede eliminar la habitación, tiene reservaciones asociadas');
    }
};

export const validarUsuario = async (usuarioId) => {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
        throw new Error('El usuario no existe');
    }
};
