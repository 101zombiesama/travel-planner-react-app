import React from 'react';
import './backgroundDark.scss';

const BackgroundDark = () => {

    const stars = []

    for (let i = 0; i < 20; i++) {
        stars.push(<div key={i} className="shooting_star"></div>)
    }

    return (
        <div className="bg">
            <div className="night">
                {stars}
            </div>
        </div>
     );
}
 
export default BackgroundDark;