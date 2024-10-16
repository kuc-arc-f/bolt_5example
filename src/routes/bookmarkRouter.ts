import express from 'express';
const router = express.Router();
import axios from 'axios';
import bookmarkData from './bookmarkData';

/**
* 
* @param
*
* @return
*/ 
router.post('/create', async function(req: any, res: any) {
  const retObj = {ret: 500 , message: "" }
  try {
    if(!req.body){
      throw new Error("nothing, body");
    }
    const body = req.body;
    body.bmCategoryId = 0;
console.log(body);
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/bookmark/create";	
console.log("path=", url + path);
    //body.title = body.text;
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
/**
* 
* @param
*
* @return
*/ 
router.post('/get_list', async function(req: any, res: any) {
  const retObj = {ret: 500 , message: "" }
  try {
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/bookmark/get_list";	
    console.log("path=", url + path);
    const response = await axios.post(url + path, req.body, 
      {headers: { 'Content-Type': 'application/json'}
    });
    retObj.ret = 200;
    retObj.data = response.data;
//console.log(response.data);
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
    const items = bookmarkData.getItem(req.body);
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
    const items = bookmarkData.delete(req.body);
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/bookmark/delete";	
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
    console.log(body);
    const url = process.env.EXTERNAL_API_URL; 
    const path = "/api/bookmark/update";	
    body.bmCategoryId = 0;
console.log("path=", url + path);
    const response = await axios.post(url + path, req.body, 
      {headers: { 'Content-Type': 'application/json'}
    });
    //console.log(response.data);
    retObj.ret = 200;
    retObj.data = response.data.data;
    console.log(retObj);
    return res.json(retObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
export default router;
