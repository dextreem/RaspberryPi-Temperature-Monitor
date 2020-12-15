import React from 'react';

import { Card, List } from 'antd';
import BufferElement from './BufferElement';

class Buffer extends React.Component {
    render() {
        return (
            <>
                <Card title={this.props.name}>
                    <List
                    dataSource={this.props.temps}
                    renderItem={item =>(
                        <BufferElement temp={item}/>
                    )}
                    />
                </Card>
            </>
        )
    }
}

export default Buffer;
