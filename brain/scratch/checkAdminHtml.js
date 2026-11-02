async function test() {
  const res = await fetch('http://localhost:3000/admin');
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('HTML length:', text.length);
  const links = text.match(/<link[^>]*>/g);
  console.log('Links:', links);
}
test();

