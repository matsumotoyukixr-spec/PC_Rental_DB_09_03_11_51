import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

const RoutesComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    if (isLoggedIn) {
        // ���O�C��������̃g�b�v�y�[�W
        return <div><h1>�g�b�v�y�[�W</h1><p>���O�C���ɐ������܂����B</p></div>;
    }

    // ���O�C���O�̃��[�e�B���O
    return (
        <Routes>
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
    );
};

export default RoutesComponent;