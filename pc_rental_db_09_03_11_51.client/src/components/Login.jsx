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
        // �G���[���N���A
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
            // �f���p�̔F�؃��W�b�N�i���ۂ�API�ɒu�������Ă��������j
            if (credentials.username === 'admin' && credentials.password === 'password') {
                // ���O�C������
                setTimeout(() => {
                    setIsLoading(false);
                    if (onLoginSuccess) {
                        onLoginSuccess();
                    }
                }, 1000); // 1�b��Ƀ��O�C������
            } else {
                // ���O�C�����s
                setTimeout(() => {
                    setIsLoading(false);
                    setError('���[�U�[���܂��̓p�X���[�h������������܂���');
                }, 1000);
            }
        } catch (err) {
            setIsLoading(false);
            setError('���O�C���������ɃG���[���������܂���');
        }
    };
    */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // ���O�C��API���Ăяo��
            const response = await fetch('api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // API�ɑ���f�[�^�i�Ј��ԍ��ƃp�X���[�h�j
                    EmployeeNo: credentials.username, // ������AuthController.cs��LoginRequest�N���X�ƍ��킹��
                    Password: credentials.password
                })
            });

            // �T�[�o�[����̉������`�F�b�N
            if (response.ok) { // ���������ꍇ�iHTTP�X�e�[�^�X�R�[�h��200�ԑ�j
                const data = await response.json();
                console.log(data.message);
                // ���O�C���������Ƀg�b�v�y�[�W�ɑJ�ڂ��郍�W�b�N�������ɏ���
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
            } else { // ���s�����ꍇ�iHTTP�X�e�[�^�X�R�[�h��401�Ȃǁj
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            // �ʐM�G���[�ȂǁA�\�����ʃG���[�����������ꍇ
            setError('�l�b�g���[�N�G���[���������܂����B');
            console.error(err);
        } finally {
            // �����������E���s�Ɋւ�炸�A���[�f�B���O��Ԃ�����
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">
                    PC�ݏo�Ǘ��V�X�e��
                </h2>

                <div className="login-form">
                    <div className="form-group">
                        <label className="form-label">
                            ���[�U�[��
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
                            �p�X���[�h
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
                        {isLoading ? '���O�C����...' : '���O�C��'}
                    </button>
                </div>

                <div className="demo-info">
                    <strong>�f���p�F�؏��:</strong><br />
                    ���[�U�[��: admin<br />
                    �p�X���[�h: password
                </div>
            </div>
        </div>
    );

    /*
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">
                    PC�ݏo�Ǘ��V�X�e��
                </h2>

                <div className="login-form">
                    <div className="form-group">
                        <label className="form-label">
                            ���[�U�[��
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
                            �p�X���[�h
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
                        {isLoading ? '���O�C����...' : '���O�C��'}
                    </button>
                </div>

                <div className="demo-info">
                    <strong>�f���p�F�؏��:</strong><br />
                    ���[�U�[��: admin<br />
                    �p�X���[�h: password
                </div>
            </div>
        </div>
    );
    */
};

export default Login;