import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AiPoweredChat from './usecase2-aipoweredchat/UseCase2-Solution1'
import CodeingAssistant from './usecase5-contentgeneration/UseCase5_Solution1';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/AiPoweredChat' element={<AiPoweredChat />} />
                <Route path='/CodeingAssistant' element={<CodeingAssistant />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
