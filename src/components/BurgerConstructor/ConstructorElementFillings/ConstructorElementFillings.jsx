import { useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import styles from './constructorElementFillings.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteBurgerFilling } from '../../../services/actions/burgerConstructorActions';
import { CONSTRUCTOR_ELEMENT_FILLINGS } from '../../../utils/types';

function ConstructorElementFillings({ item, index, onReplaceFillings }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  function onDeleteFillings(fillingIngredientIndex) {
    dispatch(deleteBurgerFilling(fillingIngredientIndex));
  }

  const [{ isDragItem }, dragRefItem] = useDrag({
    type: 'constructorItem',
    item: { dragIndex: index },
    collect: ((monitor) => ({
      isDragItem: monitor.isDragging(),
    })),
  }, [index]);

  const [, dropRefItem] = useDrop({
    accept: 'constructorItem',
    hover: (item, monitor) => {

      if (item.dragIndex === index) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (item.dragIndex < index && hoverClientY < hoverMiddleY / 2) {
        return;
      }
      if (item.dragIndex > index && hoverClientY > hoverMiddleY / .5) {
        return;
      }

      onReplaceFillings(item.dragIndex, index);
      item.dragIndex = index;
    },
  });

  dragRefItem(dropRefItem(ref));

  return (
    <div
      className={`${styles.ingredient} ${isDragItem && styles.isDragItem}`}
      ref={ref}
      draggable
    >
      <div className={styles.dragIcon}>
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => onDeleteFillings(index)}
      />
    </div>
  );
}

ConstructorElementFillings.propTypes = CONSTRUCTOR_ELEMENT_FILLINGS;

export default memo(ConstructorElementFillings);
