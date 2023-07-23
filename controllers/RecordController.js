import {MongoDBclient} from "../index.js";


export const getAllMark = async (req, res) => {
    try {
        await MongoDBclient.connect()
        const mark = req.params.mark
        const request = await MongoDBclient.db('hrTest').collection('stock').find({mark}).toArray()
        const array = new Set(request.map(el => el.model))
        const myArr = Array.from(array).map(el => {
            return {value: el, label: el}
        })
        await MongoDBclient.close()
        res.send(myArr)
        console.log("Данные отправлены")

    } catch (e) {
        console.log("Ошибка", e)

    }
}
export const getAll = async (req, res) => {
    try {
        await MongoDBclient.connect()
        const audi = await MongoDBclient.db('hrTest').collection('stock').find({mark: 'Audi'}).toArray()
        const chery = await MongoDBclient.db('hrTest').collection('stock').find({mark: 'Chery'}).toArray()
        const exeed = await MongoDBclient.db('hrTest').collection('stock').find({mark: 'Exeed'}).toArray()
        const volkswagen = await MongoDBclient.db('hrTest').collection('stock').find({mark: 'Volkswagen'}).toArray()
        await MongoDBclient.close()
        res.send({
            audi: audi.length,
            chery: chery.length,
            exeed: exeed.length,
            volkswagen: volkswagen.length
        })
        console.log("Данные отправлены")

    } catch (e) {
        console.log("Ошибка", e)
    }
}

export const getMark = async (req, res) => {
    try {
        await MongoDBclient.connect()
        const mark = req.params.mark
        const currentPage = req.params.page || 1
        let pageSize = req.params.size
        const request = await MongoDBclient.db('hrTest').collection('stock').find({mark}).toArray()
        await MongoDBclient.close()
        res.send(displayList(request, currentPage, pageSize))
        console.log("Данные отправлены")
    } catch (e) {
        console.log("Ошибка", e)
    }
}
export const getMarkAndModels = async (req, res) => {
    try {
        await MongoDBclient.connect()

        const mark = req.params.mark
        let arrayModels = req.params.models
        const pageSize = req.params.size
        arrayModels = arrayModels.split('_')
        const currentPage = req.params.page || 1
        const request = await MongoDBclient.db('hrTest').collection('stock').find(({$and: [{mark}, {model: {$in: arrayModels}}]})).toArray()
        await MongoDBclient.close()
        res.send(displayList(request, currentPage, pageSize))
        console.log("Данные отправлены")
    } catch (e) {
        console.log("Ошибка", e)
    }
}

const displayList = (arrData, page, pageSize) => {
    page = Number(page)
    pageSize = Number(pageSize)
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const array = arrData.slice(start, end)
    return array;
}
