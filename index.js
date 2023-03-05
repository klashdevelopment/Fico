var el = require('express');
var fs = require('fs');
require('dotenv').config();
var app= el();
app.use(el.static(__dirname));
app.listen(process.env.PORT || 3000, ()=>{
  console.log('Online Fontawesome Library active now');
});