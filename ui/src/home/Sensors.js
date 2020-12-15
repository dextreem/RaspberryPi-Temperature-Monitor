import React from 'react';

import { Card, List } from 'antd';
import BufferElement from './BufferElement';

class Sensors extends React.Component {
    render() {
        return (
            <>
            <Card title={this.props.name}>
                    <List
                    dataSource={this.props.temps}
                    renderItem={item =>(
                        <BufferElement name={item.name} temp={item.temp}/>
                    )}
                    />
                </Card>
            </>
        )
    }
}

export default Sensors;
