import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { score_2 } from './visualization_quiz';
import { record_ques } from './visualization_quiz';

class ThankYou extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.location.state != null) {
            this.setState({
                value: this.props.location.state !== undefined ? this.props.location.state.data.session_id : "Invalid value",
                copied: false,
            })
        }
    }
    renderTable() {
        return (
            <table style={{ borderCollapse: 'collapse', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Запитання</th>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Результат</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(record_ques).map(([question, answer]) => (
                        <tr key={question}>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{question}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                                {answer === 'Вірно' ? <span>&#10004;</span> : answer === 'Невірно' ? <span>&#10060;</span> : answer}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        console.log('attempting to render')
        console.log("The keys of the dictionary is: " + Object.keys(record_ques))
        console.log("The values of the dictionary is: " + Object.values(record_ques))

        if (this.props.location.state == null) {
            return (<p>Невизначена сесія. Будь ласка поверніться на <a href={'/'}> сторінку згоди</a></p>)
        }

        if (this.state == null) {
            return (<p>Завантаження...</p>)
        }

        return (
            <Row className={'justify-content-center no-margin-row'}>
                <Col lg={6} className={'text-box text-justify'}>
                    <h3 style={{ marginBottom: '20px' }}>Ваш результат: {score_2} із 12. Дякую за те що взяли участь в дослідженні. Ваші відповіді були збережені.</h3>
                    {this.renderTable()}
                </Col>
            </Row>

        );
    }
}

export default ThankYou;
