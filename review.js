class Ctrl extends Controller {
       constructor(ctx) {
           super(ctx);
       }
   
    /*
    Изначально стоит отметить глобально по логике самого метода, что она является совмещенной
    Обычно счетчики должны выполнять лишь функцию предоставления информации, а не изменения ее
    а тут при вызове класса происходит одновременно из изменение данных и выдача счетчика
    что по логике следовало бы разнести в два разных метода. 
    */
       async run() {
           const orders = await Order.Model.find().select('id user_id');
           const users = [];
           let count = 0;
   
           /*
            Основной проблемой кода (этого и следующего цикла) является массовое обращение к базе
            В идеале это должно было бы быть 2 запроса:
            1) Предоставляет количество нужных элементов и связывает данные, если данные нельзя связать в БД,
            то можно просто собрать массив in в запросе к БД из всех нужных user_id, 
            чтобы запрос был один, а не по количеству заказов
            2) Заменить метод save() на update() и также пройтись по всем пользователям и собрать массив in тех,
            кому нужно обновить статус problem, это снизит нагрузку на базу
           */
           for (let order of orders) {
               const user = await User.Model.findOne({id: order.user_id});
               if (user)
                   users.push(user)
           }
   
           for (let user of users) {
            //    можно сократить запись до if (!user.problem)
               if (user.problem === false)
                   count++;
               user.problem = true;
               await user.save();
           }
   
           return { count };
   
       }
   }
