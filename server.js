import app from "./src/app.js";

// Configura a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}.`);
});
