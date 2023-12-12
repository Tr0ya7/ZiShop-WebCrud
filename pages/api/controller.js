const { requestDB } = require('./database')

function getProducts(req, res) {
    var ssql = 'SELECT * FROM PRODUCT'
    var filter = []

    if (req.query.name) {
        ssql += ' WHERE NAME LIKE ?'
        filter.push('%' + req.query.name + '%')
    }

    requestDB(ssql, filter, (err, result) => {
        if (err) throw err
        res.send(result)
    })
}

function postProduct(req, res) {
    const ssql = 'INSERT INTO PRODUCT(NAME, IMAGE_NAME, DESCRIPTION, PRICE) VALUES(?, ?, ?, ?) RETURNING ID'
    const filter = req.query.name

    requestDB(ssql, filter, (err, result) => {
        if (err) throw err
        res.send('Adicionado')
    })
}

function deleteProduct(req, res) {
    const ssql = 'DELETE FROM PRODUCT WHERE ID = ?'
    const filter = req.query.id

    requestDB(ssql, filter, (err, result) => {
        if (err) throw err
        res.send('Excluido')
    })
}

module.exports = { getProducts, postProduct, deleteProduct }