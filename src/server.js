import http from "node:http";
import { randomUUID } from "node:crypto"
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

// UUID => Unique Universal ID

// - Criar usuários
// - Listagem usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso do back-end
// PUT => Atualizar um recurso do back-end
// PATCH => Atualizar uma informação específica de um recurso do back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuário no back-end

// Statefull => Guarda memória local
// Stateless => Sem guardar memória local

// Cabeçalhos/Headers (Requisição/resposta) => Metadados

// HTTP Status Code

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res.end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user)

    return res.writeHead(201).end('Criação de usuário');
  }

  return res.writeHead(404).end();
});

server.listen(3333);
