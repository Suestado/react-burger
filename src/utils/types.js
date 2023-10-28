import PropTypes from 'prop-types';

const BURGER_INGREDIENT_TYPES = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
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
  handleHeadersRef: PropTypes.func.isRequired,
};

const CONSTRUCTOR_ELEMENT_FILLINGS = {
  item : PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  onReplaceFillings: PropTypes.func.isRequired,
}

const INGREDIENTS_SWITCHBAR = {
  activeTab: PropTypes.string.isRequired,
}

export {
  BURGER_INGREDIENT_TYPES,
  MODAL_TYPES,
  MODAL_OVERLAY_TYPES,
  INGREDIENTS_GROUP_BLOCK_TYPES,
  CONSTRUCTOR_ELEMENT_FILLINGS,
  INGREDIENTS_SWITCHBAR,
}
