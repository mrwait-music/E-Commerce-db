const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const data = await Tag.findAll({
    include: Product
  }) 
  res.json(data)
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const data = await Tag.findByPk(req.params.id, {
    include: Product
  })
  // be sure to include its associated Products
  res.json(data)
});

router.post('/', async (req, res) => {
  const data = await Tag.create(req.body);
  res.json(data)
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
      
    });

    if (!data) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!data) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
