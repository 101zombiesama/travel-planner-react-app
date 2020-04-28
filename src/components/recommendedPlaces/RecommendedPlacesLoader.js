import React, {useContext} from "react"
import ContentLoader from "react-content-loader";
import Fade from 'react-reveal/Fade';
import { ThemeContext } from '../../contexts/ThemeContext';

const RecommendedPlacesLoader = () => {
    // consuming context
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);

    return(
        <Fade>
        <ContentLoader 
            speed={2}
            width='100%'
            height='100%'
            viewBox="0 0 335 335"
            backgroundColor={isLightTheme ? lightTheme.palette.background.shadeB : darkTheme.palette.background.shadeB}
            foregroundColor={isLightTheme ? lightTheme.palette.background.shadeA : darkTheme.palette.background.shadeA}
        >
            <rect x="111" y="23" rx="3" ry="3" width="200" height="7" /> 
            <rect x="111" y="44" rx="3" ry="3" width="100" height="7" /> 
            <circle cx="58" cy="39" r="30" /> 
            <rect x="112" y="105" rx="3" ry="3" width="200" height="7" /> 
            <rect x="112" y="126" rx="3" ry="3" width="100" height="7" /> 
            <circle cx="59" cy="121" r="30" /> 
            <rect x="112" y="191" rx="3" ry="3" width="200" height="7" /> 
            <rect x="112" y="212" rx="3" ry="3" width="100" height="7" /> 
            <circle cx="59" cy="207" r="30" /> 
            <rect x="113" y="273" rx="3" ry="3" width="200" height="7" /> 
            <rect x="113" y="294" rx="3" ry="3" width="100" height="7" /> 
            <circle cx="60" cy="289" r="30" />
        </ContentLoader>
        </Fade>
        )
}

export default RecommendedPlacesLoader;