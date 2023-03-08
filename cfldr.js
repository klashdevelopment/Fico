module.exports = (Value)=>{
    var res = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OFALib</title>
            <link rel="stylesheet"
          href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/atom-one-dark.min.css">
    <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
        @import url('https://site-assets.fontawesome.com/releases/v6.3.0/css/all.css');
        @import url('/modal.css');
        .grid-container {
          padding: 5px;
          display: grid;
          width: calc(100vw-15px);
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          grid-gap: 10px;
          align-items: start; /* add this line to stretch boxes vertically */
        }
        body {
          margin: 0;
          padding: 0;
          background-color: #333;
          color: white;
          font-family: 'Roboto';
        }
        .grid-item {
          width: auto;
          height: auto;
          background-color: #444;
          padding: 5px;
          border: 5px solid black;
          box-sizing: border-box;
          cursor: pointer;
        }
        .grid-item i {
          margin-top: 10px;
        }
        nav {
          margin: 0px;
          padding-top: 30px;
          padding-left: 30px;
          height: 100px;
          width: calc(100vw-30px);
          background-color: #1a1a1a;
        }
        nav b {
          font-size: 25px;
        }
        select {
          border-radius: 10px; /* round the edges */
          padding: 8px; /* add padding per element */
          background-color: #333;
          color: white;
        }
        input {
          border-radius: 10px; /* round the edges */
          padding: 8px; /* add padding per element */
          background-color: #333;
          color: white;
          border: 1px solid #767676;
          margin-left: 4px;
        }
        button {
          cursor: pointer;
          border-radius: 10px; /* round the edges */
          padding: 8px; /* add padding per element */
          background-color: #333;
          color: white;
          border: 1px solid #767676;
          transition: font-size 0.25s ease;
        }
        button:hover {
          font-size: 14px;
        }
        .popup {
          position: absolute;
          z-index: 9999;
        }
        footer {
          position: fixed;
          bottom: 0;
          width: 100vw;
          height: 5vh;
          background-color: #555;
          text-align: center;
        }
        a:visited {
          color: lightcoral;
        }
        a:link {
          color: coral;
        }
      </style>
    </head>
    <body>
      <span class='content'>
        <div class='grid-container'>
        <center class='none'>
          <h2>No style selected</h2>
        </center>
      </div>
      <div class="modal m2">
        <div class="modal-content">
          <span class="close"><i class='fa-solid fa-circle-x'></i></span>
          <h2 id='mname'>Empty</h2>
          ID: <kbd id='mid'>empty</kbd><br>
          Categories: <b id='mct'>a, b, c</b><br>
          <h3>Use in code</h3>
          HTML:
          <pre><code id='mhtml'>&lt;i class="fa-empty fa-empty"&gt;&lt;/i&gt;</code></pre>
          React:
          <pre><code id='mreact'>&lt;i class="fa-empty fa-empty"&gt;&lt;/i&gt;</code></pre>
          Vue:
          <pre><code id='mvue'>&lt;i class="fa-empty fa-empty"&gt;&lt;/i&gt;</code></pre>
        </div>
      </div>
      </span>
      <footer>
        <input class='search' id='search' placeholder='Search...'>
      </footer>
      <script async>
        var arry;
        async function initArry() {
            await fetch('https://keho.nl/mb/codepenfiles/fontawesome/v6/v6_icons.json')
                .then(res => res.json())
                .then(array => arry = array)
                .then(unused => {
                    update();
                });
        }
        initArry();
        function folder() {
            return "${Value}";
        }
        var modals = document.querySelectorAll(".modal");
        var modal = document.querySelector('.m2');
        var span = document.querySelectorAll(".close");
        span.forEach(elem => {
            elem.onclick = function() {
                for (var mdl of modals) {
                    mdl.style.display = "none";
                }
            }
        });
        var mname = document.querySelector('#mname');
        var mid = document.querySelector('#mid');
        var mreact = document.querySelector('#mreact');
        var mvue = document.querySelector('#mvue');
        var mhtml = document.querySelector('#mhtml');
        var mct = document.querySelector('#mct');
    
        window.onclick = function(event) {
            if (modals.forEach(e => event.target == e)) {
                for (var mdl of modals) {
                    mdl.style.display = "none";
                }
            }
        }
    
        function update() {
            document.querySelector('.grid-container').innerHTML = '';
            for (var itm of arry.data.allIcons.icons) {
                console.log(itm);
                if (itm.styles.includes(folder())) {
                    if (document.getElementById('search').value === '' ||
                        itm.label.toLowerCase().includes(document.getElementById('search').value.toLowerCase())) {
                        var elem = document.createElement('div');
                        elem.classList.add('grid-item');
                        elem.innerHTML = \`<center><b>\${itm.label}</b><br><i class='fa-\${folder()} fa-\${itm.id} fa-4x'></i></center>\`;
                        var il = "" + itm.label + "";
                        elem.onclick = function(item) {
                            return function() {
                                setIconDetails(item);
                                modal.style.display = 'block';
                            };
                        }(itm);
                        document.querySelector('.grid-container').appendChild(elem);
                    }
                }
            }
        }
    
    
        function setIconDetails(item) {
            mname.innerHTML = 'Icon: ' + item.label + \`<i style='margin-left: 10px;' class="fa-\${folder()} fa-\${item.id} fa-2x"></i>\`;
            mid.textContent = item.id;
            mhtml.textContent = \`<i class="fa-\${folder()} fa-\${item.id}"></i>\`;
            mreact.textContent = \`<FontAwesomeIcon icon="fa-\${folder()} fa-\${item.id}" />\`;
            mvue.textContent = \`<font-awesome-icon icon="fa-\${folder()} fa-\${item.id}" />\`;
            var cts = folder();
            for(var ctgry of item.categories) {
              cts += ', ';
              cts += ctgry;
            }
            mct.textContent = \`\${cts}\`;
            hljs.highlightAll();
        }

        document.querySelector('#search').addEventListener('input', (e) => {
            update();
        });
      </script>
    </body>
    </html>`;
    return res;
}