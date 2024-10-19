import fs from 'node:fs/promises'
import express from "express";
import { renderToString } from 'react-dom/server';
import cookieParser from "cookie-parser";
import session from "express-session";

import Top from './pages/App';
import About from './pages/about';
import Common from './lib/Common';
import bookmarkRouter from './routes/bookmarkRouter';
import chatRouter from './routes/chatRouter';
import planRouter from './routes/planRouter';
import todoRouter from './routes/todoRouter';
import cmsRouter from './routes/cmsRouter';
import userRouter from './routes/userRouter';
//
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
console.log("env= ", process.env.NODE_ENV);
//
app.use('/api/bookmark', bookmarkRouter);
app.use('/api/chat', chatRouter);
app.use('/api/cms', cmsRouter);
app.use('/api/plan', planRouter);
app.use('/api/todo', todoRouter);
app.use('/api/user', userRouter);
// Session
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * Number(process.env.AUTH_EXPIRED_TIME),  // クッキーの有効期限をn-minに設定(msec * sec * min)
    //httpsを使用しない
    secure: false
  }
}));
//
const errorObj = {ret: "NG", messase: "Error"};
//middleware
app.use(async function(req: any, res: any, next: any){
  const valid = await Common.validUser(req, res);
  if(!valid) {
    console.log("nothing, user-session");
    res.redirect('/login');
    //next();
  } else {
    next();
  }
});
//MPA 
app.get("/*", (req, res) => {
  res.send(renderToString(Top()));
});
//start
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
  