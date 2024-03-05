import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CodeingAssistant from './usecase5-contentgeneration/UseCase5_Solution1';
import UseCase2Sample from './usecase2-aipoweredchat/sample.js';
import UseCase2Final from './usecase2-aipoweredchat/final.js';
import UseCase3Sample from './usecase3-emailautomation/sample.js';
import UseCase3Final from './usecase3-emailautomation/final.js';
import UseCase5Final from './usecase5-contentgeneration/final.js';
import UseCase5Sample from './usecase5-contentgeneration/sample.js';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/CodeingAssistant' element={<CodeingAssistant />} />
                <Route path='/UseCase2/sample' element={<UseCase2Sample />} />
                <Route path='/UseCase2/final' element={<UseCase2Final />} />
                <Route path='/UseCase3/sample' element={<UseCase3Sample />} />
                <Route path='/UseCase3/final' element={<UseCase3Final />} />
                <Route path='/UseCase5/sample' element={<UseCase5Sample />} />
                <Route path='/UseCase5/final' element={<UseCase5Final />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
