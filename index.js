// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const countersLoads = {
  "/": 0,
  "/about": 0,
};

function counterLoads(route) {
  countersLoads[route]++;
}

const http = require("http");

const handleRequest = function (req, res) {
  counterLoads(req.url);

  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end(`<h1>Root</h1>
      <h3>Views: ${countersLoads[req.url]}</h3>
      <a href="/about">About</a>`);
  } else if (req.url === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end(`<h1>About</h1>
      <h3>Views: ${countersLoads[req.url]}</h3>
      <a href="/">Root</a>`);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end("<h1>Not found</h1>");
  }
};

const server = http.createServer(handleRequest);

const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на порту http://localhost:${port}`);
});
