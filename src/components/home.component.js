import React, {Component } from "react";
import QuizService from "../services/quiz.service";
import Quiz from "./quiz.component";
import AuthService from "../services/auth.service";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            quizes: null,
            passed: null,
            passedMap: new Map(),
            isLoading: true,
            isAdmin: AuthService.isAdmin()
        };
    }

    getQuizes = async () => {
        return await QuizService.getQuiz();
    }

    getPassedQuizes = async () => {
        return await QuizService.getPassed();
    }

    componentDidMount() {
        this.getQuizes().then(r => this.setState({ quizes: r.data.result}))
        this.getPassedQuizes().then(res => this.setState({passed: res.data.result}))
    }

    render() {
        if (this.state.passed !== null && this.state.quizes != null) {
            this.state.quizes.forEach(item => {
                this.state.passedMap.set(item.id, 0);
            })

            this.state.passed.forEach(item => {
                if (this.state.passedMap.has(item.id)) {
                    this.state.passedMap.set(item.id, this.state.passedMap.get(item.id)+1)
                }
            })
        }

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                    {
                        this.state.quizes && this.state.passed && this.state.passedMap.size !== 0 ?
                            this.state.quizes.map(item => {
                                    return <Quiz key={item.id} id={item.id} maxPassCount={item.maxPassCount} name={item.name} adminButtonsVisible={this.state.isAdmin} canPass={item.maxPassCount > this.state.passedMap.get(item.id)}/>
                                })
                            : null
                    }
                </header>
            </div>
        );

    }
}
