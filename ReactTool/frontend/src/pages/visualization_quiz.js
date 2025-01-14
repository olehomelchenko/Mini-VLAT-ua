import React, { Component, useLayoutEffect, useState, useEffect, FunctionComponent } from 'react';
import { Container, Col, Row, Navbar, Button, ButtonGroup, ToggleButton, Form, InputGroup } from 'react-bootstrap';
import '../App.css';
import ProgressBar from "@ramonak/react-progress-bar";
import Countdown from 'react-countdown';

import AreaChartMini from "../components/areaChart-mini";
import BarChartMini from "../components/barChart-mini";
import BubbleChartMini from "../components/bubbleChart-mini";
import ChoroplethMini from "../components/choropleth-mini";
import HistogramMini from "../components/histogram-mini";
import LineChartMini from "../components/linechart-mini";
import PieChartMini from "../components/pieChart-mini";
import ScatterPlotMini from "../components/scatterplot-mini";
import StackedBarChartMini from "../components/stacked100bar-mini";
import StackedAreaPlotMini from "../components/stackedArea-mini";
import StackedBarChart2Mini from "../components/stackedbar-mini";
import TreeMapMini from "../components/treeMap-mini";
import axios from 'axios';

import img1 from '../components/data/VLAT-Pics/Scatterplot.png'
import img2 from '../components/data/VLAT-Pics/StackedBar.png'
import img3 from '../components/data/VLAT-Pics/BubbleChart.png'
import img4 from '../components/data/VLAT-Pics/TreeMap.png'
import img5 from '../components/data/VLAT-Pics/StackedBar100.png'
import img6 from '../components/data/VLAT-Pics/Histogram.png'
import img7 from '../components/data/VLAT-Pics/StackedArea.png'
import img8 from '../components/data/VLAT-Pics/Choropleth.png'
import img9 from '../components/data/VLAT-Pics/BarGraph.png'
import img10 from '../components/data/VLAT-Pics/AreaChart.png'
import img11 from '../components/data/VLAT-Pics/Pie.png'
import img12 from '../components/data/VLAT-Pics/LineChart.png'



