import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";

export default function chat(req: NextApiRequest, res: NextApiResponseServerIO) {
    if(req.method === "POST") {
        const message = req.body;
        
        console.log(req.body)
        res?.socket?.server?.io?.emit("newMsg", message);

        res.status(201).json(message);
    }
}