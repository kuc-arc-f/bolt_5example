import { v4 as uuidv4 } from 'uuid';
//
const tableData = {
  items: [],
  /**
  * 
  * @param
  *
  * @return
  */ 
  convertTextArray: function(items: any){
    try {
      let ret = [];
      items.forEach((item) => {
        console.log(item)
        item.text = item.text_post;
        ret.push(item);
      });
      return ret;
    } catch (error) {
      console.error(error);
      throw new Error("error, convertTextArray");
    }
  },
  /**
  * 
  * @param
  *
  * @return
  */ 
  create: function(body: any){
    try {
      if(!body){
        throw new Error("nothing, body");
      }
console.log(body);
      const now = new Date();
      const myUUID = uuidv4();
      //console.log(myUUID);
      let row = {
        id: myUUID,
        parentId: body.parentId,
        title: body.title,
        text: body.text,
        sender: body.sender,
        createdAt: now.toISOString(),
      }
      this.items.unshift(row);
      return this.items;
    } catch (error) {
      console.error(error);
      throw new Error("error, create");
    }
  },
  /**
  * 
  * @param
  *
  * @return
  */
  getList: function(){
    try {
      return this.items;
    } catch (error) {
      console.error(error);
      throw new Error("error, getList");
    }
  },

  /**
  * 
  * @param
  *
  * @return
  */ 
  delete: function(body: any){
    try {
      if(body) {
console.log("id=", body.id);
        const out: any[] = [];
        this.items.forEach((item) => {
          console.log(item)
          if(item.id !== body.id){
            out.push(item);
          }
        });
        this.items = out;
console.log(this.items);
        return this.items;
      }
      throw new Error("error, nothig body");
    } catch (error) {
      console.error(error);
      throw new Error("error, delete");
    }
  },
  /**
  * 
  * @param
  *
  * @return
  */ 
  getItem: function(body: any){
    try {
      let ret = {};
      if(body) {
console.log("id=", body.id);
        const result = this.items.filter((item) => item.id === body.id);
console.log(result);
        if(result.length > 0){
          ret = result[0];
        }
//console.log(this.items);
        return ret;
      }
      throw new Error("error, nothig body");
    } catch (error) {
      console.error(error);
      throw new Error("error, getItem");
    }
  },
  /**
  * 
  * @param
  *
  * @return
  */  
  update: function(body: any){
    console.log("#update");
    try {
    } catch (error) {
      console.error(error);
      throw new Error("error, update");
    }
  },
}

export default tableData;
