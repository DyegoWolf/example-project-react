import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, FlatList, Text, TouchableOpacity} from 'react-native';
import api from './services/api';

/*
    Elementos

    Div: representa uma view, section, footer, header, main, aside. Em tese,
    representa um conteiner
    Text: p, span, strong, h1, h2, h3...
*/

export default function App(){

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject(){
        const response = await api.post('/repositories', {
            title: `New Project nº ${Date.now()}`,
            owner: 'Rocketseat'
        });

        const newProject = response.data;
        setProjects([...projects, newProject]);
    }

    return(
        <>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="#FFF"
            />

            <SafeAreaView>
                <View styles={styles.container}>
                    <Text>
                        Projects list
                    </Text>
                </View>

                <FlatList
                    style={styles.container}
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({item: project}) =>  (
                        <Text style={styles.title}>
                            {project.title}
                        </Text>
                    )}
                />
            </SafeAreaView>

            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={handleAddProject}        
            >
                <Text styles={styles.buttonText}>
                    Add new project
                </Text>
            </TouchableOpacity>
        </>
    );
}

// A parte do CSS é feita dentro do Javascript como código Javascript mesmo
const styles = StyleSheet({
    container: {
        flex: 1,
        backgroundColor: '#7159c1'
    },
    title: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 30,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});