import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import './App.css';
import backgroundImage from './assets/background.jpeg'
import api from './services/api';

function App(){

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject(){
        const response = await api.post('/projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Rocketseat"
        });

        const newProject = response.data;

        setProjects([ ... projects, newProject]);
    }

    return(
        <>
            <Header title="Projects" />

            <img 
                src={backgroundImage} 
                width="400"
                alt=""
            />

            <ul>
                {projects.map(project => <li key={project.id}>
                                            {project.title}
                                         </li> )}
            </ul>

            <button 
                type="button"
                onClick={handleAddProject}
            >
                Adicionar projeto
            </button>
        </>
    );
}

export default App;