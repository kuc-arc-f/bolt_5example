import express from 'express';
const router = express.Router();
//require('dotenv').config();
import axios from 'axios';
import planData from './planData';
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
    //const items = planData.create(req.body);
    const body = req.body;
    console.log(req.body);
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/plan/create";	
console.log("path=", url + path);
    body.p_date = body.date;
    body.userId = 0;
    const response = await axios.post(url + path, body, 
      {headers: { 'Content-Type': 'application/json'}
    });
console.log(response.data);
    retObj.ret = 200;
    retObj.data = response.data.data;
    return res.json(retObj);
    //console.log(items);
    //return res.json(items);
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
  //
  try {
    const body = req.body;
    body.userId = 0;
    body.start = "2000-01-01";
    body.end   = "3000-01-01";
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/plan/get_list";	
console.log("path=", url + path);
    const response = await axios.post(url + path, body, 
      {headers: { 'Content-Type': 'application/json'}
    });
    //console.log(response.data);
    const out  = planData.convertRowArray(response.data);
    retObj.ret = 200;
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
    const items = planData.getItem(req.body);
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
  const retObj = {ret: 500 , message: "" };
  try {
    if(!req.body){
      throw new Error("nothing, body");
    }
console.log(req.body);
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/plan/delete";	
console.log("path=", url + path);
    const response = await axios.post(url + path, req.body, 
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
  const retObj = {ret: 500 , message: "" };
  try {
    if(!req.body){
      throw new Error("nothing, body");
    }
console.log(req.body);
    const body = req.body;
    console.log(req.body);
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/plan/update";	
    console.log("path=", url + path);
    body.p_date = body.date;
    body.userId = 0;
    const response = await axios.post(url + path, body, 
      {headers: { 'Content-Type': 'application/json'}
    });
    console.log(response.data);
    retObj.ret = 200;
    retObj.data = response.data.data;
    return res.json(retObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
export default router;
