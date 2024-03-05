import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AiPoweredChat from './usecase2-aipoweredchat/UseCase2-Solution1'
import CodeingAssistantSample from './usecase5-contentgeneration/sample';
import CodeingAssistantMain from './usecase5-contentgeneration/final';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/AiPoweredChat' element={<AiPoweredChat />} />
                <Route path='/UseCase5/sample' element={<CodeingAssistantSample />} />
                <Route path='/UseCase5/final' element={<CodeingAssistantMain />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
