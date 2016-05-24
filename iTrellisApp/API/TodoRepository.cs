using Generic_Repositories.Repositories;
using iTrellisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iTrellisApp.API
{
    public class TodoRepository : GenericRepository, ITodoRepository
    {
        private IGenericRepository repo;

        public TodoRepository(IGenericRepository repo)
        {
            this.repo = repo;
        }

        public TodoRepository()
        {

        }

        public ICollection<Todo> GetTodos()
        {
            return repo.Query<Todo>().ToList();
        }

        public StatusVm AddOrUpdateTodo(Todo todo)
        {
            StatusVm status = new StatusVm();

            //If new entry:
            if (todo.Id == 0)
            {
                Todo toAdd = new Todo();

                if (todo != null)
                {
                    if (todo.Deadline == new DateTime(0001, 1, 1)) //null date — out of range
                    {
                        todo.Deadline = new DateTime(1753, 1, 1); //fake null date
                    }

                    toAdd.Title = todo.Title;
                    toAdd.Deadline = todo.Deadline;
                    toAdd.Details = todo.Details;
                    toAdd.Completed = todo.Completed;
                    toAdd.DateCreated = DateTime.Now;

                    repo.Add<Todo>(toAdd);
                    repo.SaveChanges();
                    status.Todo = toAdd;
                    status.OperationSucceeded = true;
                }
                else
                {
                    status.OperationSucceeded = false;
                    status.Message = "Received null from the client.";
                }
            }
            //Else if updating an entry:
            else
            {
                Todo original = repo.Find<Todo>(todo.Id);

                if (original != null)
                {
                    if (todo.Deadline == new DateTime(0001, 1, 1))
                    {
                        todo.Deadline = new DateTime(1753, 1, 1);
                    }

                    original.Title = todo.Title;
                    original.Deadline = todo.Deadline;
                    original.Details = todo.Details;
                    original.Completed = todo.Completed;

                    repo.SaveChanges();
                    status.Todo = original;
                    status.OperationSucceeded = true;
                }
                else
                {
                    status.OperationSucceeded = false;
                    status.Message = "Object with ID " + todo.Id + " was not found.";
                }
            }

            return status;
        }

        public StatusVm DeleteTodo(int Id)
        {
            StatusVm status = new StatusVm();

            if (repo.Find<Todo>(Id) != null)
            {
                repo.Delete<Todo>(Id);
                repo.SaveChanges();
                status.OperationSucceeded = true;
            }
            else
            {
                status.OperationSucceeded = false;
                status.Message = "Object with ID " + Id + " was not found.";
            }

            return status;
        }

        //Test method that does not modify the database:
        public StatusVm AddOrUpdateTodoTest(Todo todo)
        {
            StatusVm status = new StatusVm();

            //If new entry:
            if (todo.Id == 0)
            {
                Todo toAdd = new Todo();

                if (todo != null)
                {
                    if (todo.Deadline == new DateTime(0001, 1, 1))
                    {
                        todo.Deadline = new DateTime(1753, 1, 1);
                    }

                    toAdd.Title = todo.Title;
                    toAdd.Deadline = todo.Deadline;
                    toAdd.Details = todo.Details;
                    toAdd.Completed = todo.Completed;
                    toAdd.DateCreated = DateTime.Now;

                    status.Todo = toAdd;
                    status.OperationSucceeded = true;
                }
                else
                {
                    status.OperationSucceeded = false;
                    status.Message = "Received null from the client.";
                }
            }
            //Else if updating an entry:
            else
            {
                Todo original = repo.Find<Todo>(todo.Id); //Relies on dependency injection

                if (original != null)
                {
                    if (todo.Deadline == new DateTime(0001, 1, 1))
                    {
                        todo.Deadline = new DateTime(1753, 1, 1);
                    }

                    original.Title = todo.Title;
                    original.Deadline = todo.Deadline;
                    original.Details = todo.Details;
                    original.Completed = todo.Completed;

                    status.Todo = original;
                    status.OperationSucceeded = true;
                }
                else
                {
                    status.OperationSucceeded = false;
                    status.Message = "Object with ID " + todo.Id + " was not found.";
                }
            }

            return status;
        }
    }
}