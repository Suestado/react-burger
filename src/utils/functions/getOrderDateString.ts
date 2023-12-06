export const getOrderDateString = (orderTime: string) => {
  const currentDate = new Date();
  const todayLastMs = currentDate.getHours() * 3600000 + currentDate.getMinutes() * 60000;
  const orderTimeDiffMs = currentDate.getTime() - new Date(Date.parse(orderTime)).getTime();
  const lastDaysNumber = Math.floor((orderTimeDiffMs - todayLastMs) / 86400000 + 1)

  const orderDate = new Date(Date.parse(orderTime))
  const orderHours = orderDate.getHours();
  const orderMin = orderDate.getMinutes();

  switch (lastDaysNumber) {
    case (0): {
      return `Сегодня, ${orderHours}:${orderMin}`
    }
    case (1): {
      return `Вчера, ${orderHours}:${orderMin}`
    }
    default: {
      const lastNumber = lastDaysNumber >= 10 ? lastDaysNumber % 10 : lastDaysNumber

      const daySpell =
        lastDaysNumber >= 11 && lastDaysNumber <= 20 ? "дней"
          : lastNumber === 1 ? "день"
            : lastNumber >= 2 && lastNumber <= 4 ? "дня"
              : "дней"
      return `${lastDaysNumber} ${daySpell} назад, ${orderHours}:${orderMin}`
    }
  }
}
