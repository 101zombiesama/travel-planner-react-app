import React, {useContext} from "react"
import ContentLoader from "react-content-loader";
import Fade from 'react-reveal/Fade';
import { ThemeContext } from '../../contexts/ThemeContext';

const DetailsLoader = () => {
    // consuming context
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);

    return(
        <Fade>
        <ContentLoader 
            speed={2}
            width='100%'
            height='100%'
            viewBox="0 0 365 732"
            backgroundColor={isLightTheme ? lightTheme.palette.background.shadeB : darkTheme.palette.background.shadeB}
            foregroundColor={isLightTheme ? lightTheme.palette.background.shadeA : darkTheme.palette.background.shadeA}
        >
            <rect x="19" y="194" rx="3" ry="3" width="324" height="6" /> 
            <rect x="20" y="213" rx="3" ry="3" width="302" height="6" /> 
            <rect x="101" y="232" rx="3" ry="3" width="141" height="6" /> 
            <rect x="19" y="12" rx="0" ry="0" width="323" height="168" /> 
            <circle cx="54" cy="304" r="21" /> 
            <circle cx="130" cy="304" r="21" /> 
            <circle cx="206" cy="304" r="21" /> 
            <circle cx="283" cy="304" r="21" /> 
            <rect x="22" y="447" rx="3" ry="3" width="324" height="6" /> 
            <rect x="23" y="466" rx="3" ry="3" width="302" height="6" /> 
            <rect x="23" y="486" rx="3" ry="3" width="141" height="6" /> 
            <rect x="23" y="527" rx="3" ry="3" width="324" height="6" /> 
            <rect x="24" y="546" rx="3" ry="3" width="302" height="6" /> 
            <rect x="25" y="606" rx="3" ry="3" width="141" height="6" /> 
            <rect x="24" y="568" rx="3" ry="3" width="324" height="6" /> 
            <rect x="25" y="586" rx="3" ry="3" width="302" height="6" /> 
            <rect x="25" y="626" rx="3" ry="3" width="324" height="6" /> 
            <rect x="26" y="645" rx="3" ry="3" width="302" height="6" /> 
            <rect x="27" y="706" rx="3" ry="3" width="141" height="6" /> 
            <rect x="26" y="667" rx="3" ry="3" width="324" height="6" /> 
            <rect x="27" y="686" rx="3" ry="3" width="302" height="6" /> 
            <rect x="23" y="367" rx="3" ry="3" width="324" height="6" /> 
            <rect x="24" y="385" rx="3" ry="3" width="302" height="6" /> 
            <rect x="24" y="405" rx="3" ry="3" width="141" height="6" />
        </ContentLoader>
        </Fade>
        )
}

export default DetailsLoader;