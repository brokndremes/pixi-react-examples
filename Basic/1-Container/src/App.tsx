import './App.css'
import {Application, useApplication, extend,} from '@pixi/react'
import {Container, Graphics, Point} from 'pixi.js'
import {useCallback, useRef, useState} from 'react'

extend({Container, Graphics,})


function ChildComponent() {
    const square_size = 100;
    const drawCallback = useCallback((graphics: any) => {
        graphics.clear()
        graphics.setFillStyle({color: 'red'})
        graphics.rect(0, 0, square_size, square_size)
        graphics.fill()
    }, [])
    const {app} = useApplication()
    const [center_point, setCenter_point] =
        useState<Point>(new Point(app.screen.width / 2 - square_size / 2, app.screen.height / 2 - square_size / 2));
    app.renderer.addListener("resize", () => {
        setCenter_point(new Point(app.screen.width / 2 - square_size / 2, app.screen.height / 2 - square_size / 2));
    })
    return (
        <pixiContainer x={center_point.x} y={center_point.y}>
            <pixiGraphics draw={drawCallback}/>
        </pixiContainer>
    )
}

function PixiApplication({...props}) {
    const [isInitialized, setIsInitialized] = useState(false);
    const handleInit = useCallback(() => setIsInitialized(true), []);

    return (
        <Application onInit={handleInit} {...props}>
            {isInitialized && (
                <ChildComponent/>
            )}
        </Application>
    );
}

function App() {
    const parentRef = useRef(null)
    return (
        <div className='full-height'>
            <div className='main-title'>
                <h1>0 - Responsive App</h1>
            </div>
            <div className="main-stage">
                <div className='stage-container' ref={parentRef}>
                    <PixiApplication background={'#1099bb'} resizeTo={parentRef}/>
                </div>
            </div>
        </div>
    )
}

export default App
