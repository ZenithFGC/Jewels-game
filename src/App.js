import { useState, useEffect, useCallback } from 'react';
import './App.css';

const widthCount = 10;
const heightCount = 10;
const colors =[ 'topaz','emerald','sapphire','amethyst','ruby','amber' ];

let foo = 0;

function App() {
    const [ gemState, setGems ] = useState([]);
    const [ pickedGemType, setPickedGemType ] = useState('');
    const [ replacedGemType, setReplacedGemType ] = useState('');
    const [ score, setScore ] = useState(0);

    function getField() {
        const arrOfGems = [];
        for (let i = 0; i < heightCount; i++) {
            arrOfGems[i] = [];
            for (let j = 0; j < widthCount; j++) {
                const randomGems = colors[ Math.floor(Math.random() * 6) ];
                arrOfGems[i].push(randomGems);
            }  
        }
        setGems(arrOfGems);
    }
  
    useEffect(()=>{getField({});}, [])

    const removeColumn3gems = useCallback(() => {
        for(let i = 0; i < heightCount - 2; i++) {
            for(let j = 0; j < widthCount; j++) {
                let gems3Column =[ [i, j], [i + 1, j], [i + 2, j] ];
                if(gemState[i][j] !== "" && gems3Column.every(color => gemState[color[0]][color[1]] === gemState[i][j])){
                    gems3Column.forEach(color => {
                        gemState[color[0]][color[1]] = "";
                    })
                    setScore((score) => score + 3);
                    return true;
                }
            }
        }
    }, [gemState]) 
  
    const removeLine3gems = useCallback(() => {
        for(let i = 0; i < heightCount; i++) {
            for(let j = 0; j < widthCount - 2; j++) {
                let gems3Line =[[i, j], [i, j + 1], [i, j + 2] ];
                if(gemState[i][j] !== "" && gems3Line.every(color => gemState[color[0]][color[1]] === gemState[i][j])){
                    gems3Line.forEach(color => {
                        gemState[color[0]][color[1]] = "";
                    })
                    setScore((score) => score + 3);
                    return true;
                }
            }
        }
    }, [gemState])

    const removeColumn4gems = useCallback(() => {
        for(let i = 0; i < heightCount - 3; i++) {
            for(let j = 0; j < widthCount; j++) {
                let gems4Column =[ [i, j], [i + 1, j], [i + 2, j], [i + 3, j] ];
                if(gemState[i][j] !== "" && gems4Column.every(color => gemState[color[0]][color[1]] === gemState[i][j])){
                    gems4Column.forEach(color => {
                        gemState[color[0]][color[1]] = "";
                    })
                    setScore((score) => score + 4);
                    return true;
                }
            }
        }
  }, [gemState])

    const removeLine4gems = useCallback(() => {
        for(let i = 0; i < heightCount; i++) {
            for(let j = 0; j < widthCount - 3; j++) {
                let gems4Line =[[i, j], [i, j + 1], [i, j + 2], [i, j + 3] ];
                if(gemState[i][j] !== "" && gems4Line.every(color => gemState[color[0]][color[1]] === gemState[i][j])){
                    gems4Line.forEach(color => {
                        gemState[color[0]][color[1]] = "";
                    })
                    setScore((score) => score + 4);
                    return true;
                }
            }
        }
    }, [gemState])

    const removeColumn5gems = useCallback(() => {
        for(let i = 0; i < heightCount - 4; i++) {
            for(let j = 0; j < widthCount; j++) {
                let gems5Column =[ [i, j], [i + 1, j], [i + 2, j], [i + 3, j], [i + 3, j] ];
                if(gemState[i][j] !== "" && gems5Column.every(color => gemState[color[0]][color[1]] === gemState[i][j])){
                    gems5Column.forEach(color => {
                        gemState[color[0]][color[1]] = "";
                    })
                    setScore((score) => score + 5);
                    return true;
                }
            }
        }
    }, [gemState])

    const removeLine5gems = useCallback(() => {
        for(let i = 0; i < heightCount; i++) {
            for(let j = 0; j < widthCount - 4; j++) {
                let gems5Line =[[i, j], [i, j + 1], [i, j + 2], [i, j + 3] ];
                if(gemState[i][j] !== "" && gems5Line.every(color => gemState[color[0]][color[1]] === gemState[i][j])){
                    gems5Line.forEach(color => {
                        gemState[color[0]][color[1]] = "";
                    })
                    setScore((score) => score + 5);
                    return true;
                }
            }
        }
    }, [gemState])

    const firstLine = useCallback(() =>{
        foo = 0;
        for (let i = 0; i < heightCount; i++){
            for(let j = 0; j < widthCount; j++){
                if(gemState[0][i] === ""){
                    gemState[0][i] = colors[Math.floor(Math.random() * 6)];
                };
                if (gemState[i] && gemState[i][j] === "") {
                    foo += 1;
                }
            }
        }
    }, [gemState])

    const sinkTheGem = useCallback(() => {
        for (let i = heightCount; i > 0; i--){
            for(let j = widthCount; j >= 0; j--){ 
                if(gemState[i] && gemState[i][j] === "") {
                    gemState[i][j] = gemState[i - 1][j];
                    gemState[i - 1][j] = "";
                }
            }
        }
    }, [gemState])

    function dragStart(e) {
        setPickedGemType(e.target); 
    }

    function dragDrop(e) {
        setReplacedGemType(e.target);
    }

    function dragEnd() {
        if(replacedGemType) {
            let [replacedGemTypeLine, replacedGemTypeColumn] = 
            [parseInt(replacedGemType.getAttribute("data-line")), parseInt(replacedGemType.getAttribute("data-block"))];
            let [pickedGemTypeLine, pickedGemTypeColumn] = 
            [parseInt(pickedGemType.getAttribute("data-line")), parseInt(pickedGemType.getAttribute("data-block"))];
            let nearestGems = [
                [pickedGemTypeLine + 1, pickedGemTypeColumn],
                [pickedGemTypeLine - 1, pickedGemTypeColumn],
                [pickedGemTypeLine, pickedGemTypeColumn + 1],
                [pickedGemTypeLine, pickedGemTypeColumn - 1]
            ] 
            let checkTheReplacement = nearestGems.reduce((initialValue, item) => {
                if(item[0] === replacedGemTypeLine && item[1] === replacedGemTypeColumn) {
                    initialValue = true;
                }
                return initialValue;
            }, false)
            
            if (pickedGemType && checkTheReplacement) {
                gemState[replacedGemTypeLine][replacedGemTypeColumn] = pickedGemType.classList[0];
                gemState[pickedGemTypeLine][pickedGemTypeColumn] = replacedGemType.classList[0];
                if(( removeLine4gems() || removeColumn4gems() || removeLine3gems() || removeColumn3gems())) {
                    setPickedGemType(null);
                    setReplacedGemType(null);
                } else {
                    gemState[replacedGemTypeLine][replacedGemTypeColumn] = replacedGemType.classList[0];
                    gemState[pickedGemTypeLine][pickedGemTypeColumn] = pickedGemType.classList[0]; 
                }
            }
        }
    }

    useEffect(() => {
        let timer = setInterval(() => { if(gemState[0]) {
            firstLine();
            if(!foo) {
                removeColumn5gems();
                removeLine5gems();
                removeColumn4gems();
                removeLine4gems();
                removeColumn3gems();
                removeLine3gems();
            }
            sinkTheGem();
            setGems([...gemState]);
            }}, 75);
        return () => clearInterval(timer);
    },  [ firstLine,
        removeColumn5gems, 
        removeLine5gems,
        removeColumn4gems,
        removeLine4gems,  
        removeColumn3gems, 
        removeLine3gems,
        sinkTheGem, 
        gemState
        ])

    return (
        <div className="app">
        <div className="field">
        {gemState.map((line, lineId)=>{
            return line.map((block, columnId) => {
                return <div key={lineId + "/" + columnId} 
                            className={block + " gem"}  
                            style={{cursor: "move"}}
                            draggable={true}
                            data-line={lineId}
                            data-block={columnId}
                            onDragOver={(e) => {e.preventDefault()}}
                            onDragLeave={(e) => {e.preventDefault()}}
                            onDragStart={dragStart}
                            onDrop={dragDrop}
                            onDragEnd={dragEnd}>
                        </div>
            })
        })}
        </div>
        <div className="userScore">Scores: {score} </div>
        </div>
    );
}

export default App;