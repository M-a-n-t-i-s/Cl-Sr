import React from 'react'
import Moment from "moment";
import '../App.css';



const AutoTable =({autoList})=> {
    return <table className="table mainTab">
        <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Марка/модель</th>
            <th scope="col">Модификация</th>
            <th scope="col">Комплектация</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Дата создания</th>
        </tr>
        </thead>
        <tbody>
        {autoList.map((el) =>
            <tr key={el._id}>
                <td>{el._id}</td>
                <td>{el.mark + ' ' + el.model}</td>
                <td>{((String(el.engine.volume).length) === 1 ? el.engine.volume : el.engine.volume) + ` ${el.engine.transmission} (${el.engine.power} л.с.)`}</td>
                <td>{el.equipmentName}</td>
                <td>{(el.price).toLocaleString('ru-RU') + " ₽"}</td>
                <td>{Moment(el.createdAt).format('DD.MM.YYYY HH:mm')}</td>
            </tr>
        )}
        </tbody>
    </table>

}

export default AutoTable


