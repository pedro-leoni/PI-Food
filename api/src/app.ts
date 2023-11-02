import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { publicRouter } from "./router";
import {database} from "./config/db";
import './models/Diet';
import './models/Recipe';
import './models/asociations';
import { setupSwagger } from './config/swagger';
import errorHandler from "./middleware/errorHandler";

const server = express();
setupSwagger(server)

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use(cors());
server.get("/", (req, res) => res.status(200).json("Food API by Pedro Leoni"));
server.use(publicRouter);
server.use(errorHandler);

const port = process.env.PORT || 3000;

const serverStart = ()  => {
  try{
    database.sync({ force: true }).then(() => {
      server.listen(port, () => {
        console.log('Server listening on port: ', port);
      });
    });
  }catch(err){
    console.error(err)
  }
}

serverStart();

//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~