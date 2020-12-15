import React from 'react';

import { Row, Col } from 'antd';

import Buffer from './Buffer';
import Others from './Sensors';

// import data from '../sensors/sensors.json'

class Home extends React.Component {
    sensorUrl = "http://heizung/sensors.json";
    state = {
        data: {
            "p11": "0",
            "p12": "0",
            "p13": "0",
            "p14": "0",
            "p21": "0",
            "p22": "0",
            "p23": "0",
            "p24": "0",
            "hk": "0",
            "hv": "0",
            "hr": "0",
            "hu": "0",
            "ok": "0",
            "ov": "0",
            "or": "0",
            "kv": "0",
            "kr": "0"
        }
    }

    constructor() {
        super();
        this.puffer1 = [this.state.data.p14, this.state.data.p13, this.state.data.p12, this.state.data.p11];
        this.puffer2 = [this.state.data.p24, this.state.data.p23, this.state.data.p22, this.state.data.p21];

        this.holzofen = [
            { name: "Kes", temp: this.state.data.hk },
            { name: "Vor", temp: this.state.data.hv },
            { name: "Rück", temp: this.state.data.hr },
            { name: "Über", temp: this.state.data.hu },
        ];

        this.oelkreis = [
            { name: "Öl-V", temp: this.state.data.ov },
            { name: "Öl-R", temp: this.state.data.or },
            { name: "Kr-V", temp: this.state.data.kv },
            { name: "Kr-R", temp: this.state.data.kr }
        ]
    }

    componentDidMount() {
        this.getSensorData();
        setInterval(this.getSensorData, 5000);
    }

    getSensorData = () => {
        fetch(this.sensorUrl, {
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: "cors"
        }).then((response) => {
            return response.json();  // converting byte data to json
        }).then(data => {
            this.setState({ data: data });
            this.puffer1 = [this.state.data.p14, this.state.data.p13, this.state.data.p12, this.state.data.p11];
            this.puffer2 = [this.state.data.p24, this.state.data.p23, this.state.data.p22, this.state.data.p21];

            this.holzofen = [
                { name: "Kes", temp: this.state.data.hk },
                { name: "Vor", temp: this.state.data.hv },
                { name: "Rück", temp: this.state.data.hr },
                { name: "Über", temp: this.state.data.hu },
            ];

            this.oelkreis = [
                { name: "Öl-V", temp: this.state.data.ov },
                { name: "Öl-R", temp: this.state.data.or },
                { name: "Kr-V", temp: this.state.data.kv },
                { name: "Kr-R", temp: this.state.data.kr }
            ]
            console.log(this.state.data);
        });
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Buffer temps={this.puffer1} name="Puffer 1" />
                    </Col>
                    <Col span={6}>
                        <Buffer temps={this.puffer2} name="Puffer 2" />
                    </Col>
                    <Col span={6}>
                        <Others temps={this.holzofen} name="Holz" />
                    </Col>
                    <Col span={6}>
                        <Others temps={this.oelkreis} name="Öl/Kreis" />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;
