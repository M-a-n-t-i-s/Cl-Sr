import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";
import AutoTable from "./components/AutoTable";


function App() {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentOptions, setCurrentOptions] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [lastPage, setLastPage] = useState(1)
    const [autoList, setAutoList] = useState([])
    const [info, setInfo] = useState('')
    const [countAudi, setCountAudi] = useState(0)
    const [countVolkswagen, setCountVolkswagen] = useState(0)
    const [countExeed, setCountExeed] = useState(0)
    const [countChery, setCountChery] = useState(0)
    const [currentMark, setCurrentMark] = useState('Audi')

    const [currentModels, setCurrentModels] = useState('')


    const variantPageSize = [
        {value: 5, label: "5 / page"},
        {value: 10, label: "10 / page"},
        {value: 15, label: "15 / page"}
    ]


    useEffect(() => {
        let count = 0
        setInfo('Подгрузка информации...')
        axios.get(`http://localhost:4444/`).then(
            (res) => {
                setCountAudi(res.data.audi)
                setCountChery(res.data.chery)
                setCountExeed(res.data.exeed)
                setCountVolkswagen(res.data.volkswagen)

                switch (currentMark) {
                    case 'Audi':
                        setLastPage(Math.ceil(res.data.audi/pageSize));
                        break;
                    case 'Chery':
                        setLastPage(Math.ceil(res.data.chery/pageSize));
                        break;
                    case 'Exeed':
                        setLastPage(Math.ceil(res.data.exeed/pageSize));
                        break;
                    case 'Volkswagen':
                        setLastPage(Math.ceil(res.data.volkswagen/pageSize));
                        break;

                }

                if (count === 1) {
                    setInfo('')
                }
                count += 1
            }
        )

        axios.get(`http://localhost:4444/${currentMark}`).then(
            (res) => {
                setCurrentOptions(res.data)
                if (count === 1) {
                    setInfo('')
                }
                count += 1
            }
        )
        let url
        if (currentModels === '') {
            url = `http://localhost:4444/${currentMark}/${pageSize}/${currentPage}`
        } else {
            url = `http://localhost:4444/${currentMark}/${pageSize}/${currentPage}/${currentModels}`
        }
        axios.get(url).then(
            (res) => {
                setAutoList(res.data);
                console.log(res.data);
            })

    }, [currentMark, pageSize, currentPage, currentModels])

    const markHandler = (e, mark) => {
        setCurrentMark(mark);
        setCurrentPage(1);
        e.preventDefault()
    }
    const enumCollection = (el) => {
        let str = ''
        for (let i = 0; i < el.length; i++) {
            if ((el.length - 1) === i) {
                str += el[i].value
            } else {
                str += el[i].value + '_'
            }
            console.log(str)
        }
        setCurrentModels(str)


    }

    return (
        <div className="mainWindow">
            <div className="bar">
                <span>
                    <a href=""
                       className={currentMark === "Audi" ? "active page-link link-primary" : "NotActive page-link link-primary"}
                       onClick={(e) => {
                           markHandler(e, "Audi")
                       }}>Audi</a>
                    {countAudi}
                </span>
                <span>
                     <a href=""
                        className={currentMark === "Exeed" ? "active page-link link-primary" : "NotActive page-link link-primary"}
                        onClick={(e) => {
                            markHandler(e, "Exeed")
                        }}>Exeed</a>
                    {countExeed}
                </span>
                <span>
                    <a href=""
                       className={currentMark === "Chery" ? "active page-link link-primary" : "NotActive page-link link-primary"}
                       onClick={(e) => {
                           markHandler(e, "Chery")
                       }}>Chery</a>
                    {countChery}
                </span>
                <span>
                     <a href=""
                        className={currentMark === "Volkswagen" ? "active page-link link-primary" : "NotActive page-link link-primary"}
                        onClick={(e) => {
                            markHandler(e, "Volkswagen")
                        }}>Volkswagen</a>
                    {countVolkswagen}
                </span>
            </div>
            <div className="selectModel">
                <label>Модель:</label>
                <div>
                    <Select isMulti className="select" options={currentOptions} onChange={el => enumCollection(el)}/>
                    <span className="loading">{info}</span>
                </div>
            </div>
            <AutoTable autoList={autoList}/>

            <div className={"foot"}>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {(currentPage !== 1 ) && <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous" onClick={(e) => {
                                setCurrentPage(currentPage - 1);
                                e.preventDefault()
                            }}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>}


                        <li className="page-item"><a className="page-link" href="" onClick={(e) => {
                            setCurrentPage(currentPage);
                            e.preventDefault()
                        }}>{currentPage}</a></li>

                        {((currentPage+1) < lastPage) && <li className="page-item"><a className="page-link" href="" onClick={(e) => {
                            setCurrentPage(currentPage + 1);
                            e.preventDefault()
                        }}>{currentPage + 1}</a></li>}

                        {((currentPage+2) < lastPage) && <li className="page-item"><a className="page-link" href="" onClick={(e) => {
                            setCurrentPage(currentPage + 2);
                            e.preventDefault()
                        }}>{currentPage + 2}</a></li>}

                        {((currentPage+3) < lastPage) && <li className="page-item"><a className="page-link" href="" onClick={(e) => {
                            setCurrentPage(currentPage + 3);
                            e.preventDefault()
                        }}>{currentPage + 3}</a></li>}

                        {((currentPage+4) < lastPage) && <li className="page-item"><a className="page-link" href="" onClick={(e) => {
                            setCurrentPage(currentPage + 4);
                            e.preventDefault()
                        }}>{currentPage + 4}</a></li>}

                        <li className="page-item"><a className="page-link" href="" onClick={(e) => {
                            e.preventDefault()
                        }}>...</a></li>
                        <li className="page-item"><a className="page-link" href="" onClick={(e) => {
                            setCurrentPage(lastPage);
                            e.preventDefault()
                        }}>{lastPage}</a></li>
                        {(currentPage !== lastPage ) && <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next" onClick={(e) => {
                                setCurrentPage(currentPage + 1);
                                e.preventDefault()
                            }}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>}
                    </ul>
                </nav>


                <Select className="select footSelect" defaultValue={variantPageSize[1]} options={variantPageSize}
                        onChange={el => setPageSize(el.value)}/>
            </div>

        </div>


    );
}

export default App;
