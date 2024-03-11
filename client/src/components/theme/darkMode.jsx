// Filename - hooks/useDarkSide.js

import React from "react";
import { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";


// Filename - Components/Switcher.js


// Filename - App.js


function DarkMode() {
    const Switcher=() =>{
        const [colorTheme, setTheme] = useDarkSide();
        const [darkSide, setDarkSide] = useState(
            colorTheme === "light" ? true : false
        );
    
        const toggleDarkMode = (checked) => {
            setTheme(colorTheme);
            setDarkSide(checked);
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
    
    
const  useDarkSide = () => {
	const [theme, setTheme] = useState(localStorage.theme);
	const colorTheme = theme === "dark" ? "light" : "dark";
	localStorage.setItem("theme", theme);
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(colorTheme);
		root.classList.add(theme);
		if (localStorage.theme == "dark")
			localStorage.removeItem("theme");
		else localStorage.setItem("theme", theme);
	}, [theme, colorTheme]);

	return [colorTheme, setTheme];
}
	return (
		<div>
				<Switcher />
		</div>
	);
}

export default DarkMode;
