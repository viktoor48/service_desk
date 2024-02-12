const orders = [
  {
    id: 1,
    status: 'Выполняется',
    priority: 'Средний',
    name: 'Починить принтер',
    applicant: 'Кафедра математики',
    executor: 'Будков Владислав',
    edited: '21.02.2023',
  },
  {
    id: 2,
    status: 'Ожидает',
    priority: 'Высокий',
    name: 'Заменить лампочки',
    applicant: 'Отдел безопасности',
    executor: 'Иванова Анна',
    edited: '15.03.2023',
  },
  {
    id: 3,
    status: 'Завершено',
    priority: 'Низкий',
    name: 'Убрать мусор',
    applicant: 'Администрация здания',
    executor: 'Петров Иван',
    edited: '09.05.2023',
  },
  {
    id: 4,
    status: 'Ожидает',
    priority: 'Средний',
    name: 'Заказать канцтовары',
    applicant: 'Отдел кадров',
    executor: 'Смирнова Екатерина',
    edited: '02.06.2023',
  },
  {
    id: 5,
    status: 'Выполняется',
    priority: 'Высокий',
    name: 'Установить программное обеспечение',
    applicant: 'Отдел разработки',
    executor: 'Ковалев Алексей',
    edited: '19.06.2023',
  },
  {
    id: 6,
    status: 'Ожидает',
    priority: 'Низкий',
    name: 'Заказать новый стол',
    applicant: 'Отдел закупок',
    executor: 'Сидоров Дмитрий',
    edited: '27.06.2023',
  },
]

const employees = [
  {
    name: 'Владислав',
    number: '+79192453490',
    position: 'инжинер',
  },
  {
    name: 'Константин',
    number: '+79192453490',
    position: 'техник',
  },
  {
    name: 'Анастасия',
    number: '+79192453234',
    position: 'аналитик',
  },
  {
    name: 'Марина',
    number: '+79192453678',
    position: 'дизайнер',
  },
  {
    name: 'Алексей',
    number: '+79192453567',
    position: 'менеджер',
  },
]

const users = [
  {
    name: 'Мария',
    position: 'Преподаватель',
    cathedra: 'Прикладная математика',
  },
  {
    name: 'Александр',
    position: 'Студент',
    cathedra: 'Прикладная математика',
  },
  {
    name: 'Елена',
    position: 'Ассистент',
    cathedra: 'Прикладная математика',
  },
  {
    name: 'Иван',
    position: 'Лаборант',
    cathedra: 'Прикладная математика',
  },
]

export { orders, employees, users }
