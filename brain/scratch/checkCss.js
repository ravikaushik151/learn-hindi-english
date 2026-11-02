async function checkCss() {
  const html = await (await fetch('http://localhost:3000/admin')).text();
  const cssMatch = html.match(/href="(\/_next\/static\/css\/[^"]+)"/);
  if (cssMatch) {
    const cssUrl = 'http://localhost:3000' + cssMatch[1];
    console.log('Fetching CSS:', cssUrl);
    const res = await fetch(cssUrl);
    console.log('CSS HTTP status:', res.status);
    const css = await res.text();
    console.log('CSS length:', css.length);
    console.log('Contains bg-slate-900:', css.includes('bg-slate-900'));
    console.log('Contains text-white:', css.includes('text-white'));
    console.log('Contains max-w-md:', css.includes('max-w-md'));
  } else {
    console.log('No CSS match found in HTML');
  }
}
checkCss();

