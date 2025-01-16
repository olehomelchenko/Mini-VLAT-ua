import React, { Component, useState, useEffect } from 'react';
import { Col, Row, Navbar, Button, Image, ButtonGroup } from 'react-bootstrap';
import '../App.css';

// uncomment if running on local backend
const backend_path_prefix = '.'

class Tutorial extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    onUnload(e) {

    }

    on_experiment_click(e) {
        var pageType = {
            pathname: '/experiment',
            state: {
                data: {
                    'session_id': this.state.session_id,
                }
            }
        }
        console.log(pageType)
        this.props.history.push(pageType)
    }

    componentDidMount() {

        fetch(`${process.env.REACT_APP_API_URL}/new_session_id`, {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                start_time: 'TODO'
            })
        })
            .then(res => res.json()).then(data => {
                console.log(data.new_id)
                this.setState({
                    session_id: data.new_id
                })
            })

    }

    componentWillUnmount() {
        //window.removeEventListener("beforeunload", this.onUnload);
    }

    render() {

        if (this.props.location.state == null) {
            return (<p>Невизначена сесія. Будь ласка поверніться на <a href={'/'}> сторінку згоди</a></p>)
        }

        return (
            <>
                <Row className={'justify-content-center tutorial-body'}>
                    <Col lg={6} className={'text-box text-justify'}>

                        <p className='head_1'>Інструкції</p>
                        <ul>
                            <li className='int_1'>
                                Вам буде запропоновано 12 питань з вибором однієї правильної відповіді.</li>
                            <li className='int_1'>
                                Дайте на них відповідь, якщо ви впевнені в своїй відповіді. Якщо ви не впевнені, ви можете пропустити питання, а не вгадувати.
                                </li>

                        </ul>
                        <p className='head_2'>
                            <b>Важливо: на відповідь до кожного питання ви маєте 25 секунд.</b>
                            Відповідайте на кожне питання якнайкраще. Якщо ви не впевнені, ви можете <b>пропустити питання, а не вгадувати</b>.
                            </p>

                        <div className={'text-center'}>
                            <Button onClick={this.on_experiment_click.bind(this)}
                                className={'btn-sm'} variant={"success"}>
                                Розпочати
                            </Button>
                        </div>


                        <p className={'text-box'}></p>

                    </Col>

                </Row>
            </>
        );
    }
}

export default Tutorial;
