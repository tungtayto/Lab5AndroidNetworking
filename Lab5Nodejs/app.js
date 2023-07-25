const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const CarModel = require('./model/CarModel');
const uri = "mongodb+srv://tungktph27675:tung07daidong@cluster0.e6ajppi.mongodb.net/lab5?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Da ket noi voi MongoDB');
  })
  .catch((err) => {
    console.error('Khong ket noi dc MongoDB: ', err);
  })

const app = express();

app.use(bodyParser.json());

app.get('/listCar', async function (req, res) {

  try {
    const carList = await CarModel.find().lean();
    res.json(carList);
  } catch (err) {
    console.error('Error fetching Car:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Định nghĩa API thêm sản phẩm
app.post('/addCars', async (req, res) => {
  try {
    const { name, price, des } = req.body;
    const car = new CarModel({ name, price, des });
    await car.save();
    const carList = await CarModel.find().lean();
    res.json(carList);
  } catch (err) {
    console.error('Error adding Car:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Định nghĩa API sửa đổi sản phẩm
app.put('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, des } = req.body;
    console.log("Id Can Update" + id);
    const car = await CarModel.findByIdAndUpdate(
      id,
      { name, price, des },
      { new: true }
    );
    const carList = await CarModel.find().lean();
    res.json(carList);
  } catch (err) {
    console.error('Error updating Car:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Định nghĩa API xóa sản phẩm
app.delete('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await CarModel.findByIdAndRemove(id);
    const carList = await CarModel.find().lean();
    res.json(carList);
  } catch (err) {
    console.error('Error deleting Car:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Khởi động server
const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});