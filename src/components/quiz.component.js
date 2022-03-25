import React, {Component} from "react";
import QuizService from "../services/quiz.service";
import ReactModal from "react-modal"

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleEditModalOpen = this.handleEditModalOpen.bind(this);
        this.handleEditModalClose = this.handleEditModalClose.bind(this);
        this.handleEditChangeName = this.handleEditChangeName.bind(this);
        this.handleEditChangeMaxPassCount = this.handleEditChangeMaxPassCount.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)

        this.state = {
            id: props.id,
            maxPassCount: props.maxPassCount,
            name: props.name,
            isDeleted: false,
            adminButtonsVisible: props.adminButtonsVisible,
            canPass: props.canPass,
            updatedName: props.name,
            updatedMaxPassCount: props.maxPassCount
        };
    }

    deleteQuiz = async () => {
        return await QuizService.deleteQuiz(this.state.id);
    }

    handleEdit = async () => {
        return await QuizService.updateQuiz(this.state.id, this.state.updatedMaxPassCount, this.state.updatedName)
    }

    handleDelete() {
        this.deleteQuiz()
            .then(response => {
                this.setState({
                    isDeleted: true
                })
                console.log("Deleted: " + this.state.id)
            })
            .catch(reason => {
                this.setState({
                    isDeleted: false
                })
            })
    }

    handlePass() {
        console.log("Handle pass Quiz: " + this.state.id)
    }

    handleEditChangeName(event) {
        this.setState({updatedName: event.target.value})
    }

    handleEditChangeMaxPassCount(event) {
        this.setState({updatedMaxPassCount: event.target.value})
    }

    handleEditSubmit(event) {
        event.preventDefault();
        this.handleEdit()
            .then(response => {
                this.setState({ name: this.state.updatedName, maxPassCount: this.state.updatedMaxPassCount})
                this.handleEditModalClose()
            })
    }

    handleEditModalOpen () {
        this.setState({ showModal: true });
    }

    handleEditModalClose () {
        this.setState({ showModal: false });
    }

    render() {
        return (
            (this.state.isDeleted) ? "" :
            <div className="card card-quiz">
                <div className="card-body">
                    <h5 className="card-title">{this.state.name}</h5>
                    <p className="card-text">Максимальное количество прохождений: {this.state.maxPassCount} раз</p>
                    {this.state.adminButtonsVisible && (
                        <>

                            <button onClick={this.handleEditModalOpen} className="btn btn-warning">Редактировать</button>
                            <ReactModal
                                isOpen={this.state.showModal}
                                contentLabel="Minimal Modal Example"
                            >
                                <form onSubmit={this.handleEditSubmit}>
                                    <label>
                                        <input type="text" name={"name"} placeholder={"Название"} defaultValue={this.state.name} onChange={this.handleEditChangeName}/>
                                    </label>

                                    <label>
                                        <input type="number" name={"maxPassCount"} placeholder={"Максимальное количество прохождений"} defaultValue={this.state.maxPassCount} onChange={this.handleEditChangeMaxPassCount}/>
                                    </label>

                                    <input className={"btn btn-primary"} type="submit" value={"Сохранить"}/>
                                </form>
                                <button className={"btn btn-primary"} onClick={this.handleEditModalClose}>Отменить сохранение</button>
                            </ReactModal>

                            <button onClick={this.handleDelete} className="btn btn-danger">Удалить</button>
                        </>
                        )}

                    {this.state.canPass && (
                        <>
                            <button onClick={this.handlePass} className="btn btn-primary">Пройти</button>
                        </>
                    )}

                </div>
            </div>
        );
    }
}
