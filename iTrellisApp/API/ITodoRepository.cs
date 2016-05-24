using System.Collections.Generic;
using iTrellisApp.Models;

namespace iTrellisApp.API
{
    public interface ITodoRepository
    {
        StatusVm AddOrUpdateTodo(Todo todo);
        StatusVm DeleteTodo(int Id);
        ICollection<Todo> GetTodos();
    }
}