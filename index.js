require('dotenv').config();

var el = require('express');
var app= el();

app.use(el.static(__dirname));
app.get('/embeds/:style', (req, res) => {
  res.type('html');
  res.end(require('./cfldr')(req.params.style));
});

app.listen(process.env.PORT || 3000, ()=>{
  console.log('Online Fontawesome Library active now');
});