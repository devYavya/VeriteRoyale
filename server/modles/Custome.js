const mongoose = require('mongoose');

const CustomPerfumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  baseScent: {
    type: String,
    required: true,
    enum: [
        'Amber Oud',
        'Sandalwood & Vetiver',
        'Rose & Patchouli',
        'Vanilla & Tonka Bean',
        'Jasmine & Sandalwood',
        'Cedarwood & Frankincense',
        'Neroli & White Musk',
        'Blackcurrant & Leather',
        'Bergamot & Myrrh'
    ]
  },
  concentration: {
    type: String, 
    required: true,
    enum: ['parfum', 'eauDeParfum', 'eauDeToilette']
  },
  size: {
    type: String,
    required: true,
    enum: ['30ml', '50ml', '100ml']
  },
  packaging: {
    type: String,
    required: true,
    enum: ['classic', 'luxury', 'premium']
  },
  customization: {
    type: String,
    required: true,
    enum: ['engraving', 'giftWrap', 'none']
  },
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CustomPerfume', CustomPerfumeSchema);
