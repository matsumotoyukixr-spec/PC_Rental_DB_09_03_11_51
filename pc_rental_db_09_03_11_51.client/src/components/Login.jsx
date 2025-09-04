/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
        // エラーをクリア
        if (error) {
            setError('');
        }
    };

    /*
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // デモ用の認証ロジック（実際のAPIに置き換えてください）
            if (credentials.username === 'admin' && credentials.password === 'password') {
                // ログイン成功
                setTimeout(() => {
                    setIsLoading(false);
                    if (onLoginSuccess) {
                        onLoginSuccess();
                    }
                }, 1000); // 1秒後にログイン成功
            } else {
                // ログイン失敗
                setTimeout(() => {
                    setIsLoading(false);
                    setError('ユーザー名またはパスワードが正しくありません');
                }, 1000);
            }
        } catch (err) {
            setIsLoading(false);
            setError('ログイン処理中にエラーが発生しました');
        }
    };
    */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // ログインAPIを呼び出す
            const response = await fetch('api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // APIに送るデータ（社員番号とパスワード）
                    EmployeeNo: credentials.username, // ここはAuthController.csのLoginRequestクラスと合わせる
                    Password: credentials.password
                })
            });

            // サーバーからの応答をチェック
            if (response.ok) { // 成功した場合（HTTPステータスコードが200番台）
                const data = await response.json();
                console.log(data.message);
                // ログイン成功時にトップページに遷移するロジックをここに書く
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
            } else { // 失敗した場合（HTTPステータスコードが401など）
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            // 通信エラーなど、予期せぬエラーが発生した場合
            setError('ネットワークエラーが発生しました。');
            console.error(err);
        } finally {
            // 処理が成功・失敗に関わらず、ローディング状態を解除
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">
                    PC貸出管理システム
                </h2>

                <div className="login-form">
                    <div className="form-group">
                        <label className="form-label">
                            ユーザー名
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            パスワード
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`login-btn ${isLoading ? 'loading' : ''}`}
                    >
                        {isLoading ? 'ログイン中...' : 'ログイン'}
                    </button>
                </div>

                <div className="demo-info">
                    <strong>デモ用認証情報:</strong><br />
                    ユーザー名: admin<br />
                    パスワード: password
                </div>
            </div>
        </div>
    );

    /*
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">
                    PC貸出管理システム
                </h2>

                <div className="login-form">
                    <div className="form-group">
                        <label className="form-label">
                            ユーザー名
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            パスワード
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`login-btn ${isLoading ? 'loading' : ''}`}
                    >
                        {isLoading ? 'ログイン中...' : 'ログイン'}
                    </button>
                </div>

                <div className="demo-info">
                    <strong>デモ用認証情報:</strong><br />
                    ユーザー名: admin<br />
                    パスワード: password
                </div>
            </div>
        </div>
    );
    */
};

export default Login;