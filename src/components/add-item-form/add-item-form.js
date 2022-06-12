import React from "react";

import './add-item-form.css';

export default class AddItemForm extends React.Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState( {
            // отримати дані які надрукував користувач з форми 
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        // щоб при отриманні елеиента браузер не обновлявся
        e.preventDefault(); 
        this.props.onAddItem(this.state.label);
        // щоб при натисканні ентер, 
        // або на кнопку сторока стиралась
        this.setState({
            label: ''
        })
    };

    render () {
        return (
            <form className="add-item-forms d-flex"
                    onSubmit={this.onSubmit}>
                <input  type="text"
                        className="form-control"
                        onChange={this.onLabelChange}
                        placeholder="What needs to be done" 
                        value={this.state.label}/>

                <button className="btn btn-outline-secondary left">
                    Add
                </button>
            </form>
        );
    };
};
