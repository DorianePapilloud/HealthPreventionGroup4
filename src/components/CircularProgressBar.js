import "../css/CircularProgressBar.scss"
import React from 'react';
export class CircularProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // Size of the enclosing square
        const sqSize = this.props.sqSize;
        // SVG centers the stroke width on the radius, subtract out so circle fits in square
        const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
        // Enclose cicle in a circumscribing square
        const viewBox = `0 0 ${sqSize} ${sqSize}`;
        // Arc length at 100% coverage is the circle circumference
        const dashArray = radius * Math.PI * 2;
        // Scale 100% coverage overlay with the actual percent
        let dashOffset = 0;
        if(this.props.percentage){
            dashOffset = dashArray - dashArray * this.props.percentage / 100;
        }



        function hsl_col_perc(percent, start, end) {
            let a = percent / 100,
                b = (end - start) * a,
                c = b + start;

            // Return a CSS HSL string
            return 'hsl('+c+', 100%, 50%)';
        }

        return (
            <svg
                width={this.props.sqSize}
                height={this.props.sqSize}
                viewBox={viewBox}>
                <circle
                    className="circle-background"
                    cx={this.props.sqSize / 2}
                    cy={this.props.sqSize / 2}
                    r={radius}
                    strokeWidth={`${this.props.strokeWidth}px`} />
                <circle
                    className="circle-progress"
                    stroke={hsl_col_perc(this.props.percentage, 60, 0)}
                    cx={this.props.sqSize / 2}
                    cy={this.props.sqSize / 2}
                    r={radius}
                    strokeWidth={`${this.props.strokeWidth}px`}
                    // Start progress marker at 12 O'Clock
                    transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }} />
                <text
                    className="circle-text"
                    fill={hsl_col_perc(this.props.percentage, 60, 0)}
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle">
                    {`${this.props.percentage}%`}
                </text>
            </svg>
        );
    }
}

CircularProgressBar.defaultProps = {
    sqSize: 100,
    percentage: 25,
    strokeWidth: 5
};
