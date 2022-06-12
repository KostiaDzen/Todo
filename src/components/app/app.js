import React from "react";

import AppHeader from '../app-header/app-header';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import SearchPannel from '../search-pannel/search-pannel';
import TodoList from '../todo-list/todo-list';
import AddItemForm from "../add-item-form/add-item-form";

import './app.css';

export default class App extends React.Component {

    // просто вирішили, що ті елементи
    // які ми будемо додавати будуть
    // мати id які починаються із 100

    //на практиці вони будуть генеруватися сервером
    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all' //active, all, done
    };

    createTodoItem(label) {
        return {
            label, //  те саме що label: label
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        
        this.setState( ({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id);

            // такий алгоритм створення нового масиву
            // зробений по тій причині що нам не можна
            // міняти state 

            const newArray = [ 
                ... todoData.slice(0, index),
                ... todoData.slice(index + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {

            const newArray = [
                ... todoData,
                newItem
            ];

            return {
                todoData: newArray
            }
        });
    };

    toggleProperty = (arr, id, propName) => {
        
        const index = arr.findIndex((el) => el.id === id);

        const oldItem = arr[index];

        // оскільки ми не можемо міняти state 
        // ми створюємо новий об'єкт з обновленим done
        // який ми будемо виводити, все що після першого об'єкта
        // перезапише перший об'єкт буде накладання на oidItem 
        // властивість done
        const newItem = { ... oldItem,
            [propName]: !oldItem[propName]};

        return [ 
            ... arr.slice(0,index),
            newItem,
            ... arr.slice(index+1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => { 
            // якщо співпадінь немає то ця функція виводить -1
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    };

    onSearchChange = (term) => {
        this.setState({term});
    };

    filter(items, filter) {

        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            // для стрвховки
            default:
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    render() {

        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;

        const todoCount = this.state.todoData.length - doneCount;

        return (
            <div className='todo-app'>
                <AppHeader toDo={ todoCount } done={ doneCount }/>
                <div className='top-panel d-flex'>
                    <SearchPannel 
                    onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter 
                    filter={ filter }
                    onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList 
                    tododata={ visibleItems }
                    onDeleted={ this.deleteItem } 
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }/>
                <AddItemForm 
                    onAddItem={ this.addItem }/>
            </div>
        );
    };
}