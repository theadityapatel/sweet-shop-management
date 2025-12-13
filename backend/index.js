const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🍬 Sweet Shop API is running');
});

// export app for testing
module.exports = app;

// start server only if not testing
if (require.main === module) {
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
