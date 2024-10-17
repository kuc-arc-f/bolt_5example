import express from 'express';
const router = express.Router();
//require('dotenv').config();
import axios from 'axios';
import chatData from './chatData';
import { z } from 'zod';

const FormData = z.object({
  title: z
    .string()
    .min(1, { message: '1文字以上入力してください。' }),
  content: z
    .string()
    .min(1, { message: '1文字以上入力してください。' }),
});

/**
* 
* @param
*
* @return
*/ 
router.post('/create', async function(req: any, res: any) {
  const retObj = {ret: 500, message: "", errors: {}}
  try {
    if(!req.body){
      throw new Error("nothing, body");
    }
console.log(req.body);
    const body = req.body;
//return res.json(retObj);
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/chat/create";	
console.log("path=", url + path);
    body.title = body.text;
    body.text_post = body.text;
    body.parentId = body.parentId;
    body.sender = body.sender;
    body.userId = 1;
    const response = await axios.post(url + path, body, 
    {headers: { 'Content-Type': 'application/json'}
    });
console.log(response.data);
    retObj.ret = 200;
    retObj.data = response.data.data;
    //console.log(items);
    return res.json(retObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/**
* 
* @param
*
* @return
*/ 
router.post('/get_list', async function(req: any, res: any) {
  const retObj = {ret: 500 , message: "" }
  try {
    const body = req.body;
    body.userId = 1;
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/chat/get_list";	
console.log("path=", url + path);
    const response = await axios.post(url + path, body, 
      {headers: { 'Content-Type': 'application/json'}
    });
    //console.log(response.data);
    retObj.ret = 200;
    retObj.data = response.data.data;
    const out  = chatData.convertTextArray(retObj.data);
    retObj.data = out;
    //console.log(out);
    return res.json(retObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/**
* 
* @param
*
* @return
*/ 
router.post('/get', async function(req: any, res: any) {
  //
  try {
    console.log(req.body);
    const items = chatData.getItem(req.body);
console.log(items);
    return res.json(items);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/**
* 
* @param
*
* @return
*/ 
router.post('/delete', async function(req: any, res: any) {
  const retObj = {ret: 500 , message: "" }
  try {
    if(!req.body){
      throw new Error("nothing, body");
    }
console.log(req.body);
    const body = req.body;
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/chat/delete";	
    console.log("path=", url + path);
    const response = await axios.post(url + path, body, 
      {headers: { 'Content-Type': 'application/json'}
    });
    //console.log(response.data);
    retObj.ret = 200;
    retObj.data = response.data.data;
    //console.log(items);
    return res.json(retObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/**
* 
* @param
*
* @return
*/ 
router.post('/update', async function(req: any, res: any) {
  try {
    if(!req.body){
      throw new Error("nothing, body");
    }
console.log(req.body);
    const items = chatData.update(req.body);
    //console.log(items);
    return res.json(items);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
export default router;
