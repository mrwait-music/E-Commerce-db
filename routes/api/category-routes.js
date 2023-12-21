const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const data = await Category.findAll({
    include: Product
  }) 
  res.json(data)
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const data = await Category.findByPk(req.params.id, {
    include: Product
  })
  // be sure to include its associated Products
  res.json(data)
});

router.post('/', async (req, res) => {
  // create a new category
  const data = await Category.create(req.body);
  res.json(data)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update({
      where: {
        id: req.params.id
      }
    });

    if (!data) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!data) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
