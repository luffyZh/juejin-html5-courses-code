self.addEventListener('message', function(e) {
  const n = e.data;
  const result = fibonacci(n);
  self.postMessage(result);
}, false);

function fibonacci(n) {
  if (n <= 1) return n;
  console.log(n, 'fibonacci');
  return fibonacci(n - 1) + fibonacci(n - 2);
}