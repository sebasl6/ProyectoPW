import fsPromises from 'fs/promises'
export default async function otroEjemplito(req, res){
    if( req.method !== 'POST'){
        res.status(405).send({message: "Solo funciona con POST !!"})
    }else if(req.method === 'POST'){
        
        //Leer los valores recibidos
        console.log("BODY:" , req.body)
        const body = JSON.stringify(req.body).replace(" ' ", ' " ')
        const params = JSON.parse(body)

        //Escribir en el archivo
        await fsPromises.writeFile(
            'src/datos/usuario.json',
            JSON.stringify(params)
        )
        res.status(200).json(
            {
                rpta: "Datos grabados en archivo"         
            }
        )
    }
}
