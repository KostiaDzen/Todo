import React from "react";

import './todo-list-item.css';

// якщо нам потрібно взаємодіяти з кнопками рахувати каунти 
// тобто внутрішня взаємодія то необхідні класи
const TodoListItem = ( { label, onDeleted,
    onToggleImportant, onToggleDone,
    done, important }) => {

    let classNames = 'todo-list-item';
    if (done) {
        classNames += ' done';
    }

    if (important) {
        classNames += ' important';
    }

    // передає у функцію лейбл той що описан в елементах лі в тудуліст
    return (
        <span className={ classNames }>
            <span 
                className="todo-list-item-label"
                onClick={ onToggleDone }>
                    { label }
            </span>

            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={ onDeleted }>
                <i className="fas fa-trash-alt" ></i>
            </button>

            <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={ onToggleImportant }>
                <i className="fa fa-exclamation" />
            </button>
        </span>
    );
};

export default TodoListItem;