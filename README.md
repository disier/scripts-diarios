# Useful scripts

Execute this code to load script:

````
let meta = $('<meta></meta');
meta.attr('http-equiv', 'Content-Security-Policy');
meta.attr('content', "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;");
$('head').append(meta);


async function loadScript(url) {
  let response = await fetch(url);
  let script = await response.text();
  eval(script);
}

//let scriptUrl =
 'https://raw.githubusercontent.com/disier/scripts-diarios/master/include.js';

let scriptUrl =
 'https://raw.githubusercontent.com/disier/scripts-diarios/master/at-extract.js';

loadScript(scriptUrl);

