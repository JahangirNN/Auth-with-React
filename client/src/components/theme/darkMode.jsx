// Filename - hooks/useDarkSide.js

import React from "react";
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {useSelector, useDispatch} from 'react-redux';
import { darkMode, lightMode } from "../../redux/user/themeSlice";
// Filename - Components/Switcher.js


// Filename - App.js


function DarkMode() {
    const Switcher=() =>{
        const {mode} = useSelector((state)=> state.theme);
        const [darkSide, setDarkSide] = useState(
            mode === "light" ? true : false
        );
        const colorTheme = mode === "dark" ? "light" : "dark";        
        const dispatch = useDispatch();    

        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(mode);
    
        const toggleDarkMode = (checked) => {
            mode === "dark" ? dispatch(lightMode()) : dispatch(darkMode());
            setDarkSide(checked);
		    root.classList.remove(mode);
		    root.classList.add(colorTheme);
		
        };
    
        return (
            <>
                <DarkModeSwitch
                    
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    size={30}
                />
            </>
        );
    }
    
	return (
		<div>
				<Switcher />
		</div>
	);
}

export default DarkMode;






// function DarkMode() {
//     const Switcher=() =>{
//         const [colorTheme, setTheme] = useDarkSide();
//         const [darkSide, setDarkSide] = useState(
//             colorTheme === "light" ? true : false
//         );
    
//         const toggleDarkMode = (checked) => {
//             setTheme(colorTheme);
//             setDarkSide(checked);
//         };
    
//         return (
//             <>
//                 <DarkModeSwitch
//                     checked={darkSide}
//                     onChange={toggleDarkMode}
//                     size={30}
//                 />
//             </>
//         );
//     }
    
    
// const  useDarkSide = () => {
// 	const [theme, setTheme] = useState(localStorage.theme);
// 	const colorTheme = theme === "dark" ? "light" : "dark";
// 	localStorage.setItem("theme", theme);
// 	useEffect(() => {
// 		const root = window.document.documentElement;
// 		root.classList.remove(colorTheme);
// 		root.classList.add(theme);
// 		if (localStorage.theme == "dark")
// 			localStorage.removeItem("theme");
// 		else localStorage.setItem("theme", theme);
// 	}, [theme, colorTheme]);

// 	return [colorTheme, setTheme];
// }
// 	return (
// 		<div>
// 				<Switcher />
// 		</div>
// 	);
// }

// export default DarkMode;
