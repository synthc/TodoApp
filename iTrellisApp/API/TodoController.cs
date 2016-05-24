using iTrellisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace iTrellisApp.API
{
    public class TodoController : ApiController
    {
        private ITodoRepository repo;

        public TodoController(ITodoRepository repo)
        {
            this.repo = repo;
        }

        //Get all todos:
        public IHttpActionResult Get()
        {
            return Ok(repo.GetTodos());
        }

        [Route("api/todo/addOrUpdateTodo")]
        //Add or update a todo:
        public IHttpActionResult AddOrUpdateTodo(Todo todo)
        {
            return Ok(repo.AddOrUpdateTodo(todo));
        }

        //Delete a todo:
        [Route("api/todo/delete")]
        public IHttpActionResult Delete(int Id)
        {
            repo.DeleteTodo(Id);
            return Ok();
        }
    }
}
