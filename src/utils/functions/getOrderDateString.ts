export const getOrderDateString = (orderTime: string) => {
  const currentDate = new Date();
  const orderDate = new Date(Date.parse(orderTime))
  const orderDay = orderDate.getDate()
  const orderHours = orderDate.getHours();
  const orderMin = orderDate.getMinutes();
  const dateDiff = currentDate.getDate() - orderDay;

  switch (dateDiff) {
    case (0): {
      return `Сегодня, ${orderHours}:${orderMin}`
    }
    case (1): {
      return `Вчера, ${orderHours}:${orderMin}`
    }
    default: {
      const lastNumber = dateDiff >= 10 ? dateDiff % 10 : dateDiff

      const daySpell =
        dateDiff >= 11 && dateDiff <= 20 ? "дней"
          : lastNumber === 1 ? "день"
            : lastNumber >= 2 && lastNumber <= 4 ? "дня"
              : "дней"
      return `${dateDiff} ${daySpell} назад, ${orderHours}:${orderMin}`
    }
  }
}
