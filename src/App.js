import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Common, Main } from './index';

function App() {

    useEffect(() => {
        document.title = 'React - PDF - Catalog';
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Common />}>
                    <Route index element={<Main />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}

export default App;