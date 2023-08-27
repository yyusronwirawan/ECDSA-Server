const express = require("express");
const app = express();
const cors = require("cors");
const { signatureToPublicKey } = require('./shared/cryptography');

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {};

app.get("/wallets", (req, res) => {
  res.send({
    wallets: Object.keys(balances),
  })
});

app.get("/balance/:signature/:message", (req, res) => {
  const { signature, message } = req.params;
  const sender = signatureToPublicKey(message, signature);

  if (!balances[sender]) {
    setInitialBalance(sender);
  }

  const balance = balances[sender] || 0;

  res.send({ balance, sender });
});

app.post("/send", (req, res) => {
  const { 
    recipient, 
    amount, 
    signature, 
    message, 
  } = req.body;

  const sender = signatureToPublicKey(message, signature);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 100;
  }
}
