import React from 'react';


import "./Home.css"

class BufferElement extends React.Component {
    constructor(props) {
        super(props);

        this.bgStyle = "bufferElement"
        this.bgStyle += " bg-low"
    }

    getClass(value){
        var bgStyle = "bufferElement"
         bgStyle += " bg-low"
        if (value < 25) {
            bgStyle += " bg-low"
        } else if (value < 50) {
            bgStyle += " bg-middle";
        } else if (value < 90) {
            bgStyle += " bg-high";
        } else {
            bgStyle += " bg-critical";
        }

        return bgStyle
    }

    render() {
        return (
            <>
                <div className={this.getClass(this.props.temp)}>
                    {this.props.name ? this.props.name + ": " : ""}{this.props.temp}°C
            </div>
            </>
        )
    }
}

export default BufferElement;
