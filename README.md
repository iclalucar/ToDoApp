# ToDoApp

## API Endpoints

### ToDoApi (ASP.NET Core)

- **GET /api/ToDoItems:** Tüm ToDo öğelerini al.
- **GET /api/ToDoItems/{id}:** Belirli bir ToDo öğesini ID ile al.
- **POST /api/ToDoItems:** Yeni bir ToDo öğesi oluştur.
- **PUT /api/ToDoItems/{id}:** ID ile ToDo öğesini güncelle.
- **DELETE /api/ToDoItems/{id}:** ID ile ToDo öğesini sil.

### todo-client (React)

React uygulamasında, API çağırımları `src/services/apiService.js` dosyasında yapılmaktadır.

- `apiService.getTodoItems():` Tüm ToDo öğelerini getirir.
- `apiService.getTodoItemById(id):` Belirli bir ToDo öğesini ID ile getirir.
- `apiService.createTodoItem(item):` Yeni bir ToDo öğesi oluşturur.
- `apiService.updateTodoItem(id, item):` ID ile ToDo öğesini günceller.
- `apiService.deleteTodoItem(id):` ID ile ToDo öğesini siler.
- `apiService.login(email, password):` Kullanıcı girişi yapar.
- `apiService.register(user):` Yeni bir kullanıcı kaydı oluşturur.
