async function checkCssError() {
  const html = await (await fetch('http://localhost:3000/admin')).text();
  const cssMatch = html.match(/href="(\/_next\/static\/css\/[^"]+)"/);
  if (cssMatch) {
    const cssUrl = 'http://localhost:3000' + cssMatch[1];
    const res = await fetch(cssUrl);
    const css = await res.text();
    console.log(css.slice(0, 1000));
  }
}
checkCssError();

