import React from 'react';
import './backgroundLight.css';

const BackgroundDark = () => {

    const stars = []

    for (let i = 0; i < 20; i++) {
        stars.push(<div className="shooting_star"></div>)
    }

    return (
        <div className="bg-light">
            <div id="background-wrap">
                <div className="x1">
                    <div className="cloud"></div>
                </div>

                <div className="x2">
                    <div className="cloud"></div>
                </div>

                <div className="x3">
                    <div className="cloud"></div>
                </div>

                <div className="x4">
                    <div className="cloud"></div>
                </div>

                <div className="x5">
                    <div className="cloud"></div>
                </div>
            </div>
        </div>
     );
}
 
export default BackgroundDark;