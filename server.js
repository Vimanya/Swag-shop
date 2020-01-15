var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');
var cors = require('cors');

var Product = require('./model/product');
var Wishlist = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/product',function(request,response){
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
    product.imgUrl=request.body.imgUrl;
    product.save(function(err,savedProduct){
        if (err){
            response.status(500).send({error:"couldnt save"});
        }
        else{
            response.status(200).send(savedProduct);
        }
    });
  
});


app.post('/wishlist',function(request,response){
   var wishlist = new Wishlist();
    wishlist.title = request.body.title;
    
     wishlist.save(function(err,newWishList){
        if (err){
            response.status(500).send({error:"couldnt save"});
        }
        else{
            response.status(200).send(newWishList);
        }
    });
    
});
    
app.get('/wishlist',function(request,response){
   Wishlist.find({}).populate({path : 'products', model :'Product'}).exec(function(err,wishlist){
       if(err){
           response.send({error:"couldnt fetch wishlist"});
       } else {
           response.status(200).send(wishlist);
       }
       
   });
  
});
    
    
app.put('/wishlist/product/add', function(request,response){
   Product.findOne({_id:request.body.productId}, function(err,product){
      if(err){
          response.status(500).send({err:"couldnt add item to wishlist"});
      } else{
          Wishlist.update({_id:request.body.wishlistId},{$addToSet:{products: product._id}},
            function(err,wishlist){
                    if (err){
                        response.status(500).send({error:"couldnt save"});
                    }else{
                        response.send(wishlist);
        }
              
          });
      }
   })
});
    

app.use(cors());

app.listen(3004,function(){
    console.log("swag-shop API running at port 3000");
});

app.get('/product',function(request,response){
   Product.find({},function(err,products){
        if(err){
            response.status(500).send({error:"couldnt fetch"});
   } else{
       response.send(products);
   }
   });
});

