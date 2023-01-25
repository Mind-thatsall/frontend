import { NextApiRequest, NextApiResponse} from "next";
import { Server } from "socket.io";
import { NextApiResponseServerIO } from "@/types/next";

let chats: any[] = [];
export default function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  // It means that socket server was already initialised
  if (res.socket?.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  // Define actions inside
  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.emit('allMessages', (chats))

    socket.on('newMessages', (chat) => {
      if(chats.find(chatt => chatt.id === chat.id) === undefined) {
        chats.push(chat);
      }
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    })
  });



  console.log("Setting up socket");
  res.end();
}