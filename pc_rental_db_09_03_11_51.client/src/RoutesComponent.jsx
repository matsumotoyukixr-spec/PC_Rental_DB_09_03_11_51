import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

const RoutesComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    if (isLoggedIn) {
        // ログイン成功後のトップページ
        return <div><h1>トップページ</h1><p>ログインに成功しました。</p></div>;
    }

    // ログイン前のルーティング
    return (
        <Routes>
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
    );
};

export default RoutesComponent;