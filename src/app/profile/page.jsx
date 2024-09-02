// src/app/profile/page.js
'use client';

import { useState } from 'react';

const Profile = () => {
    const [branding, setBranding] = useState({ logo: '', color: '' });

    const handleLogoChange = (e) => setBranding({ ...branding, logo: e.target.files[0] });
    const handleColorChange = (e) => setBranding({ ...branding, color: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Upload branding data
        const formData = new FormData();
        formData.append('logo', branding.logo);
        formData.append('color', branding.color);
        
        await fetch('/api/branding', {
            method: 'POST',
            body: formData,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Logo:
                <input type="file" onChange={handleLogoChange} />
            </label>
            <label>
                Brand Color:
                <input type="color" onChange={handleColorChange} />
            </label>
            <button type="submit">Save</button>
        </form>
    );
};

export default Profile;
