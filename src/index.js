import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AiPoweredChat from './usecase2-aipoweredchat/UseCase2-Solution1'
import CodeingAssistantSample from './usecase5-contentgeneration/UseCase5_sample';
import CodeingAssistantMain from './usecase5-contentgeneration/UseCase5_main';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/AiPoweredChat' element={<AiPoweredChat />} />
                <Route path='/codeing_assistant_sample' element={<CodeingAssistantSample />} />
                <Route path='/codeing_assistant_main' element={<CodeingAssistantMain />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
