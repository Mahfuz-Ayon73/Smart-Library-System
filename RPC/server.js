const express = require('express');
const app = express();
app.use(express.json());

app.post('/rpc', (req, res) => {
  const { method, params } = req.body;

  if (method === 'add') {
    res.json({ result: params.a + params.b });
  } else {
    res.status(400).json({ error: 'Unknown method' });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`RPC Server running on http://0.0.0.0:${PORT}`);
});
