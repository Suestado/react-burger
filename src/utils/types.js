import PropTypes from 'prop-types';

const BURGER_INGREDIENT_TYPES = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

const INGREDIENTS_DETAILS_TYPES = {
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
};

const MODAL_TYPES = {
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const MODAL_OVERLAY_TYPES = {
  handleCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const INGREDIENTS_GROUP_BLOCK_TYPES = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export {
  BURGER_INGREDIENT_TYPES,
  INGREDIENTS_DETAILS_TYPES,
  MODAL_TYPES,
  MODAL_OVERLAY_TYPES,
  INGREDIENTS_GROUP_BLOCK_TYPES,
}
