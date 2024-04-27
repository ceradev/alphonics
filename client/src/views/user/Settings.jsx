import React, { useState } from 'react';
import Layout from '../layouts/Layout';

const Settings = () => {
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('en');

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <Layout>
        <div>
            <h1>Settings</h1>
            <label>
                Theme:
                <select value={theme} onChange={handleThemeChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </label>
            <br />
            <label>
                Language:
                <select value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                </select>
            </label>
        </div>
        </Layout>
    );
};

export default Settings;