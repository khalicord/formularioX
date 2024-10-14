const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para recibir datos del formulario
app.post('/submit', (req, res) => {
    const data = req.body;

    // Cargar o crear el libro de Excel
    let workbook;
    try {
        workbook = xlsx.readFile('registros.xlsx');
    } catch (error) {
        workbook = xlsx.utils.book_new();
    }

    // Crear o obtener la hoja
    let worksheet;
    if (!workbook.Sheets['Registros']) {
        worksheet = xlsx.utils.json_to_sheet([]);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Registros');
    } else {
        worksheet = workbook.Sheets['Registros'];
    }

    // Convertir datos del formulario a un formato adecuado
    const newRow = {
        Nombre: data.nombre,
        Edad: data.edad,
        Telefono: data.telefono,
        Valor1: data.valor1,
        Valor2: data.valor2,
        Valor3: data.valor3,
        Valor4: data.valor4,
        Valor5: data.valor5,
        Valor6: data.valor6,
        Valor7: data.valor7,
        Valor8: data.valor8,
        Valor9: data.valor9,
        Valor10: data.valor10,
        Valor11: data.valor11,
        Cp: data.cp,
        Cpk: data.cpk
    };

    // Añadir la nueva fila al worksheet
    const existingData = xlsx.utils.sheet_to_json(worksheet);
    existingData.push(newRow);
    const newWorksheet = xlsx.utils.json_to_sheet(existingData);
    workbook.Sheets['Registros'] = newWorksheet;
    xlsx.writeFile(workbook, 'registros.xlsx');

    res.json({ message: 'Datos guardados correctamente.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

