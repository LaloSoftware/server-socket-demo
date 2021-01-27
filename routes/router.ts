import { Router, Request, Response} from 'express'
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', (req: Request, res: Response)=>{
    res.json({
        ok: true,
        mensaje: "Todo está bien"
    })
});
router.post('/mensajes', (req: Request, res: Response)=>{
    console.table(req.body);
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        cuerpo, 
        de
    }
    const server = Server.instace;
    
    server.io.emit('mensaje-nuevo', payload);
    
    res.json({
        ok: true,
        cuerpo,
        de
    })
})
router.post('/mensajes/:id', (req: Request, res: Response)=>{
    console.table(req.body);
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id
    
    const server = Server.instace;

    const payload = {
        ok: true,
        cuerpo,
        de,
        id
    }
    
    server.io.in(id).emit('nuevo-mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
})

export default router;