let minivis = [
    { 
        'vis': LineChartMini, 
        'type': 'Лінійна діаграма', 
        'question': 'Якою була ціна нафти в лютому 2020 року?', 
        'options': ["Велика Британія","США","Японія","Австралія", "Пропустити"], 
        'correct_answer': 0, 
        'cimage': img12 
    },
    { 
        'vis': StackedBarChartMini, 
        'type': 'Накопичувальна відносна стовпчикова діаграма', 
        'question': 'У якої країни найменша частка золотих медалей?', 
        'options': ["$16.55 - $57.52", "$19.52 - $59.00", "$23.43 - $60.72", "$21.82 - $87.52", "Пропустити"], 
        'correct_answer': 0, 
        'cimage': img5 
    },
    { 
        'vis': BarChartMini, 
        'type': 'Стовпчикова діаграма (Bar Chart)', 
        'question': 'Яка середня швидкість інтернету в Японії?', 
        'options': ["42.30 Mbps", "40.51 Mbps", "35.25 Mbps", " 16.6 Mbps", "Пропустити"], 
        'correct_answer': 1, 
        'cimage': img9 
    },
    { 
        'vis': StackedBarChart2Mini, 
        'type': 'Накопичувальна стовпчикова діаграма (Stacked Bar)', 
        'question': 'Яка ціна арахісу в Сеулі?', 
        'options': ["$5.2", "$6.1", "$7.5", "$4.5", "Пропустити"], 
        'correct_answer': 1, 
        'cimage': img2 
    },
    { 
        'vis': PieChartMini, 
        'type': 'Кругова діаграма (Pie Chart)', 
        'question': 'Яку приблизно частку ринку смартфонів займає Samsung?', 
        'options': ["17.6%", "25.3%", "10.9%", "35.2%", "Пропустити"], 
        'correct_answer': 0, 
        'cimage': img11 
    },
    { 
        'vis': HistogramMini, 
        'type': 'Гістограма (Histogram)', 
        'question': 'На яку відстань переважно пересувалися користувачі таксі', 
        'options': ["60-70 км", "30-40 км", "20-30 км","50-60 км", "Пропустити"], 
        'correct_answer': 1, 
        'cimage': img6 
    },
    { 
        'vis': ScatterPlotMini, 
        'type': 'Точкова діаграма (Scatterplot)', 
        'question': "Існує негативний зв'язок між зростом і масою 85 осіб.", 
        'options': ['Правда', 'Хиба', "Пропустити"], 
        'correct_answer': 0, 
        'cimage': img1 
    },
    { 
        'vis': AreaChartMini, 
        'type': 'Площинна діаграма (Area Chart)', 
        'question': 'Якою була середня ціна фунту кавових бобів у вересні 2019?', 
        'options': ["$0.71", "$0.90", "$0.80", "$0.63", "Пропустити"], 
        'correct_answer': 0, 
        'cimage': img10 
    },
    {
        'vis': StackedAreaPlotMini, 
        'type': 'Накопичувальна площинна діаграма (Stacked Area)', 
        'question': 'Яким було співвідношення дівчаток, названих «Ісла», до дівчаток, названих «Амелія», у 2012 році у Великій Британії?', 
        'options': ["1 до 1","1 до 2","1 до 3","1 до 4", "Пропустити"], 
        'correct_answer': 1, 
        'cimage': img7 
    },
    { 
        'vis': BubbleChartMini, 
        'type': 'Бульбашкова діаграма (Bubble Chart)', 
        'question': 'У метрополітену якого міста найбільша кількість станцій?', 
        'options': ["Пекін", "Шанхай", "Лондон", "Сеул", "Пропустити"], 
        'correct_answer': 1, 
        'cimage': img3 
    },
    { 
        'vis': ChoroplethMini, 
        'type': 'Хороплетна мапа (Choropleth)', 
        'question': 'Станом на 2021 рік, населення Харківської області переважало чисельністю населення Львівської області"', 
        'options': ['Правда', 'Хиба', "Пропустити"], 
        'correct_answer': 0, 
        'cimage': img8 
    },
    { 
        'vis': TreeMapMini, 
        'type': 'Деревоподібна діаграма (Treemap)', 
        'question': 'eBay входить до категорії «Програмне забезпечення».', 
        'options': ['Правда', 'Хиба', "Пропустити"], 
        'correct_answer': 1, 
        'cimage': img4 
    }
];

var record_ques = {}

var score_2 = 0
let initTime = 0
let endTime = 0
var num = 12


