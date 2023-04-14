//eg : http://localhost:3000/api/products?page=2
//Here page is query string and 2 is its value
// query will be sent. eg : Product.find()
class Features {
  constructor(query, queryString)  
  
  {
    this.query = query;
    this.queryString = queryString;
  }

  search()
  {
    const keyword = this.queryString.keyword ? 
    {
      name :
      {
        $regex : this.queryString.keyword,  // pattern matching strings in queries // regex is mongodb operator   
        $options : "i"  // i => case insenitive 
      }
    } : {/*if keyword is not sent then do nothing*/};

    this.query = this.query.find({...keyword});
    return this;  // returning this class

  }

  // filter for price
  filter()
  {
    const queryCopy = {...this.queryString};
    //console.log(queryCopy);
    const removeFields = ["keyword","limit","page"];
    removeFields.forEach(key=>delete queryCopy[key]);
    //console.log(queryCopy);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`); // regular express
    this.query = this.query.find(JSON.parse(queryStr)); // first converting string to object
    //console.log(queryStr);
    return this;
  }
  // how many products to show on the web page.
  pagination(productPerPage)
  {
      const currentpage = Number(this.queryString.page)|| 1; // default currentpage = 1
      const skip = productPerPage*(currentpage-1);
      this.query = this.query.limit(productPerPage).skip(skip);
      return this;
  }
};

module.exports = Features;