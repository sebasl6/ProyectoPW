import RepositoryBase from "../repository/base.js";
import modelo from '../modelo/admin.js';

const adminRepository = new RepositoryBase(modelo);

const findAll = async (req,res) => {

    const admins = await adminRepository.findAll();

    return res.status(200).json(admins);

}

const create = async (req,res) => {
    const result = await adminRepository.create(req.body);

    return res.status(200).json(result);
}

const findOne = async (req,res) => {
    const id = req.params.id;
    const result = await adminRepository.findOne(id);

    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'No encontrado.'})

}

const update = async (req,res) => {
    const result = await adminRepository.update(req.body);

    if (result)
        return res.status(200).json(result);
    else    
        return res.status(500).json({ message: 'No encontrado.'})
}

const remove = async (req,res) => {
    const id = req.params.id;
    
    const result = await adminRepository.remove(id);

    if (result)
        return res.status(200).json(result);
    else    
        return res.status(500).json({ message: 'No encontrado.'})
}

const adminController = { findAll, create, findOne, update, remove };

export default adminController;
