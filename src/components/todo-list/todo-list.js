import React from "react";

import './todo-list.css';

import TodoListItem from "../todo-list-item/todo-list-item";

const TodoList = ({ tododata, onDeleted, 
    onToggleImportant, onToggleDone }) => {

    // щоб не писати кожен елемент списку, за допомогою
    // функції map витягуємо елеенти зі списку
    const elements = tododata.map((item) => {

        // оскільки для TodoList ми не використовуємо параметр id 
        // ми можемо використати деструктиризацію об'єкта, щоб з
        // масива витянути id і в key передавати id, а в TodoListItem
        // всі інші властивості крім id, що покращує оптимізацію
        // через Rest параметр
        const { id, ... itemProps } = item;

        return (
            // <li><TodoListItem 
            //     label={ item.label }
            //     important={ item.important } />
            // </li>

            // оскільки у нас співпадає назва властивості з назвою змінної
            // наприклад label: item.label, important = item.imortant 
            // ми можемо зробити скороченіший запис через Spread оператор
            <li key={ id } 
                className="list-group-item">
                    <TodoListItem {... itemProps} 
                    onDeleted={() => onDeleted(id) }
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}/>
            </li>
            // ключі необіхідні для того, щоб оптимізувати сайт, адже тепер
            // він буде відновлювати на сайті тільки ті ключі які ще не були
            // імпортовані, а не перевіряти всі елементи в списку
        );
    });

    return (
        <ul className="list-group todo-list">
            {/* якщо ми пишемо лише назву властивості то за замовчуванням 
            вона буде типу булеан
            приклад властивість імпортант 
            <li> <TodoListItem label="Make a project" important /> </li>
            */}
            { elements }
        </ul>
    );
}

export default TodoList;