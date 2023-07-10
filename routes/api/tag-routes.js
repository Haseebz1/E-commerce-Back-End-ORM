const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// // The `/api/tags` endpoint

// router.get('/', (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
// });

// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });

// router.post('/', (req, res) => {
//   // create a new tag
// });

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });

// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });

router.get('/',  async (req, res) => {
  
  try {
    const productTag = await Tag.findAll({
       
      include: [{ model: Tag }],
    });
    res.status(200).json(productTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  
  try {
    const productTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Tag}],
    });
    
    if (!productTag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
    res.status(200).json(productTag);
  } catch(err) {
    res.status(500).json(err);
  }
  
});

router.post('/', async (req, res) => {
  
  try{
    const productTag = await Tag.create(req.body);
    res.status(200).json(productTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  
  try {
    const productTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
        
      },
      {
        where: {
          id: req.params.id,
        },
      });
      if (!productTag) {
        res.status(404).json({message: 'no tag found'});
        return;
      }
      res.status(200).json(productTag);
    } catch (err) {
      res.status(400).json(err);
    }
  
});

router.delete('/:id', async (req, res) => {
  
try {
  const productTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!productTag) {
    res.status(404).json({message: 'no category found by id'});
    return;
}
res.status(200).json(productTag);
} catch (err) {
  res.status(400).json(err);
}

});

module.exports = router;
