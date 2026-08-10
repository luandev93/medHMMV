const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/medical', routes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`👨‍⚕️ Módulo Médico rodando na porta ${PORT}`);
});
