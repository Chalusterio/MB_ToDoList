import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react'; 
import { IconButton } from 'react-native-paper';
import Fallback from '../components/Fallback';

const TodoScreen = () => {
    // Initialize local state for todo and todo list
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([
        {
            id: "01",
            title: "Assignment",
        },
        {
            id: "02",
            title: "Wash Dishes",
        },
    ]);
    const [editedTodo, setEditedTodo] = useState(null);

    // Function to add a new task to the list
    const addTodo = () => {
        if (todo.trim()) {
            setTodoList([...todoList, { id: (todoList.length + 1).toString(), title: todo }]);
            setTodo(""); // Clear the input after adding
        }
    };

    // Handle delete
    const handleDeleteTodo = (id) => {
        const updatedToDoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedToDoList); // Update the state with the filtered list
    };

    // Handle edit todo
    const handleEditTodo = (todo) => {
        setEditedTodo(todo); // Set the todo to be edited
        setTodo(todo.title); // Set the input value to the current todo title
    };

    // Handle update todo
    const handleUpdateTodo = () => {
        const updatedTodos = todoList.map((item) => {
            if (item.id === editedTodo.id) {
                return { ...item, title: todo }; // Update the title of the edited task
            }
            return item; // Return the rest as is
        });
        setTodoList(updatedTodos); // Update the state with the updated list
        setEditedTodo(null); // Reset the editedTodo
        setTodo(""); // Clear the input field
    };

    // Render todo items
    const renderTodos = ({ item }) => {
        return (
            <View
                style={styles.todoItem}
            >
                <Text style={styles.todoText}>
                    {item.title}
                </Text>
                <IconButton 
                    icon="pencil" 
                    iconColor="#FF7F3E" 
                    onPress={() => handleEditTodo(item)} // Edit task on press
                />
                <IconButton 
                    icon="trash-can" 
                    iconColor="#FF7F3E" 
                    onPress={() => handleDeleteTodo(item.id)} // Delete task on press
                />
            </View>
        );
    };

    return (
        <View style={{ marginHorizontal: 16 }}>
            <TextInput 
                style={styles.input}
                placeholder="Add a Task"
                value={todo}
                onChangeText={(userText) => setTodo(userText)} // Update state
            />

            {/* Conditional rendering: Show 'Save' button when editing, 'Add' button otherwise */}
            {editedTodo ? (
                <TouchableOpacity  
                    style={styles.addButton}
                    onPress={handleUpdateTodo} // Update the task on press
                >
                    <Text style={styles.addButtonText}>
                        Save
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity  
                    style={styles.addButton}
                    onPress={addTodo} // Add the new task on press
                >
                    <Text style={styles.addButtonText}>
                        Add
                    </Text>
                </TouchableOpacity>
            )}

            {/* Render todo List */}
            {todoList.length > 0 ? (
                <FlatList 
                    data={todoList} 
                    renderItem={renderTodos} 
                    keyExtractor={(item) => item.id} 
                />
            ) : (
                <Fallback />
            )}
        </View>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: "#FADFA1",            
        borderRadius: 15,                   
        paddingVertical: 12,                
        paddingHorizontal: 18,
        fontSize: 16,                       
        marginVertical: 12,                 
        backgroundColor: "#FFF",            
        shadowColor: "#000",                
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,                 
        shadowRadius: 4,

    },
    addButton: {
        backgroundColor: "#FADFA1",         
        borderRadius: 20,                   
        paddingVertical: 14,                
        marginVertical: 20,
        alignItems: "center",
        justifyContent: "center",           
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.3,                 
        shadowRadius: 6,

    },
    addButtonText: {
        color: "#536493",                   
        fontWeight: "600",                
        fontSize: 20,                      
        letterSpacing: 1,                   
        textTransform: "uppercase",         
    },
    todoItem: {
        backgroundColor: "#FADFA1",         
        borderRadius: 12,                   
        paddingHorizontal: 20,              
        paddingVertical: 16,                
        marginBottom: 18,                   
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,                 
        shadowRadius: 5,
    },
    todoText: {
        color: "#536493",                   
        fontSize: 18,                       
        fontWeight: "600",                  
        flex: 1,                            
        marginRight: 10,                    
    },
});