class VisQuiz extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            session_id: this.props.location.state.data.session_id,
            current_visualization_index: 0,
            score: 0,
            current_mini_index: 0,
            list_of_min_vis: this.shuffle(minivis),
            responses: {},
            mini_responses: {},
            resize_bool: true,
            device_info: '',
            form_incomplete: false,
            demographic_questions: {
                'sex': null,
                'age': null,
                'education': null,
                'familiarity': null
            },
            demographics_incomplete: true,
            comment: '',
            width: 0,
            height: 0,
            mini_score: 0,
            ip_address: "",
        }
        )

        window.addEventListener('resize', this.handleWindowResize.bind(this))
    }

    handleWindowResize(e) {
        this.setState({
            resize_bool: !this.state.resize_bool
        })
    }
    handleTextChange(e) {
        this.setState({ comment: e.target.value })
    }

    handleDemographicChange(e) {
        console.log(this.state)
        var new_dq = this.state.demographic_questions
        new_dq[e.target.id] = e.target.value

        var incomplete = false
        for (var key in new_dq) {
            if (new_dq[key] == null) {
                incomplete = true
            }
        }
        if (e.value == 'oth') {
            alert('Hello')
        }

        this.setState({ demographic_questions: new_dq, demographics_incomplete: incomplete })
    }
    getData = async () => {
        //https://medium.com/how-to-react/how-to-get-user-ip-address-in-react-js-73eb295720d0
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log("IP Address:  ", res.data);
        this.setState({
            ip_address: res.data.IPv4
        })
    }

    clicked_mini_answer(type, question, response, truth, time) {
        this.getData()
        if (response === minivis[this.state.current_mini_index]['options'][truth]) {
            this.state.mini_score = this.state.mini_score + 1
        }
        this.setState({
            current_mini_index: this.state.current_mini_index + 1,
        })
        endTime = Math.abs((Date.now() - initTime) / 1000)
        this.state.mini_responses[question] = { response: response, truth: truth, time: endTime }
        this.setState({
            device_info: navigator.userAgent
        })
        score_2 = this.state.mini_score

        if (response === minivis[this.state.current_mini_index]['options'][truth]) {
            record_ques[type] = '✅ Правильно'
        }
        else if (response === 'Skip') {
            record_ques[type] = '⏩ Пропущено'
        }
        else {
            record_ques[type] = '❌ Неправильно'
        }
        console.log("The dictionary is: ", record_ques)
    }



    shuffle(array) {
        //https://bost.ocks.org/mike/shuffle/
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }



    on_survey_click() {

        fetch(`${process.env.REACT_APP_API_URL}//record_responses_to_db`, {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                session_id: this.state.session_id,
                responses: this.state.responses,
                mini_responses: this.state.mini_responses,
                score: this.state.score,
                mini_score: this.state.mini_score,
                device: this.state.device_info,
                demographic_responses: this.state.demographic_questions,
                comment: this.state.comment,
                height: window.innerHeight,
                width: window.innerWidth,
                ipaddress: this.state.ip_address
            })
        })
            .then(res => res.json()).then(data => {
                //var message = 'Warning!\n\nNavigating away from this page will delete your text if you haven\'t already saved it.';
                //e.returnValue = message;
                //return message;
            })

        var pageType = {
            pathname: '/thank_you',
            state: {
                data: {
                    'session_id': this.state.session_id,
                }
            }
        }
        this.props.history.push(pageType)
    }
    timeout() {
        alert('Час вийшов! Натисніть "ОК" щоб перейти до наступного запитання.')
        this.setState({
            current_visualization_index: this.state.current_visualization_index + 1,
        })
    }
    getRandom() {
        return Math.random();
    }
    minitimeout() {
        alert('Час вийшов! Натисніть "ОК" щоб перейти до наступного запитання.')
        this.setState({
            current_mini_index: this.state.current_mini_index + 1,
        })
    }


    render() {
        const hoursMinSecs = { hours: 0, minutes: 0, seconds: 10 }
        initTime = Date.now()
        console.log("Starting Time is : " + initTime)
        console.log('render')

        if (this.props.location.state == undefined) {
            window.location.href = "/";
            return (<p>Невизначена сесія. Будь ласка поверніться на <a href={'/'}> сторінку згоди</a></p>)
        }
        let ages = []
        for (var i = 18; i < 100; i++) {
            ages.push(i)
        }

        if (this.state == null) {
            return (<p>Loading...</p>)
        }
        if (this.state.current_mini_index < this.state.list_of_min_vis.length) {
            const options = minivis[this.state.current_mini_index]['options'].map((item, i) =>

                <Button variant="secondary" size="sm" className={'question-option'} id={`button_option_${i}`} key={`button_option_${i}`} onClick={() =>
                    this.clicked_mini_answer(minivis[this.state.current_mini_index]['type'], minivis[this.state.current_mini_index]['question'], item, minivis[this.state.current_mini_index]['correct_answer'], 'timeTaken')}>
                    {item}
                </Button>
            )
            let VisComp = minivis[this.state.current_mini_index]['vis']
            //console.log(VisComp)
            return (
                <Container className={'container-class'} fluid>
                    <Row className={'vis-quiz-row'}>
                        <Col lg={6} className={'vis-column'}>
                            <VisComp width={window.innerWidth} height={window.innerHeight} resized={this.state.resize_bool}></VisComp>
                        </Col>
                        <Col lg={6} className={'quiz-column'}>
                            <div className='timeStamp'>
                                <Countdown date={Date.now() + 25000} renderer={({ minutes, seconds, completed }) => {
                                    return <span>Залишилось часу: {minutes}:{seconds}</span>;
                                }} autoStart={true} key={Date.now()} onComplete={() => this.minitimeout()} />
                                {/* <CountDownTimer hoursMinSecs={hoursMinSecs} /> */}
                            </div>
                            <div className={'question-container'}>
                                <div className={'question-text'}>
                                    <p>{minivis[this.state.current_mini_index]['question']}</p>
                                </div>

                                <div className={'question-options d-grid gap-2 btn-block'}>
                                    {options}
                                </div>
                            </div>

                        </Col>
                    </Row>
                    <Row className={'progress-bar-row'}>
                        <ProgressBar completed={(parseInt(this.state.current_mini_index)).toString()} maxCompleted={num.toString()} length={Math.min(window.innerWidth, window.innerHeight)} />
                    </Row>
                </Container>
            );
        }
        else {
            return (
                <>
                    <Row className={'justify-content-center no-margin-row'}>
                        <Col lg={6} className={'text-box text-justify'}>


                            <Form.Group className={'question'}>
                                <Form.Label>Будь ласка вкажіть свій вік.</Form.Label>
                                <Form.Select as="select" id={'age'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    {ages.map((d, i) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <hr />

                            <Form.Group className={'question'}>
                                <Form.Label>Будь ласка вкажіть ваш ґендер.</Form.Label>
                                <Form.Select as="select" id={'sex'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option key={'male'} value={'male'}>Чоловік</option>
                                    <option key={'female'} value={'female'}>Жінка</option>
                                    <option key={'other'} value={'other'}>Небінарна персона</option>
                                    <option key={'withdraw'} value={'withdraw'}>Не хочу розголошувати цю інформацію</option>
                                </Form.Select>
                            </Form.Group>
                            <hr />

                            <Form.Group className={'question'}>
                                <Form.Label>Будь ласка, оберіть ваш найвищий рівень завершеної освіти.</Form.Label>
                                <Form.Select as="select" id={'education'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option value={'highschool'}>Повна загальна середня освіта</option>
                                    <option value={'associate'}>Фахова передвища освіта</option>
                                    <option value={'bachelors'}>Бакалаврський ступінь</option>
                                    <option value={'masters'}>Магістерський ступінь</option>
                                    <option value={'doctorate'}>Докторський ступінь</option>
                                </Form.Select>
                            </Form.Group>
                            <hr />
                            <Form.Group className={'question'}>
                                <Form.Label>Чи маєте ви колірну сліпоту (дальтонізм)?</Form.Label>
                                <Form.Select as="select" id={'color-blind'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option value={'yes'}>Так</option>
                                    <option value={'no'}>Ні</option>
                                    <option value={'maybe'}>Не хочу розголошувати цю інформацію</option>
                                </Form.Select>
                            </Form.Group>
                            <hr />

                            <Form.Group className={'question'}>
                                <Form.Label>Будь ласка опишіть ваш досвід з візуалізацією даних.</Form.Label>
                                <Form.Select as="select" id={'familiarity'} onChange={this.handleDemographicChange.bind(this)}>
                                    <option value={null} selected={true} disabled={true}></option>
                                    <option value={'not_familiar'}>Я ніколи не працював професійно з візуалізацією даних</option>
                                    <option value={'somewhat'}>Я дещо знайомий з візуалізацією даних</option>
                                    <option value={'very_familiar'}>Я створював візуалізації даних самостійно</option>
                                </Form.Select>
                            </Form.Group>
                            <hr />


                            <Form.Group>
                                <Form.Label>(опціонально) Будь ласка, залиште коментар якщо бажаєте.</Form.Label>
                                <Form.Control as="textarea" id={'comments'} rows={3} onChange={this.handleTextChange.bind(this)}>
                                </Form.Control>
                            </Form.Group>
                            <hr />


                            <div className={'text-center'}><Button className={'btn-sm'}
                                variant={"success"}
                                onClick={this.on_survey_click.bind(this)}
                                disabled={(this.state.form_incomplete || this.state.demographics_incomplete)}
                                id={'survey_submit-btn'}>
                                Відправити відповіді
                            </Button></div>

                            <p className={'text-box'}></p>
                        </Col>

                    </Row>
                </>

            )
        }
    }
}



export default VisQuiz;
export { score_2 };
export { record_ques };
