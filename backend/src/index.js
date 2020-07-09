const express = require('express');
const {uuid, isUuid} = require('uuidv4');
const app = express();
const cors = require('cors');

// Especifica que as informações a serem utilizadas estarão no formato JSON
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080'
}));

/*
*   Tipos de Parâmetro
*   
*   Query params: filtros e paginação
*   Route params: identificar recursos nos métodos put e delete
*   Request body: conteúdo na hora de criar ou editar um recurso (JSON)
*/

const projects = [];

// Middleware que lista método HTTP e rota utilizada
function logRequests(request, response, next) {
    const {method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    next(); // Executa próximo middleware. Se não informado, interrompe requisição
} 

// Middleware que valida um id recebido
function validateProjectId(request, response, next) {
    const {id} = request.params;

    if(!isUuid(id)){
        return response.status(400).json({error: 'Its not a valid project id!'});
    }

    return next();
}

// Middleware utilizado em todas as rotas
app.use(logRequests);

app.get('/projects', (request, response) => {
    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const {title, owner} = request.body;

    // A função uuid() cria um id único para o objeto
    const project = {
        id: uuid(),
        title,
        owner
    }

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', validateProjectId, (request, response) => {
    const {id} = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0){
        return response.status(404).json({error: 'Not found'});
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', validateProjectId, (request, response) => {
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0){
        return response.status(404).json({error: 'Not found'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('🚀️ Back-end started!');
});