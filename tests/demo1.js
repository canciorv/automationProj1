const fs = require('fs');
fs.readFile('../utils/productList.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const data = JSON.parse(jsonString);
    for(x of data){
        console.log(x.product);
    }

  });